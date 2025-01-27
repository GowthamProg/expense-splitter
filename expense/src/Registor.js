import React, { useState } from "react";
import Login from "./Login";
//import axios from 'axios';
import { BrowserRouter as Router,Route,Routes,Link,useNavigate } from "react-router-dom";
import './Allstyles/Registor.css';
const Registor =()=>{
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    const [mobileno,setmobileno]=useState('');

    const handlereg =async(e)=>{
        e.preventDefault();
        console.log("Registor with : ",{username,password,mobileno});
        const response = await fetch('http://localhost:5000/Registor',{
            method :"POST",
            headers: {"Content-Type": "application/json"},
            body :JSON.stringify({username,password,mobileno})
        });
        const data =await response.json();
        if(response.ok) {alert(data.message);}
        else alert(data.message);
    };

    const navigate = useNavigate();

    return (
        <div className="Registor">
        <h2>REGISTOR</h2>
        <label>Username : </label>
        <input type='text' placeholder='Username' value={username} onChange={(e)=>setusername(e.target.value)}/>
        <br/>
        <label>password : </label>
        <input type='text' placeholder='password' value={password} onChange={(e)=> setpassword(e.target.value)} />
        <br/>
        <label>Phone number : </label>
        <input type='number' placeholder='mobile no' value={mobileno} onChange={(e)=> setmobileno(e.target.value)} />
        <br/>
        <button onClick={handlereg}> Registor </button>
        <button onClick={()=>navigate('/Login')}> Login </button>
    </div>
    )
};
export default Registor;