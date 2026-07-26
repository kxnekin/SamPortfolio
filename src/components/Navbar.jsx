import { useState, useEffect } from "react";
import { Link } from "react-scroll";

const NAV_ITEMS = ["home", "skills", "projects", "experience", "contact"];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@400;500&display=swap');

.nav-root {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  padding: 0 clamp(16px, 5vw, 60px);
  transition: all 0.4s cubic-bezier(.22,1,.36,1);
}

.nav-root.scrolled {
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(226,224,219,0.8);
  box-shadow: 0 4px 24px rgba(0,0,0,0.06);
}

.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* LOGO */
.nav-logo {
  font-family: 'Syne', sans-serif;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: #18181b;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.nav-logo-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #3b82f6;
  display: inline-block;
  animation: logoDot 2.5s ease-in-out infinite;
}
@keyframes logoDot {
  0%,100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59,130,246,0.4); }
  50% { transform: scale(1.3); box-shadow: 0 0 0 6px rgba(59,130,246,0); }
}

/* DESKTOP LINKS */
.nav-links {
  display: flex;
  align-items: center;
  gap: 2px;
  list-style: none;
}

.nav-link-item {
  position: relative;
  font-family: 'Outfit', sans-serif;
  font-size: 13.5px;
  font-weight: 500;
  color: #52525b;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  letter-spacing: 0.01em;
  transition: color 0.2s ease;
  text-transform: capitalize;
}

.nav-link-item::after {
  content: '';
  position: absolute;
  bottom: 4px; left: 50%;
  transform: translateX(-50%);
  width: 0; height: 2px;
  border-radius: 99px;
  background: #3b82f6;
  transition: width 0.25s cubic-bezier(.22,1,.36,1);
}

.nav-link-item:hover { color: #18181b; }
.nav-link-item:hover::after { width: 24px; }
.nav-link-item.active { color: #3b82f6; }
.nav-link-item.active::after { width: 24px; }

/* CTA BUTTON */
.nav-cta {
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 500;
  padding: 9px 22px;
  background: #18181b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-left: 12px;
  transition: all 0.25s cubic-bezier(.22,1,.36,1);
  position: relative;
  overflow: hidden;
}
.nav-cta::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg,#3b82f6,#1d4ed8);
  opacity: 0;
  transition: opacity 0.25s;
}
.nav-cta:hover::after { opacity: 1; }
.nav-cta > * { position: relative; z-index: 1; }
.nav-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(59,130,246,0.3); }
.nav-cta svg { width: 13px; height: 13px; }

/* HAMBURGER */
.nav-burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  border: 1.5px solid #e2e0db;
  background: white;
  transition: all 0.2s;
}
.nav-burger:hover { border-color: #3b82f6; }
.nav-burger-bar {
  width: 20px; height: 2px;
  border-radius: 99px;
  background: #18181b;
  transition: all 0.3s cubic-bezier(.22,1,.36,1);
  transform-origin: center;
}
.nav-burger.open .nav-burger-bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.nav-burger.open .nav-burger-bar:nth-child(2) { opacity: 0; transform: scaleX(0); }
.nav-burger.open .nav-burger-bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* MOBILE MENU */
.nav-mobile {
  position: fixed;
  top: 68px; left: 0; right: 0;
  z-index: 999;
  background: rgba(255,255,255,0.97);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #e2e0db;
  padding: 16px clamp(16px,5vw,60px) 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transform: translateY(-10px);
  opacity: 0;
  animation: mobileSlide 0.3s cubic-bezier(.22,1,.36,1) forwards;
  box-shadow: 0 16px 40px rgba(0,0,0,0.08);
}
@keyframes mobileSlide {
  to { transform: translateY(0); opacity: 1; }
}
.nav-mobile-link {
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #52525b;
  padding: 12px 16px;
  border-radius: 10px;
  cursor: pointer;
  text-transform: capitalize;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-mobile-link:hover { background: #eff6ff; color: #3b82f6; }
.nav-mobile-link svg { width: 14px; height: 14px; opacity: 0.4; }
.nav-mobile-divider { height: 1px; background: #e2e0db; margin: 8px 0; }

/* Progress bar */
.nav-progress {
  position: absolute;
  bottom: 0; left: 0;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  transition: width 0.1s linear;
  border-radius: 0 99px 99px 0;
}

@media (max-width: 768px) {
  .nav-links, .nav-cta { display: none; }
  .nav-burger { display: flex; }
}
`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      setScrolled(y > 20);
      setProgress(max > 0 ? (y / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{css}</style>
      <nav className={`nav-root${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          {/* Logo */}
          <div className="nav-logo">
            Sameera
            <span className="nav-logo-dot" />
          </div>

          {/* Desktop links */}
          <ul className="nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                <Link
                  to={item}
                  smooth
                  duration={600}
                  offset={-80}
                  spy
                  onSetActive={() => setActive(item)}
                  className={`nav-link-item${active === item ? " active" : ""}`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="nav-cta"
            style={{ display: "none" }}
          />
          <Link
            to="contact"
            smooth
            duration={600}
            offset={-80}
            className="nav-cta"
          >
            <span>Hire Me</span>
            <svg
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M2 7h10M8 3l4 4-4 4" />
            </svg>
          </Link>

          {/* Hamburger */}
          <button
            className={`nav-burger${open ? " open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className="nav-burger-bar" />
            <span className="nav-burger-bar" />
            <span className="nav-burger-bar" />
          </button>
        </div>

        {/* Scroll progress */}
        {scrolled && (
          <div className="nav-progress" style={{ width: `${progress}%` }} />
        )}
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="nav-mobile">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item}
              to={item}
              smooth
              duration={600}
              offset={-80}
              className="nav-mobile-link"
              onClick={() => setOpen(false)}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 8h8M9 5l3 3-3 3" />
              </svg>
            </Link>
          ))}
          <div className="nav-mobile-divider" />
          <Link
            to="contact"
            smooth
            duration={600}
            offset={-80}
            className="nav-mobile-link"
            onClick={() => setOpen(false)}
            style={{ color: "#3b82f6", fontWeight: 600 }}
          >
            Hire Me ✦
          </Link>
        </div>
      )}
    </>
  );
}