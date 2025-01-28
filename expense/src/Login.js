import React,{useState} from 'react';
import {BrowserRouter as Link, useLocation, useNavigate} from 'react-router-dom';
import "./Allstyles/Loginpage.css";
import Registor from './Registor';
const Login = () =>{
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    const location=useLocation();

    const handlelog = async ()=>{
        console.log("login with : ",{username,password});
        const response= await fetch("http://localhost:5000/Login",{
            method:"POST",
            headers:{"Content-Type" : "application/json"},
            body : JSON.stringify({username,password})
        });
        const data =await response.json();
        if(response.ok) 
        {
            alert(data.message);
            localStorage.setItem('token',data.token);
            navigate('/dashboard',{state:{username:data.username}});
            console.log(data.token);
        }
        else alert(data.message);
    };
 
return (
    <div className="Loginpage">
        <h2>LOGIN</h2>
        <label>Username : </label>
        <input type='text' placeholder='Username'onChange={(e)=>setusername(e.target.value)} required/>
        <br/>
        <label>password : </label>
        <input type='text' placeholder='password' value={password} onChange={(e)=> setpassword(e.target.value)} required />
        <br/>
        <button onClick={handlelog}> login </button>
        <button onClick={()=>navigate('/Registor')}> Registor </button>
        <button onClick={()=>navigate('/')}> close</button>

    </div>
)
};
export default Login;