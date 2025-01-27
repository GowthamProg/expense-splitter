import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login';
import Registor from './Registor';
import './Allstyles/Homelogin.css';
import Gowtham from './Gowtham';
const Home = () =>{
    const navigate = useNavigate();
    const [logeduser,setlogeduser]=useState('NULL');

    return (
        <div >
            <Gowtham/>
            <button onClick={ () => navigate('/login')} className="Homelogin">Login</button>
            </div>
    )
};
export default Home;