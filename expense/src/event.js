import React, { useState } from "react";
import Sidebar from "./Sidebar"
import "./Allstyles/event.css"
import {useLocation } from "react-router-dom";

const Event = () =>{
    const location = useLocation();
    const trip = location.state?.trip || [];
    const index = location.state?.index;
    const [hover0,sethover0] = useState(false);
    const [amount,setamount]=useState("");

    const handleinputmoney =(e)=>{
        let value =e.target.value;
        value=value.replace(/[^0-9.]/g,"");
        if(/^\d*\.?\d{0,2}$/.test(value))   
        setamount(value);   
    }
    return(
        <>
            <Sidebar/>
            <div className="content">
                <div className="eaddbox" onClick={()=>sethover0(!hover0)}> Add detailed expense </div>
                {hover0 && (
                    <div className="eform">
                        <label>Event : </label> <input type="text" placeholder="Event" required ></input><br/>
                        <label>Amount : </label>
                        <input type="number" step="0.01" min={0} placeholder="Amount spent" onChange={handleinputmoney}/>
                        <button onClick={()=>{console.log(amount)}}>Click</button>
                    </div>
                )}
            </div>
        </>
    )
}


export default Event;
{/* {trip.event}.hii */}