import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => (
  <footer >
    <div className="footer-copyright">
        <p>© 2025 - Red Art Blog</p>
    </div>
    <div className="footer-social">
      <a
        href="https://github.com/aldamonique"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub Profile"
        className="github"
      >
        <i className="bi bi-github" />
      </a>
      <a
        href="https://www.linkedin.com/in/alda-monique/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn Profile"
        className="linkedin"
      >
        <i className="bi bi-linkedin" />
      </a>
    </div>

    <div className=" footer-links">
        <Link className="text" to="#">Privacy</Link>
    </div>

  </footer>
);

export default Footer;
