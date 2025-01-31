import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './Allstyles/Dashlogout.css';
const Dashboard =()=>{
    const location=useLocation();
    const navigate = useNavigate();
    const username=location.state?.username;
    const handlelogout =()=>{
        localStorage.removeItem('token');
        navigate('/');
        alert('Loged out');
    }


    
    return (
        <div>
            <button className="Dashlogout" onClick={handlelogout}> Logout</button>
            <h2>Dashboard</h2>
            <p>Welcome , {username}!</p>
        </div>
    );
};
export default Dashboard;