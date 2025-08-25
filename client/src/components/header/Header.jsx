import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import "./Header.css";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => setMenuOpen(false);

  async function logout() {
    await fetch("http://localhost:4000/auth/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    navigate("/");
  }

  const username = userInfo?.username;
  const name = userInfo?.name;

  return (

        <><div 
        className={`menu-overlay ${menuOpen ? "open" : ""}`} 
        onClick={closeMenu}
      ></div>
    <header className="fixed-top">
      <div className="header-left">
       <button className="hamburger-button" onClick={toggleMenu} aria-label="Toggle menu">
            <i className="bi bi-list"></i>
        </button>
        <div className="desktop-icons">

        <i className="bi bi-search" title="Search for posts"></i>
        <i className="bi bi-bell-fill" title=""></i>
        <Link to="/create" className="create-post-icon-desktop">
          <i className="bi bi-plus-lg" title="Add new post"></i>
        </Link>
        </div>
      </div>

      <Link to="/" className="logo">
        The Art Blog
      </Link>

      <div className="header-right">
          {username ?(
            <>
              <div className="navbar-user">
                <Link className="container-profile" to="/" onClick={closeMenu}>
                  <i className=" person bi bi-person-fill"></i>
                  <span className="profile-name">{name}</span>
                </Link>
                <Link to="/">
                  <button className="logout-button" onClick={logout}>
                    <i className="bi bi-box-arrow-right"></i>Logout
                  </button>
                </Link>
              </div>
            </>
          ): (
            <>
              <div className="navbar-non-user">
                <Link to="/login" onClick={closeMenu}>
                  <button className="login-button">
                    <i className=" person bi bi-person" />
                    &nbsp;&nbsp;Login
                  </button>
                </Link>
                <Link to="/register" onClick={closeMenu}>
                  <button className="singup-button">Register</button>
                </Link>
              </div>
            </>
          )}
      </div>
    </header>

   <nav className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-menu-button" onClick={closeMenu} aria-label="Close menu">
          <i className="bi bi-x "></i>
        </button>

        <div className="sidebar-links">
            <Link to="/search" className="sidebar-link" title="Search for posts" onClick={closeMenu}>
                <i className="bi bi-search"></i> Search 
            </Link>
            <Link to="/create" className="sidebar-link" title="Add new post" onClick={closeMenu}>
                <i className="bi bi-plus-lg"></i> New Post
            </Link>
        </div>

        <div className="sidebar-auth">
            {username ? (
                <div className="sidebar-links">
                    <Link className="sidebar-link" onClick={logout}>
                        <i className="bi bi-box-arrow-right"></i>Logout
                    </Link>
                </div>
            ):
            (
                <div className="navbar-non-user">
                    <Link to="/login" onClick={closeMenu}>
                        <button className="login-button">
                           <i className="person bi bi-person small" />&nbsp;&nbsp;Login
                        </button>
                    </Link>
                    <Link to="/register" onClick={closeMenu}>
                        <button className="singup-button">Sing Up</button>
                    </Link>
                </div>
            )}
        </div>
      </nav>

    </>
  );
}
