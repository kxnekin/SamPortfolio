import { useEffect, useRef, useState } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');

.pr-section {
  padding:100px clamp(20px,6vw,80px);
  background:#f7f6f3;position:relative;overflow:hidden;
}
.pr-section::before {
  content:'';position:absolute;inset:0;
  background-image:radial-gradient(circle,#e2e0db 1px,transparent 1px);
  background-size:28px 28px;opacity:0.5;pointer-events:none;
}
.pr-inner { max-width:1100px;margin:0 auto;position:relative;z-index:1; }

/* HEADING */
.pr-head { text-align:center;margin-bottom:72px; }
.pr-eyebrow {
  display:inline-flex;align-items:center;gap:10px;
  font-family:'Outfit',sans-serif;font-size:11px;font-weight:500;
  letter-spacing:0.22em;text-transform:uppercase;color:#3b82f6;margin-bottom:16px;
}
.pr-eyebrow::before,.pr-eyebrow::after {
  content:'';width:32px;height:1px;background:#3b82f6;opacity:0.4;
}
.pr-title {
  font-family:'Syne',sans-serif;font-size:clamp(32px,4vw,52px);
  font-weight:800;letter-spacing:-0.03em;color:#18181b;
}
.pr-title span { color:#3b82f6; }
.pr-sub {
  font-family:'Outfit',sans-serif;font-size:15px;font-weight:300;
  color:#71717a;margin-top:12px;
}

/* GRID — fixed so 2 cards don't stretch/look lopsided */
.pr-grid {
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(320px,360px));
  gap:24px;
  justify-content:center;
}

/* CARD */
.pr-card {
  background:white;border-radius:20px;
  border:1.5px solid #e2e0db;
  overflow:hidden;
  opacity:0;transform:translateY(32px);
  transition:all 0.6s cubic-bezier(.22,1,.36,1);
  display:flex;flex-direction:column;
}
.pr-card.visible { opacity:1;transform:translateY(0); }
.pr-card:hover {
  border-color:#bfdbfe;
  box-shadow:0 20px 60px rgba(59,130,246,0.12),0 4px 16px rgba(0,0,0,0.06);
  transform:translateY(-6px) !important;
}

/* preview area */
.pr-preview {
  height:180px;position:relative;overflow:hidden;
  display:flex;align-items:center;justify-content:center;
}
.pr-preview-bg {
  position:absolute;inset:0;
  transition:transform 0.5s ease;
}
.pr-card:hover .pr-preview-bg { transform:scale(1.05); }
.pr-preview-label {
  position:relative;z-index:1;
  font-family:'Syne',sans-serif;font-size:28px;font-weight:800;
  letter-spacing:-0.04em;color:rgba(255,255,255,0.22);
  text-align:center;padding:0 20px;
  pointer-events:none;
}
.pr-num {
  position:absolute;top:16px;left:20px;
  font-family:'Syne',sans-serif;font-size:11px;font-weight:700;
  letter-spacing:0.15em;color:rgba(255,255,255,0.5);
}
.pr-featured-tag {
  position:absolute;top:16px;right:16px;
  font-size:9.5px;font-weight:600;letter-spacing:0.12em;
  text-transform:uppercase;padding:4px 10px;
  border-radius:999px;background:rgba(255,255,255,0.2);
  color:white;backdrop-filter:blur(8px);
  border:1px solid rgba(255,255,255,0.25);
}

/* body */
.pr-body { padding:24px 28px 28px;display:flex;flex-direction:column;flex:1; }
.pr-card-title {
  font-family:'Syne',sans-serif;font-size:20px;
  font-weight:700;color:#18181b;letter-spacing:-0.02em;
  margin-bottom:8px;
}
.pr-desc {
  font-family:'Outfit',sans-serif;font-size:14px;
  font-weight:300;line-height:1.75;color:#52525b;
  margin-bottom:20px;
  display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;
  overflow:hidden;min-height:98px;
}
.pr-techs {
  display:flex;flex-wrap:wrap;align-content:flex-start;gap:6px;
  min-height:64px;margin-bottom:20px;
}
.pr-tech {
  font-size:11px;font-weight:500;letter-spacing:0.04em;
  padding:4px 12px;border-radius:999px;
  background:#f4f4f5;color:#52525b;
  border:1px solid #e2e0db;
  transition:all 0.2s;
}
.pr-card:hover .pr-tech { background:#eff6ff;border-color:#bfdbfe;color:#3b82f6; }

.pr-links {
  display:flex;gap:12px;
  margin-top:auto;padding-top:16px;
  border-top:1px solid #f4f4f5;
}
.pr-link {
  font-family:'Outfit',sans-serif;font-size:13px;font-weight:500;
  color:#52525b;text-decoration:none;
  display:inline-flex;align-items:center;gap:6px;
  padding:8px 16px;border-radius:8px;
  border:1.5px solid #e2e0db;
  transition:all 0.2s ease;
  flex:1;justify-content:center;
}
.pr-link:hover { border-color:#3b82f6;color:#3b82f6;background:#eff6ff; }
.pr-link svg { width:13px;height:13px; }
`;

const projects = [
  {
    title: "Nipun AI",
    desc: "An AI-powered placement management platform for students — apply for jobs, practice coding, attend AI mock interviews, and let admins manage placements end-to-end.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Ollama"],
    github: "https://github.com/kxnekin/NipunAi",
    featured: true,
    gradient: "linear-gradient(135deg,#1e3a8a 0%,#3b82f6 50%,#7c3aed 100%)",
    num: "01",
  },
  {
    title: "Sam Fitness",
    desc: "A modern gym website with user registration, membership pricing plans, contact form validation, and a PHP + MySQL backend.",
    tech: ["PHP", "MySQL", "Bootstrap 5", "CSS"],
    github: "https://github.com/kxnekin/ProfessionalFitnessWebsite",
    featured: false,
    gradient: "linear-gradient(135deg,#b45309 0%,#f59e0b 50%,#fbbf24 100%)",
    num: "02",
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

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const visible = useInView(ref, 0.15);
  return (
    <div
      ref={ref}
      className={`pr-card${visible ? " visible" : ""}`}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      {/* Preview */}
      <div className="pr-preview">
        <div
          className="pr-preview-bg"
          style={{ background: project.gradient }}
        />
        <span className="pr-num">{project.num}</span>
        {project.featured && <span className="pr-featured-tag">Featured</span>}
        <div className="pr-preview-label">{project.title}</div>
      </div>

      {/* Body */}
      <div className="pr-body">
        <div className="pr-card-title">{project.title}</div>
        <p className="pr-desc">{project.desc}</p>
        <div className="pr-techs">
          {project.tech.map((t) => (
            <span key={t} className="pr-tech">
              {t}
            </span>
          ))}
        </div>
        <div className="pr-links">
          <a
            href={project.github}
            className="pr-link"
            target="_blank"
            rel="noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            Code
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <>
      <style>{css}</style>
      <section className="pr-section" id="projects">
        <div className="pr-inner">
          <div className="pr-head">
            <div className="pr-eyebrow">Portfolio</div>
            <h2 className="pr-title">
              Featured <span>Projects</span>
            </h2>
            <p className="pr-sub">Things I've built that I'm proud of.</p>
          </div>
          <div className="pr-grid">
            {projects.map((p, i) => (
              <ProjectCard key={i} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
