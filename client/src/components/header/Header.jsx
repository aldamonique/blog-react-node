import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import './Header.css';

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  async function logout() {
    await fetch('http://localhost:4000/auth/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
    navigate('/'); 
  }

  const username = userInfo?.username;
  const name = userInfo?.name;

  return (
    <header>
     <div className="header-placeholder">
      <i className="bi bi-search"></i>
      <i className="bi bi-bell-fill"></i>
      {username ? (
        <Link to="/create">
          <i className="bi bi-plus-lg"></i>
        </Link>
      ) : (
        <Link to="/">
          <i className="bi bi-plus-lg"></i>
        </Link>
      )}

    </div>
      <Link to="/" className="logo">Red Art Blog</Link>


      <nav>
        {username && (
          <>
          <div className="navbar-user">           
             <Link className="container-profile" to="/"> 
              <i className=" person bi bi-person-circle"></i>
              <span className="profile-name">{name}</span>
            </Link>
            <Link to="/"><button className="logout-button" onClick={logout}><i className="bi bi-box-arrow-right"></i>Logout</button></Link>
          </div>
          </>
        )}
        {!username && (
          <>

          <div className="navbar-non-user">
            <Link to="/login"><button className="login-button"><i className=" person bi bi-person"/>&nbsp;&nbsp;Login</button></Link>
            <Link to="/register"><button className="singup-button">Register</button></Link>
          </div>
            
          </>
        )}
      </nav>
    </header>
  );
}