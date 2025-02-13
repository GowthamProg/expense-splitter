import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import './Allstyles/Dashboard.css';
import Slidebar from "./Sidebar";
import { CgAdd } from "react-icons/cg";

const Dashboard =()=>{
    const [event,setevent]=useState('');
    const [fdate,setfdate]=useState("");
    const [tdate,settdate]=useState('');
    const [trips,settrips]=useState([]);
    const [friends,setfriends]=useState([]);
    const [memberlist,setmemberlist]=useState();
    const [hover,sethover]=useState(false);
    const [hover1,sethover1] =useState(false);
    const navigate = useNavigate();
    const username=localStorage.getItem('username');
    // const location=useLocation();
    // const username=location.state?.username;
    const handlelogout =()=>{
        localStorage.removeItem('token');
        navigate('/');
        alert('Loged out');
    }

      
    //fetch data from database
     useEffect(()=>{
       const fetchfriends =async () =>{
         if(!username) return;
         try{    //https://expense-splitter-ylwf.onrender.com/Members/${username}
           const response=await fetch(`http://localhost:5000/Members/${username}`);
           const data =await response.json();
           if(response.ok)
           {
             console.log(" friends contact updated successfully");
             setfriends(data.friends);
           }
           else alert("failed to fetch...");
         }catch(error){
             console.error("Error fetching",error);
         }
       };
       fetchfriends();
     },[]);

    //fetch data from database
    useEffect(
    ()=>{
        const fetchevents = async() =>{
            if(!username) return;
            try{
                const response =await fetch(`http://localhost:5000/Dashboard/${username}`);
                const data =await response.json();
                console.log({data});
                if(response.ok) settrips(data.trips)
                else alert("failed to fetch"); 
            }catch(error)
            {
                alert("Error fetching");
            }
        };
        fetchevents();
    },[username]);

    const handlesubmit = async(e)=>{
        e.preventDefault();
        console.log({username,event,fdate,tdate});
        const response= await fetch ("http://localhost:5000/Dashboard",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body :JSON.stringify({username,event,fdate,tdate})
        });
        if(response.ok){
            alert("resgister sucessfully");
        }
        else alert("Register failed");
    };

    return (
        <div>
            <Slidebar />
            <div className="content">
                <button className="Dashlogout" onClick={handlelogout}> Logout</button>
                <h2>Dashboard</h2>
                <span>Welcome , {username}!</span><br/>
                 <button className="dcreate" onClick={()=>sethover(!hover)}> add new event </button>
                 {hover && (
                    <div className="dform">
                        <form>
                            <label>Enter the trip name</label><br/>
                            <input type="text" placeholder="Trip name" onChange={(e)=>setevent(e.target.value)}></input><br/>
                            <label>Trip duration <br/>From </label><br/>
                            <input type="date" onChange={(e)=>setfdate(e.target.value)}></input><br/>
                            <label>To </label><br/>
                            <input type="date" onChange={(e)=>settdate(e.target.value)}></input><br/>
                            <div className="button0">
                                <button className="subbutton" onClick={handlesubmit} > Submit</button>
                                <button className="clbutton" onClick={()=>sethover(false)}> Close</button>
                            </div>
                        </form>
                    </div>
                  )}

                  <div className="dprecreate">
                    {trips.map((trip,index)=>(
                        <div key={index}>
                            <div className="dcreate">
                                {trip.event}<br/>{trip.fdate} : {trip.tdate}
                                <button className="cgadd" onClick={()=>{setmemberlist(index);sethover1(true)}}><CgAdd /> </button>     
                            </div>
                        </div>
                    ))}
                  </div>
                    
                  {hover1 && (
                    <div className="memlist">
                        <div className="memlist0" >
                            {friends.map((friend,index)=>(
                            <div className="memlist1">
                                {memberlist},{friend.frndname},hi
                                <input type="checkbox"/>
                            </div>
                        ))}
                            <div className="button1">
                             <button className="subbutton">Submit</button>
                             <button className="clbutton" onClick={()=>sethover1(false)}> Cancel</button>
                            </div>
                        </div>
                    </div>
                  )}


            </div>
        </div>
    );
};
export default Dashboard;