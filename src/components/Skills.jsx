import { useEffect, useRef, useState } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');

.sk-section {
  padding: 100px clamp(20px,6vw,80px);
  background: #ffffff;
  position: relative;
  overflow: hidden;
}

/* subtle bg dots */
.sk-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, #e2e8f0 1px, transparent 1px);
  background-size: 32px 32px;
  opacity: 0.5;
  pointer-events: none;
}

.sk-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }

/* HEADING */
.sk-head { text-align: center; margin-bottom: 72px; }
.sk-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: 'Outfit', sans-serif;
  font-size: 11px; font-weight: 500; letter-spacing: 0.22em;
  text-transform: uppercase; color: #3b82f6; margin-bottom: 16px;
}
.sk-eyebrow::before, .sk-eyebrow::after {
  content: ''; flex: 1; height: 1px;
  width: 32px; background: #3b82f6; opacity: 0.4;
}
.sk-title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 800; letter-spacing: -0.03em; color: #18181b;
}
.sk-title span { color: #3b82f6; }
.sk-sub {
  font-family: 'Outfit', sans-serif;
  font-size: 15px; font-weight: 300;
  color: #71717a; margin-top: 12px; max-width: 420px; margin-left: auto; margin-right: auto;
  line-height: 1.7;
}

/* ICON GRID */
.sk-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 16px;
  margin-bottom: 64px;
}

