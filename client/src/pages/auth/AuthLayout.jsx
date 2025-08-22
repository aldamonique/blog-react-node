import "./Auth.css";
import ClassicArt from "../../assets/art-classic.jpg";

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="auth-page">
      <div className="auth-card-classic">
        <div className="img-panel">
          <img
            src={ClassicArt}
            alt="A classic painting of angels flying among clouds on an ornate ceiling"
          ></img>
        </div>
        <div className="form-panel">
          <div className="container-form">
            {title && <h1>{title}</h1>}
            {subtitle && <p>{subtitle}</p>}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
