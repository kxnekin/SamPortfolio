import { useEffect, useState } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --white:#ffffff;--off:#f7f6f3;--soft:#ededea;--border:#e2e0db;
  --ink:#18181b;--ink2:#52525b;--ink3:#a1a1aa;
  --blue:#3b82f6;--blue-lt:#eff6ff;--green:#22c55e;
  --shadow:0 2px 24px rgba(0,0,0,0.07);--shadow2:0 8px 48px rgba(0,0,0,0.10);
}
body{background:var(--white);font-family:'Outfit',sans-serif;color:var(--ink);overflow-x:hidden}
.h-wrap{min-height:100vh;display:flex;flex-direction:column;justify-content:center;background:var(--white);position:relative;overflow:hidden;padding:0 clamp(20px,7vw,100px)}
.h-bg{position:absolute;inset:0;background-image:radial-gradient(circle,#d4d4d8 1px,transparent 1px);background-size:28px 28px;opacity:0.4;animation:bgDrift 18s ease-in-out infinite alternate}
@keyframes bgDrift{from{background-position:0 0}to{background-position:28px 28px}}
.h-glow{position:absolute;top:-120px;right:-120px;width:700px;height:700px;background:radial-gradient(circle at 60% 40%,rgba(59,130,246,0.08) 0%,transparent 65%);pointer-events:none;animation:glowPulse 6s ease-in-out infinite}
@keyframes glowPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.1);opacity:0.6}}
.h-grid{max-width:1200px;width:100%;margin:0 auto;display:grid;grid-template-columns:1.15fr 1fr;gap:60px;align-items:center;position:relative;z-index:1;padding:80px 0}
.h-left{display:flex;flex-direction:column}
.h-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:var(--blue);margin-bottom:22px;opacity:0;animation:slideRight 0.6s cubic-bezier(.22,1,.36,1) 0.15s forwards}
.h-eyebrow-dot{width:6px;height:6px;border-radius:50%;background:var(--blue);animation:blinkDot 2s ease-in-out infinite}
@keyframes blinkDot{0%,100%{opacity:1}50%{opacity:0.2}}
.h-name-wrap{opacity:0;animation:slideRight 0.7s cubic-bezier(.22,1,.36,1) 0.28s forwards}
.h-name{font-family:'Syne',sans-serif;font-size:clamp(48px,6vw,82px);font-weight:800;line-height:1.0;letter-spacing:-0.03em;color:var(--ink)}
.h-name-hl{position:relative;display:inline-block}
.h-name-hl::after{content:"";position:absolute;left:0;bottom:2px;height:5px;width:0;background:linear-gradient(90deg,#3b82f6,#93c5fd);border-radius:99px;animation:underlineGrow 0.7s ease 1.1s forwards}
@keyframes underlineGrow{to{width:100%}}
.h-typed-row{margin-top:10px;font-family:'Syne',sans-serif;font-size:clamp(22px,2.8vw,38px);font-weight:700;color:transparent;-webkit-text-stroke:1.8px var(--ink);letter-spacing:-0.02em;min-height:1.3em;opacity:0;animation:slideRight 0.7s cubic-bezier(.22,1,.36,1) 0.4s forwards}
.h-cursor{display:inline-block;width:2px;height:0.85em;background:var(--blue);margin-left:3px;vertical-align:middle;animation:cursorBlink 0.75s step-end infinite}
@keyframes cursorBlink{0%,100%{opacity:1}50%{opacity:0}}
.h-roles{display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-top:20px;opacity:0;animation:slideRight 0.7s cubic-bezier(.22,1,.36,1) 0.52s forwards}
.h-pill{font-size:11.5px;font-weight:500;letter-spacing:0.04em;padding:5px 14px;border-radius:999px;background:var(--off);color:var(--ink2);border:1px solid var(--border);cursor:default;transition:all 0.2s}
.h-pill:hover{background:var(--blue-lt);border-color:var(--blue);color:var(--blue);transform:translateY(-2px)}
.h-bio{font-size:15px;font-weight:300;line-height:1.9;color:var(--ink2);max-width:500px;margin-top:24px;opacity:0;animation:slideRight 0.7s cubic-bezier(.22,1,.36,1) 0.62s forwards}
.h-skills{display:flex;flex-wrap:wrap;gap:7px;margin-top:24px;opacity:0;animation:slideRight 0.7s cubic-bezier(.22,1,.36,1) 0.72s forwards}
.h-skill{font-size:11.5px;font-weight:500;padding:4px 12px;border-radius:6px;background:var(--soft);color:var(--ink2);border:1px solid var(--border);cursor:default;transition:all 0.2s ease}
.h-skill:hover{border-color:var(--blue);color:var(--blue);background:var(--blue-lt);transform:translateY(-2px);box-shadow:0 4px 12px rgba(59,130,246,0.12)}
.h-btns{display:flex;gap:14px;margin-top:34px;opacity:0;animation:slideRight 0.7s cubic-bezier(.22,1,.36,1) 0.82s forwards}
.btn-main{font-family:'Outfit',sans-serif;font-size:14px;font-weight:500;padding:13px 28px;background:var(--ink);color:white;border:none;border-radius:8px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all 0.25s cubic-bezier(.22,1,.36,1);position:relative;overflow:hidden}
.btn-main::after{content:"";position:absolute;inset:0;background:linear-gradient(135deg,#3b82f6,#1d4ed8);opacity:0;transition:opacity 0.25s}
.btn-main:hover::after{opacity:1}
.btn-main>*{position:relative;z-index:1}
.btn-main:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(59,130,246,0.28)}
.btn-main svg{transition:transform 0.2s}
.btn-main:hover svg{transform:translateX(4px)}
.btn-ghost{font-family:'Outfit',sans-serif;font-size:14px;font-weight:500;padding:13px 28px;background:transparent;color:var(--ink);border:1.5px solid var(--border);border-radius:8px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all 0.25s ease}
.btn-ghost:hover{border-color:var(--ink);background:var(--off);transform:translateY(-2px);box-shadow:var(--shadow)}
.h-socials{display:flex;gap:12px;margin-top:30px;opacity:0;animation:slideRight 0.7s cubic-bezier(.22,1,.36,1) 0.92s forwards}
.h-soc{width:38px;height:38px;border-radius:10px;border:1.5px solid var(--border);background:white;display:flex;align-items:center;justify-content:center;color:var(--ink2);text-decoration:none;transition:all 0.2s ease}
.h-soc:hover{border-color:var(--blue);color:var(--blue);background:var(--blue-lt);transform:translateY(-3px);box-shadow:0 4px 16px rgba(59,130,246,0.14)}
.h-soc svg{width:16px;height:16px}
.h-right{display:flex;justify-content:center;align-items:center;opacity:0;animation:fadeScaleIn 0.9s cubic-bezier(.22,1,.36,1) 0.35s forwards}
@keyframes fadeScaleIn{from{opacity:0;transform:scale(0.92) translateY(24px)}to{opacity:1;transform:scale(1) translateY(0)}}
.av-outer{position:relative;width:320px;height:400px;display:flex;align-items:center;justify-content:center}
.av-rings-svg{position:absolute;inset:-55px;z-index:0;pointer-events:none}
.ring-outer{transform-origin:center;animation:spinCW 22s linear infinite}
.ring-inner{transform-origin:center;animation:spinCCW 16s linear infinite}
@keyframes spinCW{to{transform:rotate(360deg)}}
@keyframes spinCCW{to{transform:rotate(-360deg)}}
.scan-line{animation:scanAnim 3s ease-in-out infinite}
@keyframes scanAnim{0%{transform:translateY(-160px);opacity:0}20%{opacity:0.7}80%{opacity:0.7}100%{transform:translateY(160px);opacity:0}}
.node-pulse{animation:nodePulseAnim 2s ease-in-out infinite}
@keyframes nodePulseAnim{0%,100%{opacity:0.5}50%{opacity:1}}
.av-hex{position:relative;z-index:2;width:280px;height:330px;clip-path:polygon(50% 0%,95% 15%,100% 55%,85% 92%,50% 100%,15% 92%,0% 55%,5% 15%);overflow:hidden;animation:hexGlow 3s ease-in-out infinite}
@keyframes hexGlow{0%,100%{box-shadow:0 0 0 2px rgba(59,130,246,0.3),0 20px 60px rgba(59,130,246,0.18),0 4px 20px rgba(0,0,0,0.12)}50%{box-shadow:0 0 0 4px rgba(59,130,246,0.5),0 24px 70px rgba(59,130,246,0.28),0 4px 20px rgba(0,0,0,0.12)}}
.av-photo{width:100%;height:100%;object-fit:cover;object-position:center 30%;display:block;filter:saturate(1.05) contrast(1.02);transform:scale(1.18);transition:transform 0.3s ease}
.av-hex::after{content:"";position:absolute;top:0;left:-100%;width:50%;height:100%;background:linear-gradient(105deg,transparent,rgba(255,255,255,0.4),transparent);animation:shimmer 4s ease-in-out 2s infinite}
@keyframes shimmer{0%{left:-100%}100%{left:200%}}
.fl-card{position:absolute;background:white;border-radius:14px;border:1px solid var(--border);box-shadow:0 8px 32px rgba(0,0,0,0.10);padding:10px 16px;display:flex;align-items:center;gap:10px;white-space:nowrap;z-index:5}
.fl-1{top:10px;right:-20px;animation:float1 3.5s ease-in-out infinite}
.fl-2{bottom:60px;left:-20px;animation:float2 4s ease-in-out 0.8s infinite}
.fl-3{bottom:0;right:10px;animation:float1 3.2s ease-in-out 1.3s infinite}
@keyframes float1{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
@keyframes float2{0%,100%{transform:translateY(0)}50%{transform:translateY(7px)}}
.fl-icon{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ic-blue{background:#eff6ff;color:#3b82f6}
.ic-amber{background:#fffbeb;color:#f59e0b}
.ic-green{background:#f0fdf4;color:#22c55e}
.fl-icon svg{width:16px;height:16px}
.fl-lbl{font-size:9.5px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:var(--ink3)}
.fl-val{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:var(--ink)}
.h-scroll{position:absolute;bottom:32px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:6px;opacity:0;animation:fadeIn 1s ease 1.5s forwards;z-index:1}
.h-scroll span{font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:var(--ink3)}
.h-scroll-mouse{width:20px;height:32px;border-radius:99px;border:1.5px solid #d4d4d8;display:flex;justify-content:center;padding-top:5px}
.h-scroll-wheel{width:3px;height:6px;border-radius:99px;background:var(--ink3);animation:scrollWheel 1.5s ease-in-out infinite}
@keyframes scrollWheel{0%{transform:translateY(0);opacity:1}100%{transform:translateY(9px);opacity:0}}
@keyframes slideRight{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
@keyframes fadeIn{to{opacity:1}}
.corner-tl,.corner-tr,.corner-bl,.corner-br{position:absolute;width:28px;height:28px;z-index:6}
.corner-tl{top:-8px;left:-8px;border-top:2px solid #3b82f6;border-left:2px solid #3b82f6}
.corner-tr{top:-8px;right:-8px;border-top:2px solid #3b82f6;border-right:2px solid #3b82f6}
.corner-bl{bottom:-8px;left:-8px;border-bottom:2px solid #3b82f6;border-left:2px solid #3b82f6}
.corner-br{bottom:-8px;right:-8px;border-bottom:2px solid #3b82f6;border-right:2px solid #3b82f6}
@media(max-width:860px){
  .h-grid{grid-template-columns:1fr;gap:48px;padding:100px 0 60px;text-align:center}
  .h-right{order:-1}
  .av-outer{width:240px;height:300px}
  .av-hex{width:210px;height:250px}
  .fl-1,.fl-2,.fl-3{display:none}
  .h-eyebrow,.h-roles,.h-skills,.h-btns,.h-socials{justify-content:center}
  .h-bio{margin:24px auto 0}
  .h-scroll{display:none}
}
`;

const NODES = [
  { cx: 210, cy: 15, r: 5, delay: "0s" },
  { cx: 405, cy: 240, r: 4, delay: "0.3s" },
  { cx: 210, cy: 465, r: 5, delay: "0.6s" },
  { cx: 15, cy: 240, r: 4, delay: "0.9s" },
  { cx: 355, cy: 68, r: 3, delay: "1.2s" },
  { cx: 355, cy: 412, r: 3, delay: "1.5s" },
  { cx: 65, cy: 68, r: 3, delay: "0.4s" },
  { cx: 65, cy: 412, r: 3, delay: "0.7s" },
];

function CircuitRings() {
  return (
    <svg
      className="av-rings-svg"
      viewBox="0 0 420 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="scanGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <g className="ring-outer">
        <ellipse
          cx="210"
          cy="240"
          rx="195"
          ry="225"
          stroke="#3b82f6"
          strokeWidth="1"
          strokeDasharray="8 6"
          opacity="0.25"
        />
      </g>
      <g className="ring-inner">
        <ellipse
          cx="210"
          cy="240"
          rx="155"
          ry="178"
          stroke="#93c5fd"
          strokeWidth="1"
          strokeDasharray="4 8"
          opacity="0.3"
        />
      </g>
      {NODES.map((n, i) => (
        <circle
          key={i}
          cx={n.cx}
          cy={n.cy}
          r={n.r}
          fill="#3b82f6"
          opacity="0.5"
          style={{
            animationDelay: n.delay,
            animation: "nodePulseAnim 2s ease-in-out infinite",
          }}
        />
      ))}
      <path
        d="M210 15 L210 60"
        stroke="#3b82f6"
        strokeWidth="1"
        opacity="0.2"
      />
      <path
        d="M405 240 L360 240"
        stroke="#3b82f6"
        strokeWidth="1"
        opacity="0.2"
      />
      <path
        d="M210 465 L210 420"
        stroke="#3b82f6"
        strokeWidth="1"
        opacity="0.2"
      />
      <path
        d="M15 240 L60 240"
        stroke="#3b82f6"
        strokeWidth="1"
        opacity="0.2"
      />
      <path
        d="M80 80 L80 50 L110 50"
        stroke="#3b82f6"
        strokeWidth="1.5"
        opacity="0.35"
        strokeLinecap="round"
      />
      <path
        d="M340 80 L340 50 L310 50"
        stroke="#3b82f6"
        strokeWidth="1.5"
        opacity="0.35"
        strokeLinecap="round"
      />
      <path
        d="M80 400 L80 430 L110 430"
        stroke="#3b82f6"
        strokeWidth="1.5"
        opacity="0.35"
        strokeLinecap="round"
      />
      <path
        d="M340 400 L340 430 L310 430"
        stroke="#3b82f6"
        strokeWidth="1.5"
        opacity="0.35"
        strokeLinecap="round"
      />
      <line
        x1="55"
        y1="240"
        x2="365"
        y2="240"
        stroke="url(#scanGrad)"
        strokeWidth="1.5"
        opacity="0.7"
        className="scan-line"
      />
    </svg>
  );
}

function useTypewriter(words, speed = 85, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[wIdx];
    const delay = del ? speed / 2 : speed;
    const t = setTimeout(() => {
      if (!del) {
        setDisplayed(word.slice(0, cIdx + 1));
        if (cIdx + 1 === word.length) setTimeout(() => setDel(true), pause);
        else setCIdx((c) => c + 1);
      } else {
        setDisplayed(word.slice(0, cIdx - 1));
        if (cIdx - 1 === 0) {
          setDel(false);
          setWIdx((i) => (i + 1) % words.length);
          setCIdx(0);
        } else setCIdx((c) => c - 1);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [cIdx, del, wIdx, words, speed, pause]);
  return displayed;
}

const SKILLS = [
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "MySQL",
  "Tailwind CSS",
  "C++ / DSA",
  "Git & GitHub",
  "Manual Testing",
  "Spline",
];

// ✅ Updated: using direct image path instead of base64
const IMG = "/image.png";

export default function Hero() {
  const typed = useTypewriter([
    "Full Stack Developer",
    " DSA|C++",
    "MERN Developer",
    "Open Source Learner",
  ]);
  return (
    <>
      <style>{css}</style>
      <section className="h-wrap" id="home">
        <div className="h-bg" />
        <div className="h-glow" />
        <div className="h-grid">
          <div className="h-left">
            <span className="h-eyebrow">
              <span className="h-eyebrow-dot" />
              Available for Opportunities
            </span>
            <div className="h-name-wrap">
              <div className="h-name">
                Hello, I'm <span className="h-name-hl">Sameera</span>
              </div>
            </div>
            <div className="h-typed-row">
              {typed}
              <span className="h-cursor" />
            </div>
            <div className="h-roles">
              {["UG CSE'26", "Full Stack Dev", "MERN"].map((r) => (
                <span key={r} className="h-pill">
                  {r}
                </span>
              ))}
            </div>
            <p className="h-bio">
              Passionate Computer Science student building impactful technology.
              Skilled in full-stack development with the MERN stack, C++, and
              problem solving through data structures &amp; algorithms.
            </p>
            <div className="h-skills">
              {SKILLS.map((s) => (
                <span key={s} className="h-skill">
                  {s}
                </span>
              ))}
            </div>
            <div className="h-btns">
              <a href="#projects" className="btn-main">
                <span>View Projects</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
              <a href="#contact" className="btn-ghost">
                Get In Touch
              </a>
            </div>
            <div className="h-socials">
              <a
                href="https://github.com/kxnekin"
                target="_blank"
                rel="noreferrer"
                className="h-soc"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/sameera-b-b-b53bb8327/"
                target="_blank"
                rel="noreferrer"
                className="h-soc"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="mailto:sameera@email.com" className="h-soc">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="3" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
              </a>
            </div>
          </div>

          <div className="h-right">
            <div className="av-outer">
              <CircuitRings />
              <div className="av-hex">
                <img src={IMG} alt="Sameera" className="av-photo" />
              </div>
              <div className="corner-tl" />
              <div className="corner-tr" />
              <div className="corner-bl" />
              <div className="corner-br" />
              <div className="fl-card fl-1">
                <div className="fl-icon ic-blue">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <div className="fl-lbl">Stack</div>
                  <div className="fl-val">MERN Dev</div>
                </div>
              </div>
              <div className="fl-card fl-2">
                <div className="fl-icon ic-amber">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
                  </svg>
                </div>
                <div>
                  <div className="fl-lbl">Expertise</div>
                  <div className="fl-val">DSA / C++</div>
                </div>
              </div>
              <div className="fl-card fl-3">
                <div className="fl-icon ic-green">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" />
                    <path
                      d="M9 12l2 2 4-4"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="fl-lbl">Status</div>
                  <div className="fl-val">Open to Work</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-scroll">
          <span>Scroll</span>
          <div className="h-scroll-mouse">
            <div className="h-scroll-wheel" />
          </div>
        </div>
      </section>
    </>
  );
}