.sk-icon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 24px 12px 20px;
  border-radius: 16px;
  border: 1.5px solid #e2e0db;
  background: white;
  cursor: default;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(.22,1,.36,1);
  opacity: 0;
  transform: translateY(28px);
}
.sk-icon-card.visible {
  opacity: 1;
  transform: translateY(0);
}
.sk-icon-card::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg, var(--card-color, #eff6ff), transparent 60%);
  opacity: 0;
  transition: opacity 0.3s;
}
.sk-icon-card:hover { border-color: var(--card-color, #3b82f6); transform: translateY(-6px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
.sk-icon-card:hover::before { opacity: 1; }

.sk-icon-wrap {
  width: 52px; height: 52px;
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  background: var(--icon-bg, #eff6ff);
  transition: transform 0.3s cubic-bezier(.22,1,.36,1);
  position: relative; z-index: 1;
}
.sk-icon-card:hover .sk-icon-wrap { transform: scale(1.12) rotate(-4deg); }
.sk-icon-wrap svg { width: 28px; height: 28px; }

.sk-icon-name {
  font-family: 'Outfit', sans-serif;
  font-size: 12px; font-weight: 600;
  color: #18181b; letter-spacing: 0.01em;
  position: relative; z-index: 1;
  text-align: center;
}
.sk-icon-tag {
  font-size: 9.5px; font-weight: 500;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: #a1a1aa; position: relative; z-index: 1;
}

/* CATEGORY CLUSTERS (replaces old proficiency bars) */
.sk-cats-wrap { display: flex; flex-direction: column; gap: 18px; }
.sk-cat-group {
  border: 1.5px solid #e2e0db;
  border-radius: 18px;
  padding: 22px 24px;
  background: #fafafa;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(.22,1,.36,1);
}
.sk-cat-group.visible { opacity: 1; transform: translateY(0); }

.sk-cat-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 14px;
}
.sk-cat-name {
  font-family: 'Syne', sans-serif;
  font-size: 15px; font-weight: 800;
  color: #18181b; letter-spacing: -0.01em;
  display: flex; align-items: center; gap: 8px;
}
.sk-cat-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--dot-color, #3b82f6);
  flex-shrink: 0;
}
.sk-cat-count {
  font-family: 'Outfit', sans-serif;
  font-size: 11px; font-weight: 500;
  color: #a1a1aa; letter-spacing: 0.04em;
}

.sk-cat-pills { display: flex; flex-wrap: wrap; gap: 8px; }
.sk-pill {
  font-family: 'Outfit', sans-serif;
  font-size: 12.5px; font-weight: 500;
  color: #3f3f46;
  background: white;
  border: 1px solid #e4e4e7;
  padding: 6px 14px;
  border-radius: 99px;
  transition: all 0.25s;
}
.sk-pill:hover {
  border-color: var(--dot-color, #3b82f6);
  color: var(--dot-color, #3b82f6);
  transform: translateY(-2px);
}
`;

/* ── TECH ICONS AS SVG ── */
const icons = {
  React: ({ size = 28 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
      <circle cx="16" cy="16" r="3" fill="#61DAFB" />
      <ellipse
        cx="16"
        cy="16"
        rx="14"
        ry="5.5"
        stroke="#61DAFB"
        strokeWidth="1.5"
        fill="none"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="14"
        ry="5.5"
        stroke="#61DAFB"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(60 16 16)"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="14"
        ry="5.5"
        stroke="#61DAFB"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(120 16 16)"
      />
    </svg>
  ),
NextJS: ({ size = 28 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size}>
    <circle cx="16" cy="16" r="15" fill="#000" />
    <path
      d="M10 9h2.2l7.3 10.5V9H22v14h-2.2L12.2 12V23H10V9z"
      fill="#fff"
    />
    <path
      d="M18.8 19.5l3.2 3.5"
      stroke="#fff"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
),
  NodeJS: ({ size = 28 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <path d="M16 2L3 9v14l13 7 13-7V9L16 2z" fill="#3C873A" />
      <path
        d="M16 8v8m0 0l-4 3m4-3l4 3"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <text
        x="9"
        y="21"
        fontSize="7"
        fill="white"
        fontWeight="bold"
        fontFamily="monospace"
      >
        js
      </text>
    </svg>
  ),
  Express: ({ size = 28 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <rect width="32" height="32" rx="6" fill="#000" />
      <text
        x="4"
        y="21"
        fontSize="10"
        fill="white"
        fontWeight="bold"
        fontFamily="monospace"
      >
        ex
      </text>
    </svg>
  ),
  MongoDB: ({ size = 28 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <path
        d="M16 2C16 2 10 8 10 17c0 3.3 1.3 6 3 7.5l2 1 1 4.5h0l1-4.5 2-1c1.7-1.5 3-4.2 3-7.5C22 8 16 2 16 2z"
        fill="#4DB33D"
      />
      <line
        x1="16"
        y1="24"
        x2="16"
        y2="30"
        stroke="#4DB33D"
        strokeWidth="1.5"
      />
    </svg>
  ),
  MySQL: ({ size = 28 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <ellipse cx="16" cy="9" rx="11" ry="4" fill="#00618A" />
      <path
        d="M5 9v5c0 2.2 4.9 4 11 4s11-1.8 11-4V9"
        fill="#00618A"
        opacity="0.7"
      />
      <path
        d="M5 14v5c0 2.2 4.9 4 11 4s11-1.8 11-4v-5"
        fill="#00618A"
        opacity="0.5"
      />
      <path
        d="M5 19v4c0 2.2 4.9 4 11 4s11-1.8 11-4v-4"
        fill="#00618A"
        opacity="0.3"
      />
    </svg>
  ),
  TailwindCSS: ({ size = 28 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <path
        d="M16 7C12 7 9.5 9 8 13c2-2.5 4.5-3.5 7-3 1.5.3 2.5 1.3 4 2.5 2 1.8 4.5 3.5 8 3.5C31 16 33.5 14 35 10c-2 2.5-4.5 3.5-7 3-1.5-.3-2.5-1.3-4-2.5C22 8.7 19.5 7 16 7z"
        fill="#38BDF8"
        transform="scale(0.85) translate(2 2)"
      />
      <path
        d="M8 16c-4 0-6.5 2-8 6 2-2.5 4.5-3.5 7-3 1.5.3 2.5 1.3 4 2.5 2 1.8 4.5 3.5 8 3.5 4 0 6.5-2 8-6-2 2.5-4.5 3.5-7 3-1.5-.3-2.5-1.3-4-2.5-2-1.8-4.5-3.5-8-3.5z"
        fill="#38BDF8"
        transform="scale(0.85) translate(2 2)"
      />
    </svg>
  ),
  JavaScript: ({ size = 28 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <rect width="32" height="32" rx="4" fill="#F7DF1E" />
      <text
        x="5"
        y="24"
        fontSize="13"
        fontWeight="bold"
        fontFamily="monospace"
        fill="#323330"
      >
        JS
      </text>
    </svg>
  ),
  CPP: ({ size = 28 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <circle cx="16" cy="16" r="14" fill="#00599C" />
      <text
        x="5"
        y="21"
        fontSize="9"
        fontWeight="bold"
        fontFamily="monospace"
        fill="white"
      >
        C++
      </text>
    </svg>
  ),
  Git: ({ size = 28 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <rect width="32" height="32" rx="4" fill="#F05033" />
      <path
        d="M28 14.7L17.3 4a1.4 1.4 0 00-2 0l-2 2 2.5 2.5a1.7 1.7 0 012.1 2.1l2.4 2.4a1.7 1.7 0 11-1 1l-2.2-2.2v5.8a1.7 1.7 0 11-1.4 0V11.5a1.7 1.7 0 01-.9-2.2L12.4 7 4 15.4a1.4 1.4 0 000 2L14.7 28a1.4 1.4 0 002 0L28 16.7a1.4 1.4 0 000-2z"
        fill="white"
      />
    </svg>
  ),
  Spline: ({ size = 28 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <rect width="32" height="32" rx="8" fill="#0F0F0F" />
      <circle
        cx="16"
        cy="16"
        r="7"
        fill="none"
        stroke="#fff"
        strokeWidth="1.5"
      />
      <circle cx="16" cy="10" r="2.5" fill="#3b82f6" />
      <circle cx="22" cy="20" r="2.5" fill="#a78bfa" />
      <circle cx="10" cy="20" r="2.5" fill="#34d399" />
      <line
        x1="16"
        y1="12"
        x2="21"
        y2="18"
        stroke="white"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="16"
        y1="12"
        x2="11"
        y2="18"
        stroke="white"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  ),
  Testing: ({ size = 28 }) => (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      stroke="#10b981"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M11 5h10M9 5l-5 18h24L23 5" />
      <path d="M13 13h6M12 17h8" />
    </svg>
  ),
  SSMS: ({ size = 28 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <rect width="32" height="32" rx="6" fill="#CC2927" />
      <ellipse cx="16" cy="10" rx="9" ry="3.2" fill="#fff" opacity="0.9" />
      <path
        d="M7 10v6c0 1.8 4 3.2 9 3.2s9-1.4 9-3.2v-6"
        fill="none"
        stroke="#fff"
        strokeWidth="1.4"
        opacity="0.9"
      />
      <path
        d="M7 16v6c0 1.8 4 3.2 9 3.2s9-1.4 9-3.2v-6"
        fill="none"
        stroke="#fff"
        strokeWidth="1.4"
        opacity="0.7"
      />
    </svg>
  ),
  AzureSynapse: ({ size = 28 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <path d="M12 4L4 22h7l3-8 3 8h7L16 4z" fill="#0078D4" opacity="0.55" />
      <path d="M18 4l7 18h-7l-3-8-2 5 2 5h-9l4-10z" fill="#50E6FF" />
    </svg>
  ),
  Angular: ({ size = 28 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <path d="M16 2l13 4.6-2 15L16 30 5 21.6l-2-15L16 2z" fill="#DD0031" />
      <path d="M16 2v28l11-8.4 2-15L16 2z" fill="#C3002F" />
      <path
        d="M16 7.5L9.5 22h2.4l1.3-3.3h5.6l1.3 3.3h2.4L16 7.5zm0 4.2l2 5H14l2-5z"
        fill="#fff"
      />
    </svg>
  ),
  Python: ({ size = 28 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <path
        d="M15.9 3c-1.4 0-2.7.1-3.8.3-3.4.6-4 1.9-4 4.2v3.1h8v1H8.1c-2.3 0-4.3 1.4-5 4-.7 3-.7 4.8 0 7.9.5 2.3 1.8 4 4.1 4h2.6v-3.5c0-2.6 2.3-4.9 5-4.9h7.9c2.2 0 4-1.8 4-4V7.5c0-2.1-1.8-3.7-4-4.1-1.4-.2-2.8-.4-6.7-.4zM12 6c.7 0 1.2.5 1.2 1.2S12.7 8.4 12 8.4s-1.2-.5-1.2-1.2S11.3 6 12 6z"
        fill="#3776AB"
      />
      <path
        d="M16.1 29c1.4 0 2.7-.1 3.8-.3 3.4-.6 4-1.9 4-4.2v-3.1h-8v-1h11.9c2.3 0 4.3-1.4 5-4 .7-3 .7-4.8 0-7.9-.5-2.3-1.8-4-4.1-4h-2.6v3.5c0 2.6-2.3 4.9-5 4.9H13.2c-2.2 0-4 1.8-4 4v6.6c0 2.1 1.8 3.7 4 4.1 1.4.2 2.8.4 6.7.4zM20 26c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2 1.2.5 1.2 1.2-.5 1.2-1.2 1.2z"
        fill="#FFD43B"
      />
    </svg>
  ),
  ReactNative: ({ size = 28 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
      <circle cx="16" cy="16" r="2.4" fill="#61DAFB" />
      <ellipse
        cx="16"
        cy="16"
        rx="14"
        ry="5.5"
        stroke="#61DAFB"
        strokeWidth="1.5"
        fill="none"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="14"
        ry="5.5"
        stroke="#61DAFB"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(60 16 16)"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="14"
        ry="5.5"
        stroke="#61DAFB"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(120 16 16)"
      />
      <rect
        x="12.5"
        y="3"
        width="7"
        height="11"
        rx="2"
        stroke="#61DAFB"
        strokeWidth="1.4"
        fill="#0F172A"
      />
      <line
        x1="14.5"
        y1="11.3"
        x2="17.5"
        y2="11.3"
        stroke="#61DAFB"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  ),
  GitHub: ({ size = 28 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <rect width="32" height="32" rx="6" fill="#181717" />
      <path
        d="M16 6.2c-5.5 0-10 4.5-10 10 0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.3-3.4-1.3-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.4 4.6-4.6 4.9.4.3.7 1 .7 2v3c0 .3.2.6.7.5 3.9-1.3 6.8-5.1 6.8-9.5 0-5.5-4.5-10-10-10z"
        fill="white"
      />
    </svg>
  ),
  BusinessAnalysis: ({ size = 28 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
      <rect
        x="4"
        y="4"
        width="24"
        height="24"
        rx="5"
        fill="#F59E0B"
        opacity="0.12"
      />
      <path
        d="M8 22V14M14 22V10M20 22V16M26 22V8"
        stroke="#F59E0B"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="8" cy="14" r="1.6" fill="#F59E0B" />
      <circle cx="14" cy="10" r="1.6" fill="#F59E0B" />
      <circle cx="20" cy="16" r="1.6" fill="#F59E0B" />
      <circle cx="26" cy="8" r="1.6" fill="#F59E0B" />
    </svg>
  ),
};

const SKILLS_DATA = [
  {
    name: "React",
    tag: "Frontend",
    category: "Frontend",
    Icon: icons.React,
    color: "#61DAFB",
    bg: "#e0f7fe",
  },
    {
    name: "Next.js",
    tag: "Framework",
    category: "Frontend",
    Icon: icons.NextJS,
    color: "#000000",
    bg: "#f4f4f5",
  },
  {
    name: "Angular",
    tag: "Frontend",
    category: "Frontend",
    Icon: icons.Angular,
    color: "#DD0031",
    bg: "#fef2f2",
  },
  {
    name: "React Native",
    tag: "Mobile",
    category: "Frontend",
    Icon: icons.ReactNative,
    color: "#61DAFB",
    bg: "#e0f7fe",
  },
  {
    name: "JavaScript",
    tag: "Language",
    category: "Languages",
    Icon: icons.JavaScript,
    color: "#F7DF1E",
    bg: "#fefce8",
  },
  {
    name: "Python",
    tag: "Language",
    category: "Languages",
    Icon: icons.Python,
    color: "#3776AB",
    bg: "#eff6ff",
  },
  {
    name: "C++",
    tag: "DSA",
    category: "Languages",
    Icon: icons.CPP,
    color: "#00599C",
    bg: "#eff6ff",
  },
  {
    name: "Node.js",
    tag: "Backend",
    category: "Backend",
    Icon: icons.NodeJS,
    color: "#3C873A",
    bg: "#f0fdf4",
  },
  {
    name: "Express",
    tag: "Backend",
    category: "Backend",
    Icon: icons.Express,
    color: "#555",
    bg: "#f4f4f5",
  },
  {
    name: "MongoDB",
    tag: "Database",
    category: "Data & Cloud",
    Icon: icons.MongoDB,
    color: "#4DB33D",
    bg: "#f0fdf4",
  },
  {
    name: "MySQL",
    tag: "Database",
    category: "Data & Cloud",
    Icon: icons.MySQL,
    color: "#00618A",
    bg: "#eff6ff",
  },
  {
    name: "SSMS",
    tag: "Database",
    category: "Data & Cloud",
    Icon: icons.SSMS,
    color: "#CC2927",
    bg: "#fef2f2",
  },
  {
    name: "Azure Synapse",
    tag: "Cloud",
    category: "Data & Cloud",
    Icon: icons.AzureSynapse,
    color: "#0078D4",
    bg: "#eff6ff",
  },
  {
    name: "Tailwind",
    tag: "Styling",
    category: "Frontend",
    Icon: icons.TailwindCSS,
    color: "#38BDF8",
    bg: "#e0f7fe",
  },
  {
    name: "Git",
    tag: "DevOps",
    category: "Tools & Process",
    Icon: icons.Git,
    color: "#F05033",
    bg: "#fff1f0",
  },
  {
    name: "GitHub",
    tag: "DevOps",
    category: "Tools & Process",
    Icon: icons.GitHub,
    color: "#181717",
    bg: "#f4f4f5",
  },
  {
    name: "Spline",
    tag: "3D/Design",
    category: "Tools & Process",
    Icon: icons.Spline,
    color: "#3b82f6",
    bg: "#eff6ff",
  },
  {
    name: "Testing",
    tag: "QA",
    category: "Tools & Process",
    Icon: icons.Testing,
    color: "#10b981",
    bg: "#f0fdf4",
  },
  {
    name: "Business Analysis",
    tag: "Analysis",
    category: "Tools & Process",
    Icon: icons.BusinessAnalysis,
    color: "#F59E0B",
    bg: "#fffbeb",
  },
];

/* Derive category groups directly from SKILLS_DATA so the two sections
   never drift out of sync when skills are added/removed. */
const CATEGORY_COLORS = {
  Frontend: "#3b82f6",
  Languages: "#00599C",
  Backend: "#3C873A",
  "Data & Cloud": "#0078D4",
  "Tools & Process": "#F59E0B",
};

const CATEGORIES = Object.entries(
  SKILLS_DATA.reduce((acc, sk) => {
    (acc[sk.category] ||= []).push(sk.name);
    return acc;
  }, {}),
).map(([name, items]) => ({
  name,
  items,
  color: CATEGORY_COLORS[name] || "#3b82f6",
}));

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

export default function Skills() {
  const sectionRef = useRef(null);
  const catsRef = useRef(null);
  const sectionVis = useInView(sectionRef, 0.1);
  const catsVis = useInView(catsRef, 0.15);

  return (
    <>
      <style>{css}</style>
      <section className="sk-section" id="skills" ref={sectionRef}>
        <div className="sk-inner">
          {/* HEADING */}
          <div className="sk-head">
            <div className="sk-eyebrow">Technical Skills</div>
            <h2 className="sk-title">
              What I <span>Work With</span>
            </h2>
            <p className="sk-sub">
              A toolkit built through projects, practice, and a genuine love for
              building things.
            </p>
          </div>

          {/* ICON GRID */}
          <div className="sk-grid">
            {SKILLS_DATA.map((sk, i) => (
              <div
                key={sk.name}
                className={`sk-icon-card${sectionVis ? " visible" : ""}`}
                style={{
                  transitionDelay: `${i * 0.06}s`,
                  "--card-color": sk.color,
                  "--icon-bg": sk.bg,
                }}
              >
                <div className="sk-icon-wrap">
                  <sk.Icon size={28} />
                </div>
                <div className="sk-icon-name">{sk.name}</div>
                <div className="sk-icon-tag">{sk.tag}</div>
              </div>
            ))}
          </div>

          {/* SKILL CATEGORIES — replaces the old self-rated proficiency bars */}
          <div ref={catsRef}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <div className="sk-eyebrow">By Domain</div>
              <h3
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: "clamp(22px,2.5vw,32px)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "#18181b",
                }}
              >
                How It All Fits Together
              </h3>
            </div>
            <div className="sk-cats-wrap">
              {CATEGORIES.map((cat, i) => (
                <div
                  key={cat.name}
                  className={`sk-cat-group${catsVis ? " visible" : ""}`}
                  style={{
                    transitionDelay: `${i * 0.1}s`,
                    "--dot-color": cat.color,
                  }}
                >
                  <div className="sk-cat-header">
                    <div className="sk-cat-name">
                      <span className="sk-cat-dot" />
                      {cat.name}
                    </div>
                    <div className="sk-cat-count">
                      {cat.items.length}{" "}
                      {cat.items.length === 1 ? "skill" : "skills"}
                    </div>
                  </div>
                  <div className="sk-cat-pills">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="sk-pill"
                        style={{ "--dot-color": cat.color }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
