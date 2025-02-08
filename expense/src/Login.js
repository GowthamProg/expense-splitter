// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Allstyles/Loginpage.css";

// const Login = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const handleLogin = async () => {
//         console.log("Logging in with:", { username, password });

//         try {
//             const response = await fetch("https://expense-splitter-ylwf.onrender.com/Login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ username, password }),
//             });

//             if (!response.ok) {
//                 throw new Error("Invalid credentials or server error");
//             }

//             const data = await response.json();
//             localStorage.setItem("username", data.username);
//             localStorage.setItem("token", data.token);
//             alert(data.message);
//             navigate("/dashboard");
//         } catch (error) {
//             console.error("Login error:", error);
//             alert("Login failed. Please try again.");
//         }
//     };

//     return (
//         <div className="Loginpage">
//             <h2>LOGIN</h2>
//             <label>Username: </label>
//             <input
//                 type="text"
//                 placeholder="Username"
//                 required
//                 className="inbox"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//             />
//             <br />
//             <label>Password: </label>
//             <input
//                 type="password"
//                 placeholder="Password"
//                 required
//                 className="inbox"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <br />
//             <button onClick={handleLogin} className="login">Login</button>
//             <p>--------------------OR--------------------</p>
//             <p>Don't have an account?</p>
//             <button className="button" onClick={() => navigate("/Registor")}>Register</button>
//         </div>
//     );
// };

// export default Login;












import React,{useState} from 'react';
import {BrowserRouter as useLocation, useNavigate} from 'react-router-dom';
import "./Allstyles/Loginpage.css";
const Login = () =>{
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    //const location=useLocation();
    const navigate = useNavigate();

    const handlelog = async ()=>{
        console.log("login with : ",{username,password}); //https://expense-splitter-ylwf.onrender.com/Login
        const response= await fetch("http://localhost:5000/Login",{
            method:"POST",
            headers:{"Content-Type" : "application/json"},
            body : JSON.stringify({username,password})
        });
        const data =await response.json();
        localStorage.setItem('username',data.username);
        if(response.ok) 
        {
            alert(data.message);
            localStorage.setItem('token',data.token);
            //navigate('/dashboard',{state:{username:data.username}});
            navigate('/dashboard');
            console.log(data.token);
        }
        else alert(data.message);
    };
 
return (
    <div className="Loginpage">
        <h2>LOGIN</h2>
        <label>Username : </label>
        <input type='text' placeholder='Username' required className='inbox' onChange={(e)=>setusername(e.target.value)} />
        <br/>
        <label>password : </label>
        <input type='password' placeholder='password' required className='inbox' value={password} onChange={(e)=> setpassword(e.target.value)}  />
        <br/>
        <button onClick={handlelog} className='login'> login </button>
        <p>--------------------OR--------------------</p>
        <p>Don't have account ?</p>
        <button className='button' onClick={()=>navigate('/Registor')}> Registor </button>
        <br/>
        {/* <button onClick={()=>navigate('/')}> close</button> */}

    </div>
)
};
export default Login;