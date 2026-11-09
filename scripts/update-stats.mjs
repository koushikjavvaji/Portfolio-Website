// Fetches peak ratings from each platform and writes public/stats.json.
// Peak values only ever go up: a failed or empty fetch keeps the previous value.
import { readFile, writeFile } from "node:fs/promises";

const OUT = new URL("../public/stats.json", import.meta.url);
const HANDLES = { codeforces: "KVK18", codechef: "kvk18", leetcode: "JVK18", atcoder: "KVK18" };

const prev = JSON.parse(await readFile(OUT, "utf8").catch(() => "{}"));
const keep = (key, next) => ({
  ...prev[key],
  ...next,
  peak: Math.max(prev[key]?.peak ?? 0, next?.peak ?? 0),
  // Best (lowest) rank ever seen, like the peak rating.
  ...(next.air != null && {
    airBest: Math.min(prev[key]?.airBest ?? Infinity, next.air),
  }),
});

async function codeforces() {
  const r = await fetch(
    `https://codeforces.com/api/user.info?handles=${HANDLES.codeforces}`,
  );
  const u = (await r.json()).result[0];
  const sub = await (
    await fetch(
      `https://codeforces.com/api/user.status?handle=${HANDLES.codeforces}`,
    )
  ).json();
  const solved = new Set(
    sub.result
      .filter((x) => x.verdict === "OK")
      .map((x) => `${x.problem.contestId}${x.problem.index}`),
  ).size;
  return { peak: u.maxRating, current: u.rating, rank: u.maxRank, solved };
}

async function codechef() {
  const html = await (
    await fetch(`https://www.codechef.com/users/${HANDLES.codechef}`, {
      headers: { "user-agent": "Mozilla/5.0" },
    })
  ).text();
  const peak = Number(html.match(/Highest Rating\s*(\d+)/)?.[1]);
  const current = Number(html.match(/rating-number">\s*(\d+)/)?.[1]);
  const stars = html.match(/(\d)\s*★/)?.[1];
  const solved = Number(html.match(/Total Problems Solved:\s*(\d+)/)?.[1]);
  const air = Number(
    html.match(/(\d+)\s*<\/strong>\s*<\/a>\s*<br\s*\/?>\s*<small>\s*Country Rank/)?.[1] ??
      html.replace(/<[^>]*>/g, " ").match(/(\d+)\s+Global Rank\s+(\d+)\s+Country Rank/)?.[2],
  );
  return {
    peak,
    current,
    ...(solved && { solved }),
    ...(air && { air }),
    ...(stars && { stars: Number(stars) }),
  };
}

async function leetcode() {
  const q = `query($u:String!){
    userContestRankingHistory(username:$u){attended rating}
    userContestRanking(username:$u){topPercentage}
    matchedUser(username:$u){submitStats{acSubmissionNum{difficulty count}}}
  }`;
  const r = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query: q, variables: { u: HANDLES.leetcode } }),
  });
  const d = (await r.json()).data ?? {};
  if (!d.matchedUser) throw new Error("user not returned");
  const ratings = (d.userContestRankingHistory ?? [])
    .filter((x) => x.attended)
    .map((x) => Math.round(x.rating));
  const solved = d.matchedUser?.submitStats.acSubmissionNum.find(
    (x) => x.difficulty === "All",
  )?.count;
  const top = d.userContestRanking?.topPercentage;
  return {
    peak: Math.max(0, ...ratings),
    ...(ratings.length && { current: ratings.at(-1) }),
    ...(solved && { solved }),
    ...(top && { topPercent: top }),
  };
}

async function atcoder() {
  const html = await (
    await fetch(`https://atcoder.jp/users/${HANDLES.atcoder}`, {
      headers: { "user-agent": "Mozilla/5.0" },
    })
  ).text();
  const history = JSON.parse(html.match(/rating_history\s*=\s*(\[.*?\]);/s)?.[1] ?? "[]");
  const ratings = history.map((x) => x.NewRating);
  const ac = await (
    await fetch(
      `https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_rank?user=${HANDLES.atcoder}`,
    )
  )
    .json()
    .catch(() => ({}));
  return {
    peak: Math.max(0, ...ratings),
    current: ratings.at(-1),
    ...(ac.count && { solved: ac.count }),
  };
}

const jobs = { codeforces, codechef, leetcode, atcoder };
const next = { updatedAt: new Date().toISOString() };
for (const [key, fn] of Object.entries(jobs)) {
  try {
    const res = await fn();
    // LeetCode legitimately has no rating until the first contest (peak 0).
    if (!res.peak && key !== "leetcode") throw new Error("no rating returned");
    next[key] = keep(key, res);
  } catch (e) {
    console.warn(`${key}: keeping previous value (${e.message})`);
    next[key] = prev[key];
  }
}
await writeFile(OUT, JSON.stringify(next, null, 2) + "\n");
console.log(next);
