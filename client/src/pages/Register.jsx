import { Link } from "react-router-dom";
export default function Register(){
    return(
       <form className="register">
        <h1>Register</h1>
            <input type="text" placeholder="name"/>
            <input type="text" placeholder="username"/>
            <input type="password" placeholder="password"/> 
            <input type="password" placeholder="confirm password"/> 

            <button>Register</button>

            <p>Already have an account? <Link to="/login">Log in</Link></p>

        </form>

        
    );
}