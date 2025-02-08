import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './Allstyles/Dashboard.css';
import Slidebar from "./Sidebar";

const Dashboard =()=>{
    const [event,setevent]=useState('');
    const [fdate,setfdate]=useState("");
    const [tdate,settdate]=useState('');
    const [hover,sethover]=useState(false);
    const navigate = useNavigate();
    const username=localStorage.getItem('username');
    // const location=useLocation();
    // const username=location.state?.username;
    const handlelogout =()=>{
        localStorage.removeItem('token');
        navigate('/');
        alert('Loged out');
    }

    const handlesubmit =()=>{

    }

    return (
        <div>
            <Slidebar />
            <div className="content">
                <button className="Dashlogout" onClick={handlelogout}> Logout</button>
                <h2>Dashboard</h2>
                <span>Welcome , {username}!</span><br/>
                 <button className="dcreate" onClick={()=>sethover(!hover)}> Cick here to add new event </button>
                 {hover && (
                    <div className="dform">
                        <form>
                            <label>Enter the trip name</label><br/>
                            <input type="text" placeholder="Trip name" ></input><br/>
                            <label>Trip duration <br/>From </label><br/>
                            <input type="date"></input><br/>
                            <label>To </label><br/>
                            <input type="date"></input><br/>
                            <div className="dbutton">
                                <button className="subbutton" onClick={()=>handlesubmit} > Submit</button>
                                <button className="clbutton" onClick={()=>sethover(false)}> Close</button>
                            </div>
                        </form>
                    </div>
                  )}
            </div>
        </div>
    );
};
export default Dashboard;