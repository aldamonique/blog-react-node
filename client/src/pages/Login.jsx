import { useState } from "react";
import { Link } from "react-router-dom";
import Register from "./Register";

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    function login(ev){
        ev.preventDefault();
        fetch('http://localhost:4000/login', {
            method: 'POST',
            body:JSON.stringify({username, password}), 
            headers{'Content-Type': 'application/json'},
        })
    }

    return(
        
       <form className="login" onSubmit={login}>

            <h1>Login</h1>
            <input type="text" placeholder="username" value={username} onChange={ev=> setUsername(ev.target.value)}/>
            <input type="password" placeholder="password" value={password} onChange={ev=> setPassword(ev.target.value)}/> 
            <button >Login</button>
            

            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </form>
        
    );
}