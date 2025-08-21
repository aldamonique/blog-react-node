import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import './Header.css';

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:4000/auth/profile', {
          credentials: 'include',
        });
        if (response.ok) {
          const userInfoData = await response.json();
          setUserInfo(userInfoData);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, [setUserInfo]);

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
      <Link to="/" className="logo">Red Art Blog</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <button onClick={logout} style={{cursor: 'pointer'}}>Logout</button>
            <Link className="container-profile" to="/"> 
              <i className=" person bi bi-person-circle"></i>
              <span className="profile-name">({name})</span>
            </Link>
          </>
        )}
        {!username && (
          <>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/register"><button>Register</button></Link>
          </>
        )}
      </nav>
    </header>
  );
}