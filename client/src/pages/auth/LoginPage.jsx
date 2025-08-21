import { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./Auth.css";
import ClassicArt from "../../assets/art-classic.jpg";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      setUserInfo(data);
      setRedirect(true);
    } else {
      setError(data.error || "Login failed. Please try again.");
    }
    setLoading(false);
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="auth-page">
      <div className="login-card-classic">
        <div className="img-panel">
          <img
            src={ClassicArt}
            alt="A classic painting of angels flying among clouds on an ornate ceiling"
          ></img>
        </div>
        <div className="form-panel">
            <form className="login-form" onSubmit={login}>
              <h1>Login Blog Art</h1>
              {error && <p className="error-message">{error}</p>}
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
                disabled={loading}
              />
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                disabled={loading}
              />
              <button disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
              <span className="span-form">Don't have an anccount?&nbsp;<Link className="link-form" to="/register">Sing up now</Link></span>

            </form>
          </div>
      </div>
    </div>
  );
}
