import { useState } from "react";
import "../assets/css/login.css";

const Login2 = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const handleLogin=()=>{
        if(username === "sumith" && password === "password"){
           setIsSuccess(true);
           setError("Login successful");
        }else{
           setIsSuccess(false);
           setError("Invalid username or password");
        }
    }
    return <div className="login-container">
        <h1>Login</h1>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
         <p className={isSuccess ? "success-msg" : "error-msg"}> {error}</p>
    </div>
}

export default Login2;