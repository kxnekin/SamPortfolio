import { useEffect, useRef, useState } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');

.exp-section {
  padding: 100px clamp(20px,6vw,80px);
  background: #ffffff;
  position: relative;
  overflow: hidden;
}
.exp-section::before {
  content:'';position:absolute;inset:0;
  background-image:radial-gradient(circle,#e2e8f0 1px,transparent 1px);
  background-size:32px 32px;opacity:0.45;pointer-events:none;
}
.exp-inner { max-width:900px;margin:0 auto;position:relative;z-index:1; }

/* HEADING */
.exp-head { text-align:center;margin-bottom:72px; }
.exp-eyebrow {
  display:inline-flex;align-items:center;gap:10px;
  font-family:'Outfit',sans-serif;font-size:11px;font-weight:500;
  letter-spacing:0.22em;text-transform:uppercase;color:#3b82f6;margin-bottom:16px;
}
.exp-eyebrow::before,.exp-eyebrow::after {
  content:'';width:32px;height:1px;background:#3b82f6;opacity:0.4;
}
.exp-title {
  font-family:'Syne',sans-serif;font-size:clamp(32px,4vw,52px);
  font-weight:800;letter-spacing:-0.03em;color:#18181b;
}
.exp-title span { color:#3b82f6; }

/* TIMELINE */
.exp-timeline { position:relative;padding-left:40px; }
.exp-timeline::before {
  content:'';position:absolute;left:14px;top:8px;bottom:8px;
  width:1.5px;background:linear-gradient(to bottom,#3b82f6,#bfdbfe,transparent);
}

.exp-item {
  position:relative;margin-bottom:44px;
  opacity:0;transform:translateX(-24px);
  transition:all 0.6s cubic-bezier(.22,1,.36,1);
}
.exp-item.visible { opacity:1;transform:translateX(0); }

/* dot on timeline */
.exp-dot {
  position:absolute;left:-34px;top:18px;
  width:16px;height:16px;border-radius:50%;
  background:white;border:2.5px solid #3b82f6;
  display:flex;align-items:center;justify-content:center;
  transition:all 0.3s;
  box-shadow:0 0 0 4px #eff6ff;
}
.exp-dot::after {
  content:'';width:6px;height:6px;border-radius:50%;
  background:#3b82f6;
}
.exp-item:hover .exp-dot {
  background:#3b82f6;
  box-shadow:0 0 0 6px rgba(59,130,246,0.15);
}
.exp-item:hover .exp-dot::after { background:white; }

/* card */
.exp-card {
  background:white;border:1.5px solid #e2e0db;
  border-radius:16px;padding:28px 32px;
  transition:all 0.3s cubic-bezier(.22,1,.36,1);
  position:relative;overflow:hidden;
}
.exp-card::before {
  content:'';position:absolute;left:0;top:0;bottom:0;
  width:3px;background:linear-gradient(to bottom,#3b82f6,#60a5fa);
  border-radius:99px 0 0 99px;
  transform:scaleY(0);transform-origin:top;
  transition:transform 0.3s cubic-bezier(.22,1,.36,1);
}
.exp-item:hover .exp-card {
  box-shadow:0 12px 40px rgba(59,130,246,0.1);
  border-color:#bfdbfe;
  transform:translateX(4px);
}
.exp-item:hover .exp-card::before { transform:scaleY(1); }

.exp-card-top {
  display:flex;flex-wrap:wrap;gap:8px;
  align-items:flex-start;justify-content:space-between;
  margin-bottom:6px;
}
.exp-role {
  font-family:'Syne',sans-serif;font-size:18px;
  font-weight:700;color:#18181b;letter-spacing:-0.01em;
}
.exp-badge {
  font-size:11px;font-weight:500;letter-spacing:0.08em;
  text-transform:uppercase;padding:4px 12px;
  border-radius:999px;background:#eff6ff;color:#3b82f6;
  border:1px solid #bfdbfe;white-space:nowrap;
}
.exp-badge.active {
  background:#f0fdf4;color:#16a34a;border-color:#bbf7d0;
}
.exp-company {
  font-family:'Outfit',sans-serif;font-size:14px;
  font-weight:500;color:#52525b;margin-bottom:16px;
  display:flex;align-items:center;gap:6px;
}
.exp-company::before {
  content:'';width:16px;height:1px;background:#a1a1aa;
}
.exp-points { list-style:none;display:flex;flex-direction:column;gap:8px; }
.exp-point {
  font-family:'Outfit',sans-serif;font-size:14px;
  font-weight:300;line-height:1.7;color:#52525b;
  display:flex;align-items:flex-start;gap:10px;
}
.exp-point::before {
  content:'';flex-shrink:0;margin-top:8px;
  width:5px;height:5px;border-radius:50%;background:#3b82f6;
}
`;

const experiences = [
  {
    role: "Research Intern",
    company: "Centre for Incubation, Innovation, Research and Consultancy (CIIRC), Bangalore",
    duration: "March 2025 – June 2025",
    active: false,
    points: [
      "Worked on web development (MERN stack) and mobile applications using React Native with Expo Go.",
      "Gained hands-on experience training ML models like XGBoost.",
      "Collaborated on building prototypes that combined software development and AI for research projects.",
    ],
  },
  {
    role: "Software Development Intern",
    company: "WizzyBox Pvt. Ltd.",
    duration: "September 2025 – December 2025",
    active: false,
    points: [
      "Worked primarily on frontend development using React and Tailwind CSS, creating clean and responsive user interfaces for multiple projects.",
      "Supported the team with basic MERN stack backend tasks.",
      "Gained hands-on experience in manual testing and UI validation.",
    ],
  },
  {
    role: "Graduate Engineer Trainee Intern",
    company: "Empulse Global Pvt. Ltd.",
    duration: "January 2026 – June 2026",
    active: false,
    points: [
      "Assisted the business analysis team in gathering and documenting requirements, analyzing data using Excel, and preparing reports to support decision-making.",
      "Collaborated with cross-functional teams to translate business needs into structured documentation.",
      "Gained hands-on experience in requirement analysis and stakeholder coordination.",
    ],
  },
  {
    role: "Software Developer",
    company: "Empulse Global Pvt. Ltd.",
    duration: "July 2026 – Present",
    active: true,
    points: [
      "Continued on with Empulse Global full-time after the internship, working as a Software Developer.",
    ],
  },
];

function useInView(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function ExpItem({ exp, index }) {
  const ref = useRef(null);
  const visible = useInView(ref, 0.2);
  return (
    <div
      ref={ref}
      className={`exp-item${visible ? " visible" : ""}`}
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <div className="exp-dot" />
      <div className="exp-card">
        <div className="exp-card-top">
          <div className="exp-role">{exp.role}</div>
          <span className={`exp-badge${exp.active ? " active" : ""}`}>
            {exp.active ? "● Active" : exp.duration}
          </span>
        </div>
        <div className="exp-company">{exp.company}</div>
        <ul className="exp-points">
          {exp.points.map((pt, i) => (
            <li key={i} className="exp-point">
              {pt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <>
      <style>{css}</style>
      <section className="exp-section" id="experience">
        <div className="exp-inner">
          <div className="exp-head">
            <div className="exp-eyebrow">Career</div>
            <h2 className="exp-title">
              Internships &amp; <span>Work</span>
            </h2>
          </div>
          <div className="exp-timeline">
            {experiences.map((exp, i) => (
              <ExpItem key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}