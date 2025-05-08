import React,{useState} from 'react';
import {BrowserRouter as useLocation, useNavigate} from 'react-router-dom';
import "./Allstyles/Loginpage.css";
import { url } from './backendurl';
const Login = () =>{
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    //const location=useLocation();
    const navigate = useNavigate();

    const handlelog = async ()=>{
        console.log("login with : ",{username,password}); //https://expense-splitter-ylwf.onrender.com/Login
        const response= await fetch(`${url}/Login`,{
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
        <input type='text' placeholder='Username'  className='inbox' onChange={(e)=>setusername(e.target.value)} />
        <br/>
        <label>password : </label>
        <input type='password' placeholder='password'  className='inbox' value={password} onChange={(e)=> setpassword(e.target.value)}  />
        <br/>
        <button onClick={handlelog} className='login'> login </button>
        <p>--------------------OR--------------------</p>
        <p>Don't have account ?</p>
        <button className='button' onClick={()=>navigate('/Register')}> Register </button>
        <br/>
        {/* <button onClick={()=>navigate('/')}> close</button> */}

    </div>
)
};
export default Login;