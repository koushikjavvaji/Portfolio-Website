import { useEffect, useState } from "react";

export interface Ratings {
  codeforces: { peak: number; current?: number; rank?: string; solved?: number; airLabel?: string };
  codechef: { peak: number; current?: number; solved?: number; airBest?: number };
  leetcode: { peak: number; current?: number; solved?: number; topPercent?: number };
  atcoder: { peak: number; current?: number; solved?: number };
  updatedAt?: string;
}

// Last-known peaks, used until live data arrives (or if every request fails).
const FALLBACK: Ratings = {
  codeforces: { peak: 1626, rank: "expert", airLabel: "<1500" },
  codechef: { peak: 1960, airBest: 1715 },
  leetcode: { peak: 0 }, // 0 = no contests yet, so no rating is shown.
  atcoder: { peak: 852 },
};

const CACHE_KEY = "ratings-v4";

const readCache = (): Ratings | null => {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) ?? "null");
  } catch {
    return null;
  }
};

const merge = (base: Ratings, next: Partial<Ratings>): Ratings => {
  const out = { ...base };
  (["codeforces", "codechef", "leetcode", "atcoder"] as const).forEach((k) => {
    const n = next[k];
    if (n?.peak || n?.solved) {
      // Peak never decreases.
      out[k] = { ...base[k], ...n, peak: Math.max(base[k].peak, n.peak ?? 0) } as never;
    }
  });
  if (next.updatedAt) out.updatedAt = next.updatedAt;
  return out;
};

/**
 * Peak ratings per platform. Layers, lowest to highest priority:
 * hardcoded fallback -> localStorage cache -> /stats.json (refreshed by the
 * scheduled GitHub Action; covers CodeChef/LeetCode, which block browser CORS)
 * -> live Codeforces API.
 */
export const useRatings = () => {
  const [ratings, setRatings] = useState<Ratings>(() =>
    merge(FALLBACK, readCache() ?? {}),
  );
  const [live, setLive] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    let latest = ratings;
    const apply = (next: Partial<Ratings>) => {
      latest = merge(latest, next);
      setRatings(latest);
      setLive(true);
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(latest));
      } catch {
        /* storage unavailable */
      }
    };

    fetch(`${import.meta.env.BASE_URL}stats.json`, {
      signal: ctrl.signal,
      cache: "no-cache",
    })
      .then((r) => r.json())
      .then(apply)
      .catch(() => {});

    fetch("https://codeforces.com/api/user.info?handles=KVK18", {
      signal: ctrl.signal,
    })
      .then((r) => r.json())
      .then((d) => {
        const u = d.result?.[0];
        if (u?.maxRating)
          apply({
            codeforces: { peak: u.maxRating, current: u.rating, rank: u.maxRank },
          });
      })
      .catch(() => {});

    fetch("https://codeforces.com/api/user.status?handle=KVK18", {
      signal: ctrl.signal,
    })
      .then((r) => r.json())
      .then((d) => {
        const solved = new Set(
          (d.result ?? [])
            .filter((x: { verdict: string }) => x.verdict === "OK")
            .map(
              (x: { problem: { contestId: number; index: string } }) =>
                `${x.problem.contestId}${x.problem.index}`,
            ),
        ).size;
        if (solved) apply({ codeforces: { ...latest.codeforces, solved } });
      })
      .catch(() => {});

    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ratings, live };
};

export const codechefStars = (r: number) =>
  r >= 2500 ? 7 : r >= 2200 ? 6 : r >= 2000 ? 5 : r >= 1800 ? 4 : r >= 1600 ? 3 : r >= 1400 ? 2 : 1;

export const leetcodeTitle = (r: number) => (r >= 2200 ? "Guardian" : r >= 1850 ? "Knight" : "Contestant");

// AtCoder grade by rating: 400-point bands, 8 kyu up to 1 kyu.
export const atcoderKyu = (r: number) =>
  r >= 2800 ? "Dan" : `${Math.max(1, 8 - Math.floor(r / 400))} Kyu`;

export const titleCase = (s = "") => s.replace(/\b\w/g, (c) => c.toUpperCase());
