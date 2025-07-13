import { Link } from "react-router-dom";
import Logo from "../assets/ReadClubLogo.png"
export default function Header(){
    return( 
      <main><header>
        <Link to="/" className="logo">
          <img src={Logo} style={{height:"40px"}}/>
        </Link>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>

        </nav>
    </header>
    </main>     
    
      );
}