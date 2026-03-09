import { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSuccess,setIsSuccess] = useState(false);
    const [msg,setMsg] = useState("");
    


    const handleLogin = () => {
        if(username === "sumith" && password === "password"){
            setIsSuccess(true);
            setMsg("Login successful");
        }else{
            setIsSuccess(false);
            setMsg("Invalid username or password");
        }
    }
  return <div className="login-container">
        <p>Username</p>
        <input type="text" className="login-input" value={username} onChange={(e) => setUsername(e.target.value)} />
        <p>Password</p>
        <input type="password" className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="login-button" onClick={handleLogin}>Login</button>
        {
            isSuccess && <p className="login-success-msg"> {msg}</p>
        }
        {
            !isSuccess && <p className="login-error-msg">{msg}</p>
        }
    </div>;
};
export default Login;