import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar, ExternalLink } from "lucide-react";

const education = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Indian Institute of Information Technology, Nagpur",
    shortName: "IIIT Nagpur",
    period: "2022 - Present",
    location: "Nagpur, India",
    score: "CGPA: 8.14",
    courses:
      "Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks, Machine Learning, Theory of Computation",
    highlights: [
      "Core Member — Dot Slash Coding Club",
      "Problem Setter — Algorithmia 24 (500+ teams, 15+ countries)",
      "Mentored 100+ students during Winter of Code",
    ],
  },
  {
    degree: "11-12th",
    institution: "Sri Chaitanya Junior College",
    shortName: "Sri Chaitanya",
    period: "2020 - 2022",
    location: "Hyderabad, India",
    score: "12th Boards: 95.0%",
    highlights: [],
  },
  {
    degree: "10th",
    institution: "Dr. K.K.R. Gowtham School",
    shortName: "KKR Gowtham",
    period: "2017 - 2020",
    location: "Hyderabad, India",
    score: "10th Boards: 100%",
    highlights: [],
  },
];

const EducationSection = () => {
  return (
    <section id="education" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-sm text-primary mb-2 block">
            // education
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Where I <span className="text-gradient">Study</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {education.map((edu, i) => (
            <motion.a
              key={i}
              className={`glass glass-hover rounded-xl p-8 block group ${edu.url ? "cursor-pointer" : ""}`}
              onClick={() => edu.url && window.open(edu.url, "_blank")}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="flex items-start gap-5">
                <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                  <GraduationCap size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {edu.shortName}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 md:mt-0">
                      <span className="font-mono text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar size={12} />
                        {edu.period}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin size={12} />
                        {edu.location}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-primary font-mono mb-4">
                    {edu.degree}
                  </p>
                  <p className="text-sm text-muted-foreground font-mono mb-2">
                    {edu.score}
                  </p>

                  {edu.courses ? (
                    <p className="text-xs text-muted-foreground mb-4">
                      <span className="font-mono text-primary">
                        Core Courses:
                      </span>{" "}
                      {edu.courses}
                    </p>
                  ) : (
                    <p></p>
                  )}
                  <ul className="space-y-2">
                    {edu.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="text-sm text-muted-foreground flex gap-2"
                      >
                        <span className="text-primary mt-0.5 shrink-0">›</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <ExternalLink
                  size={16}
                  className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
