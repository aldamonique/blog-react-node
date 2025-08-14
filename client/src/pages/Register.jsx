import { useState } from "react";
import { Link } from "react-router-dom";
export default function Register(){

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    async function register(ev){
        ev.preventDefault();
        const response  = await fetch('http://localhost:4000/register', {
            method : 'POST', 
            body: JSON.stringify({name, username, password }),
            headers: {'Content-Type': 'application/json'},
        });
        if (response.status === 200){
            alert('Registration successuful');
        }else{
            alert('Registration failed');
        }
    }

    return(
       <form className="register" onSubmit={register}>
        <h1>Register</h1>
            <input type="text" placeholder="name" value={name} 
            onChange={ev => setName(ev.target.value)}/>
            <input type="text" placeholder="userName" value={username} 
            onChange={ev => setUsername(ev.target.value)}/>
            <input type="password" placeholder="password" value={password} 
            onChange={ev => setPassword(ev.target.value)}/> 

            <button>Register</button>

            <p>Already have an account? <Link to="/login">Log in</Link></p>

        </form>

        
    );
}