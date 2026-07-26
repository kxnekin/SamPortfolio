import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');

.ct-section {
  padding:100px clamp(20px,6vw,80px);
  background:#f7f6f3;position:relative;overflow:hidden;
}
.ct-section::before {
  content:'';position:absolute;inset:0;
  background-image:radial-gradient(circle,#e2e0db 1px,transparent 1px);
  background-size:28px 28px;opacity:0.5;pointer-events:none;
}
.ct-inner { max-width:640px;margin:0 auto;position:relative;z-index:1; }

.ct-head { text-align:center;margin-bottom:56px; }
.ct-eyebrow {
  display:inline-flex;align-items:center;gap:10px;
  font-family:'Outfit',sans-serif;font-size:11px;font-weight:500;
  letter-spacing:0.22em;text-transform:uppercase;color:#3b82f6;margin-bottom:16px;
}
.ct-eyebrow::before,.ct-eyebrow::after {
  content:'';width:32px;height:1px;background:#3b82f6;opacity:0.4;
}
.ct-title {
  font-family:'Syne',sans-serif;font-size:clamp(32px,4vw,52px);
  font-weight:800;letter-spacing:-0.03em;color:#18181b;
}
.ct-title span { color:#3b82f6; }
.ct-sub {
  font-family:'Outfit',sans-serif;font-size:15px;font-weight:300;
  color:#71717a;margin-top:12px;
}

.ct-form {
  background:white;border:1.5px solid #e2e0db;border-radius:20px;
  padding:36px;display:flex;flex-direction:column;gap:18px;
}
.ct-row { display:flex;gap:16px;flex-wrap:wrap; }
.ct-field { flex:1;min-width:200px;display:flex;flex-direction:column;gap:6px; }
.ct-label {
  font-family:'Outfit',sans-serif;font-size:12.5px;font-weight:500;
  color:#52525b;letter-spacing:0.03em;
}
.ct-input, .ct-textarea {
  font-family:'Outfit',sans-serif;font-size:14px;color:#18181b;
  padding:12px 14px;border-radius:10px;
  border:1.5px solid #e2e0db;background:#fafaf9;
  transition:all 0.2s ease;outline:none;
}
.ct-input:focus, .ct-textarea:focus {
  border-color:#3b82f6;background:white;
  box-shadow:0 0 0 3px rgba(59,130,246,0.1);
}
.ct-textarea { resize:vertical;min-height:120px;font-family:'Outfit',sans-serif; }

.ct-submit {
  font-family:'Outfit',sans-serif;font-size:14px;font-weight:500;
  padding:13px 24px;border-radius:10px;
  background:#18181b;color:white;border:1.5px solid #18181b;
  cursor:pointer;transition:all 0.2s ease;
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
}
.ct-submit:hover:not(:disabled) { background:#3b82f6;border-color:#3b82f6; }
.ct-submit:disabled { opacity:0.6;cursor:not-allowed; }

.ct-status {
  font-family:'Outfit',sans-serif;font-size:13.5px;
  padding:12px 14px;border-radius:10px;text-align:center;
}
.ct-status.success { background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0; }
.ct-status.error { background:#fef2f2;color:#dc2626;border:1px solid #fecaca; }

/* honeypot field - hidden from real users, bots fill it in */
.ct-hp { position:absolute;left:-9999px;opacity:0;pointer-events:none; }
`;

// TODO: replace with your EmailJS Service ID, Template ID, and Public Key
const SERVICE_ID = "service_uw9jvkj";
const TEMPLATE_ID = "template_vfqatdy";
const PUBLIC_KEY = "EWp7pB2fEuNJjZGGy";

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState({ type: null, msg: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // honeypot check - if this hidden field got filled, it's a bot
    if (formRef.current.hp_field.value) return;

    setSending(true);
    setStatus({ type: null, msg: "" });

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setStatus({ type: "success", msg: "Message sent — I'll get back to you soon." });
        formRef.current.reset();
      })
      .catch(() => {
        setStatus({ type: "error", msg: "Something went wrong. Please try again or email me directly." });
      })
      .finally(() => setSending(false));
  };

  return (
    <>
      <style>{css}</style>
      <section className="ct-section" id="contact">
        <div className="ct-inner">
          <div className="ct-head">
            <div className="ct-eyebrow">Get in touch</div>
            <h2 className="ct-title">
              Let's <span>connect</span>
            </h2>
            <p className="ct-sub">Have a project or opportunity in mind? Send a message.</p>
          </div>

          <form ref={formRef} className="ct-form" onSubmit={handleSubmit}>
            {/* honeypot - keep this in the DOM but hidden */}
            <input
              type="text"
              name="hp_field"
              className="ct-hp"
              tabIndex="-1"
              autoComplete="off"
            />

            <div className="ct-row">
              <div className="ct-field">
                <label className="ct-label" htmlFor="from_name">Name</label>
                <input
                  id="from_name"
                  name="from_name"
                  type="text"
                  required
                  className="ct-input"
                  placeholder="Your name"
                />
              </div>
              <div className="ct-field">
                <label className="ct-label" htmlFor="from_email">Email</label>
                <input
                  id="from_email"
                  name="from_email"
                  type="email"
                  required
                  className="ct-input"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="ct-field">
              <label className="ct-label" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                className="ct-textarea"
                placeholder="Tell me a bit about what you have in mind..."
              />
            </div>

            <button type="submit" className="ct-submit" disabled={sending}>
              {sending ? "Sending..." : "Send message"}
            </button>

            {status.type && (
              <div className={`ct-status ${status.type}`}>{status.msg}</div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}