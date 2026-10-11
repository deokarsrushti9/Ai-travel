import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthModal({ mode, onClose, onModeChange }) {
  const { login, register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isRegister = mode === "register";

  useEffect(() => {
    setError("");
    setName("");
    setEmail("");
    setPassword("");
  }, [mode]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  async function submit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isRegister) await register(name.trim(), email.trim(), password);
      else await login(email.trim(), password);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="tripora-auth-overlay" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="tripora-auth-modal" role="dialog" aria-modal="true" aria-labelledby="tripora-auth-title">
        <button type="button" className="tripora-auth-close" onClick={onClose} aria-label="Close authentication dialog">├ù</button>
        <div className="tripora-auth-content">
          <p className="tripora-auth-eyebrow">{isRegister ? "JOIN THE TRIPORA COMMUNITY" : "WELCOME BACK TO TRIPORA"}</p>
          <h2 id="tripora-auth-title">{isRegister ? "Create your account." : "Let's get you going."}</h2>
          <p className="tripora-auth-subtitle">
            {isRegister ? "A little planning. A lot of unforgettable moments. Let's get started." : "Sign in to pick up where your next adventure begins."}
          </p>
          {error && <div className="tripora-auth-error" role="alert">{error}</div>}
          <form onSubmit={submit} className="tripora-auth-form">
            {isRegister && (
              <>
                <label htmlFor="tripora-auth-name">Full name</label>
                <input id="tripora-auth-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" autoComplete="name" required />
              </>
            )}
            <label htmlFor="tripora-auth-email">Email address</label>
            <input id="tripora-auth-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required />
            <label htmlFor="tripora-auth-password">Password</label>
            <input id="tripora-auth-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={isRegister ? "At least 8 characters" : "Enter your password"} autoComplete={isRegister ? "new-password" : "current-password"} minLength={isRegister ? 8 : undefined} required />
            <button className="tripora-auth-submit" type="submit" disabled={loading}>
              {loading ? (isRegister ? "Creating account..." : "Signing in...") : (isRegister ? "Create my account" : "Sign in to Tripora")}
              {!loading && <span aria-hidden="true">ΓåÆ</span>}
            </button>
          </form>
          <p className="tripora-auth-switch">
            {isRegister ? "Already have an account?" : "New to Tripora?"}{" "}
            <button type="button" onClick={() => onModeChange(isRegister ? "login" : "register")}>
              {isRegister ? "Sign in" : "Create an account"}
            </button>
          </p>
          <p className="tripora-auth-legal">By continuing, you agree to use Tripora responsibly. Your account keeps your travel plans together.</p>
        </div>
      </section>
    </div>
  );
}
