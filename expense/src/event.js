import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar"
import "./Allstyles/event.css"
import {url} from "./backendurl"
import {useLocation } from "react-router-dom";

const Event = () =>{
    const location = useLocation();
    const trip = location.state?.trip || [];
    //const selfrnds =location.state?.selfriends || [];
    const index = location.state?.index;
    console.log(index + "hii");

    const [selfrnds,setselfrnds]=useState([]);
    const [hover,sethover] = useState(false);
    const username= localStorage.getItem('username');
    const [eventdatabase,seteventdatabase] = useState([]);
    const [event,setevent] = useState("");
    const [hover0,sethover0] = useState(false);
    const [flip,setflip]= useState(false);
    const [selectedfriends,setselectedfriends] = useState([]);
    const [amount,setamount]=useState("");

    const handleinputmoney =(e)=>{
        let value =parseFloat(e.target.value);
        value=value.toFixed(2)
        setamount(value);   
    }

    const handleselectfriend =(friend) =>{
        if(!selectedfriends.includes(friend))
        {
            setselectedfriends([...selectedfriends,friend]);
        }
    }

    //fetch selected frnds from the data base
    
    const fetchselectedfrnds = async (index)=>{
        try{
            const response =await fetch(`${url}/Dashboard/${username}/${index}`);
            const data= await response.json();
            if(response.ok){
                setselfrnds(data.friendlist);
                console.log("hii",{selfrnds});
            }
            else alert("error seletecd frnds");
        }catch(error){
            alert("eeror sel frnds");
        }
    }
    useEffect(()=>{fetchselectedfrnds(index);},[])
        


    // to submit the forms
    const handllesubmit = async() =>{
        console.log(amount,selectedfriends,event,username);
        const response = await fetch(`${url}/Event`,{
            method : "POST",
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({username,event,amount,selectedfriends}),
        })
        if(response.ok) alert("Submitted");
        else alert("Error Submission");
    };

    //TO shows the details of the forms details that are submitted
    useEffect(
        ()=>{
            const fetchfrnds =async ()=>{
                if(!username) return;
                try{
                    const response=await fetch(`${url}/fetch/${username}`);
                    const data = await response.json();
                    console.log({data});
                    if(response.ok) seteventdatabase(data.event);
                    else alert("failed to fetch");
                }catch(error){
                    alert("Error Fetching");
                }
            };fetchfrnds();
        },[username]);

const handleEdit = (data)=>{
    console.log(data);
}

//const username = localStorage.getItem(username)
const handledeletefrnd = async(index) =>{
  const response =await fetch(`${url}/Event/${username}/${index}`,{
  method:"DELETE" 
   });
const data =response.json();
if(response.ok)
      alert("Deleted sucessfully",data.message);
else alert("Failed to delete",data.message);
};

    return(
        <>
            <Sidebar/>
            <div className="content">
                <div className="eaddbox" onClick={()=>sethover0(!hover0)}> Add detailed expense </div>
                <div className="dprecreate">
                    {eventdatabase.map((event,index)=>(
                        <div key={index}>
                            <div className="dcreate" onClick={()=>sethover(hover===index?null:index)}>
                                {event.eventname} - {event.amount} <br/> {event.friends?.join("  ")}
                                {hover===index &&  (
                                    <div className='hover'>
                                        <button onClick={()=>handleEdit(index)} className='edit-button'>Edit </button>
                                        <button onClick={()=>handledeletefrnd(index)} className='edit-button'>delete </button>
                                    </div>  
                                 )}
                            </div>
                        </div>
                    ))}
                </div>
                {hover0 && (
                    <div className="flip-container">
                      <div className={`card ${flip ? "fliped":""}`}>
                      <div className="card-front">
                        <form onSubmit={(e)=>e.preventDefault()}>   {/*front side*/}
                            <p>Event  </p> 
                            <input type="text" placeholder="Event" onChange={(e)=>setevent(e.target.value)}/><br/>
                            <p>Amount </p>
                            <input type="number" step="0.01" min={0} placeholder="Amount spent" onChange={handleinputmoney} />
                            
                            <h3> Selected Friends</h3>
                            {selectedfriends.length > 0 ? (
                                <div className="selected-friends">
                                   {selectedfriends.map((friend,index)=>(
                                       <span key={index} className="selected-friend">
                                           {friend}
                                       </span>
                                   ))}
                                </div>
                            ):(
                                <p>No friends Selected</p>
                            )}
                           
                            <button className="button1" type="button" onClick={()=>{setflip(true)}}>Add person</button>
                            <div className="button0">
                                <button className="subbutton" onClick={()=>{handllesubmit()}}> Submit</button>
                                <button className="clbutton" onClick={()=>{sethover0(false);setselectedfriends([]);}}>Cancel</button>
                            </div>
                        </form>
                        </div>
                        <div className="card-back">
                            <h3>Select friend</h3>
                         {selfrnds.map((friend,index)=>( // to show selected friends
                           <button key={index} className="friend-btn" onClick={()=>handleselectfriend(friend)}>
                            {friend}
                           </button>
                            ))}
                            <button className="clbutton" onClick={()=>setflip(false)}>Go Back</button>
                      </div>
                    </div>
                    </div>
                )}

                
            </div>
        </>
    )
}


export default Event;
