import React, { useState } from "react";
import { BrowserRouter as Router,Route,Routes,Link,useNavigate } from "react-router-dom";
import './Allstyles/Registor.css';
const Registor =()=>{
    const [username,setusername]=useState('');
    const [password,setpassword]=useState(null);
    const [mobileno,setmobileno]=useState(null);

    const handlereg =async(e)=>{
        e.preventDefault();
        console.log("Registor with : ",{username,password,mobileno}); // http://localhost:5000/Registor
        const response = await fetch('https://expense-splitter-ylwf.onrender.com/Registor',{
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
        <div className="home-login">
        <div className="Registor ">
            <form>
        <h2>REGISTOR</h2>
        <label>Username : </label>
        <input type='text' placeholder='Username' className="inbox" value={username} onChange={(e)=>setusername(e.target.value)} required/>
        <br/>
        <label>password : </label>
        <input type='text' placeholder='password' className="inbox" value={password} onChange={(e)=> setpassword(e.target.value)} required/>
        <br/>
        <label>Phone number : </label>
        <input type='number' placeholder='mobile no' className="inbox" value={mobileno} onChange={(e)=> setmobileno(e.target.value)} required/>
        <br/>
        <button type="submit" onClick={handlereg} className="button"> Registor </button>
        <br/>
        <p>------Back to login -------</p>
        <button onClick={()=>navigate('/')} className="login"> Login </button>
        </form>
    </div>
    </div>
    )
};
export default Registor;