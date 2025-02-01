import React,{useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './Allstyles/Dashlogout.css';
import Slidebar from "./Sidebar";

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
            <Slidebar />
            <div className="content">
                <button className="Dashlogout" onClick={handlelogout}> Logout</button>
                <h2>Dashboard</h2>
                <span>Welcome ,. {username}!</span>
            </div>
        </div>
    );
};
export default Dashboard;