import { Link } from "react-router-dom";

export default function Login(){
    return(
       <form className="login">

            <h1>Login</h1>
            <input type="text" placeholder="username"/>
            <input type="password" placeholder="password"/> 
            <button>Login</button>

            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </form>
        
    );
}