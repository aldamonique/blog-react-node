import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Rota corrigida para '/auth/profile'
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
    // Rota corrigida para '/auth/logout'
    await fetch('http://localhost:4000/auth/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
    navigate('/'); // Redireciona para a página inicial
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <button onClick={logout} style={{cursor: 'pointer'}}>Logout ({username})</button>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}