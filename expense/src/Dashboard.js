import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './Allstyles/Dashboard.css';
import Slidebar from "./Sidebar";

const Dashboard =()=>{
    const navigate = useNavigate();
    const username=localStorage.getItem('username');
    // const location=useLocation();
    // const username=location.state?.username;
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
                <span>Welcome ,. {username}!</span><br/>
                 <button className="dcreate" > hello</button>
            </div>
        </div>
    );
};
export default Dashboard;