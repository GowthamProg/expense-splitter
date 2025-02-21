import React, { useState } from "react";
import Sidebar from "./Sidebar"
import "./Allstyles/event.css"
import {useLocation } from "react-router-dom";

const Event = () =>{
    const location = useLocation();
    const trip = location.state?.trip || [];
    const selfrnds =location.state?.selfriends || [];
    const index = location.state?.index;
    const [hover0,sethover0] = useState(false);
    const [hover1,sethover1] = useState(false);
    const [amount,setamount]=useState("");

    const handleinputmoney =(e)=>{
        let value =parseFloat(e.target.value);
        value=value.toFixed(2)
        setamount(value);   
    }
    return(
        <>
            <Sidebar/>
            <div className="content">
                <div className="eaddbox" onClick={()=>sethover0(!hover0)}> Add detailed expense </div>
                {/* <p>{selectedfrnds [0]}</p> */}
                {hover0 && (
                    <div className="eform">
                        <form onSubmit={(e)=>e.preventDefault()}>
                            <p>Event  </p> <input type="text" placeholder="Event" /><br/>
                            <p>Amount </p>
                            <input type="number" step="0.01" min={0} placeholder="Amount spent" onChange={handleinputmoney} />
                            <button className="button1" onClick={()=>{sethover1(true)}}>Add person</button>
                            <div className="button0">
                                <button className="subbutton" onClick={()=>{console.log(amount)}}> Submit</button>
                                <button className="clbutton" onClick={()=>sethover0(false)}>Cancel</button>
                            </div>
                        </form>
                    {hover1 && selfrnds.map((friend,index)=>( // to show selected friends
                           <div>
                            {friend}
                           </div>
                            ))}
                    </div>
                )}

                
            </div>
        </>
    )
}


export default Event;
{/* {trip.event}.hii */}