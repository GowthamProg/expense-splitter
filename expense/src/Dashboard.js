import React from "react";
import { useLocation } from "react-router-dom";
const Dashboard =()=>{
    const location=useLocation();
    const username=location.state?.username;
    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome , {username}!</p>
        </div>
    );
};
export default Dashboard;