import { Link } from "react-scroll";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500&display=swap');

.ft-wrap {
  background:#18181b;
  padding:56px clamp(20px,6vw,80px) 28px;
  position:relative;overflow:hidden;
}

.ft-inner {
  max-width:1100px;margin:0 auto;position:relative;z-index:1;
}

/* TOP ROW */
.ft-top {
  display:flex;flex-wrap:wrap;align-items:center;
  justify-content:space-between;gap:24px;
  padding-bottom:28px;
  border-bottom:1px solid rgba(255,255,255,0.08);
  margin-bottom:24px;
}

.ft-logo {
  font-family:'Syne',sans-serif;font-size:22px;font-weight:800;
  letter-spacing:-0.04em;color:white;
}

/* nav */
.ft-nav { list-style:none;display:flex;flex-wrap:wrap;gap:28px; }
.ft-nav-link {
  font-family:'Outfit',sans-serif;font-size:14px;font-weight:400;
  color:rgba(255,255,255,0.55);cursor:pointer;
  text-decoration:none;transition:color 0.2s ease;
}
.ft-nav-link:hover { color:white; }

/* social icons */
.ft-socials { display:flex;gap:10px; }
.ft-soc {
  width:34px;height:34px;border-radius:9px;
  border:1px solid rgba(255,255,255,0.12);
  background:rgba(255,255,255,0.04);
  display:flex;align-items:center;justify-content:center;
  color:rgba(255,255,255,0.5);text-decoration:none;
  transition:all 0.2s ease;
}
.ft-soc:hover { border-color:#3b82f6;color:#3b82f6;background:rgba(59,130,246,0.1); }
.ft-soc svg { width:15px;height:15px; }

/* bottom */
.ft-copy {
  font-family:'Outfit',sans-serif;font-size:12.5px;
  color:rgba(255,255,255,0.35);font-weight:300;text-align:center;
}
.ft-copy span { color:rgba(255,255,255,0.55); }

@media(max-width:768px){
  .ft-top { flex-direction:column;align-items:flex-start; }
}
`;

const NAV_ITEMS = ["home", "skills", "projects", "experience", "contact"];

export default function Footer() {
  return (
    <>
      <style>{css}</style>
      <footer className="ft-wrap">
        <div className="ft-inner">
          <div className="ft-top">
            <div className="ft-logo">Sameera</div>

            <ul className="ft-nav">
              {NAV_ITEMS.map((item) => (
                <li key={item}>
                  <Link
                    to={item}
                    smooth
                    duration={600}
                    offset={-80}
                    className="ft-nav-link"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="ft-socials">
              <a
                href="https://github.com/kxnekin"
                target="_blank"
                rel="noreferrer"
                className="ft-soc"
                title="GitHub"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/sameera-b-b-b53bb8327/"
                target="_blank"
                rel="noreferrer"
                className="ft-soc"
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="mailto:sameera@example.com"
                className="ft-soc"
                title="Email"
              >
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

          <p className="ft-copy">
            © {new Date().getFullYear()} <span>Sameera</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}