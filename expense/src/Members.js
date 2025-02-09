import React,{ useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './Allstyles/Addmember.css';
 function Members (){
  const [appear,SetAppear] =useState(false);
  const [editappear,SetEditappear] =useState(false);
  const [hover,setHover]=useState(false);
  const [editfrnd,setEditfrnd]=useState('');

  const [frndname,setFrndname] =useState('');
  const [frndnumber, setFrndnumber]=useState('');
  const [newfrndname,setNewfrndname]=useState('');
  const [newfrndnumber,setNewfrndnumber]=useState('');
  const [friends,setFriends] =useState([]);
  const username = localStorage.getItem('username');

//to remove the space at the last of the input. setter = setFrndname
const handleinputerror =(setter)=>(e) =>{
      const value=e.target.value.trimEnd();
      setter(value);
      
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
          setFriends(data.friends);
        }
        else alert("failed to fetch...");
      }catch(error){
          console.error("Error fetching",error);
      }
    };
    fetchfriends();
  },[username]);

//add new friends 
  const handlepost = async (e) =>{
    e.preventDefault();
    console.log({username,frndname,frndnumber}); // https://expense-splitter-ylwf.onrender.com/Members
    const response =await fetch("http://localhost:5000/Members",{
      method:"POST",
      headers:{"content-Type" : "application/json"},
      body : JSON.stringify({username,frndname,frndnumber})
    });
    if(response.ok)
    {
      alert("registor sucessfull");
      window.location.reload();
    }
    else alert("registration failed");
  };


//delete the friends
const handledeletefrnd = async(frndname) =>{
  console.log(frndname);    //https://expense-splitter-ylwf.onrender.com/Members/${username}/${frndname}
  const response =await fetch(`http://localhost:5000/Members/${username}/${frndname}`,{
  method:"DELETE" 
   });
const data =response.json();
if(response.ok)
      alert("Deleted sucessfully",data.message);
else alert("Failed to delete",data.message);
};

//Editing the friend
const handleEdit =(friends) =>{
    SetEditappear(true);
    console.log("Applied edit appear",editappear);
    setEditfrnd(friends);
    setNewfrndname(friends.frndname);
    setNewfrndnumber(friends.frndnumber);
};
const handleupdate =async(e) =>{
    e.preventDefault();  //    https://expense-splitter-ylwf.onrender.com/Members/${username}/${editfrnd}
    const response =await fetch(`http://localhost:5000/Members/${username}/${editfrnd.frndname}`,{
      method : "Put" ,
      headers : {"Content-Type" : "application/json"},
      body :JSON.stringify({updateFrndname:newfrndname,updateFrndNumber:newfrndnumber}),
    });
    if(response.ok){
      alert ("Freind updated sucessfully");
      setFriends(friends.map (friends => friends.frndname === editfrnd.frndname ? {frndname :newfrndname ,frndnumber: newfrndnumber} : friends ));
      setEditfrnd(null);
      }else alert("Failed to update");
      SetEditappear(false)
};



  return (  
    <>
        < Sidebar />
        <div className='content'>
            <h2>Manage friends</h2>
            <button className='createboxadd' onClick={()=>SetAppear(!appear)}> Add Number</button>
            { appear &&(
              <form className={`form ${appear ? 'active' : ''}`}>
                <label>Name :</label>
               <input type='text' placeholder='Name' value={frndname}  onChange={(e)=>handleinputerror(setFrndname)(e) } required /><br/>
               <label>Phone Number :</label>  
               <input type='number' placeholder='mobile no'  onChange={(e)=>setFrndnumber(e.target.value)} required/><br/>
               <div className='form-buttons'>
               <button className ="subbutton"onClick={handlepost}> Submit</button>
               <button className ="clbutton" onClick={()=>SetAppear(false)}> close</button>
               </div>
             </form>
            )}

            <div className='friends-container'>
                {friends.map((friend,index) => (
                  <div  key={index} onClick={()=>setHover(!hover)} className='createboxadd'>      {/* //onClick={()=>handlehover(friend.frndname) */}
                    {friend.frndname} <br/> {friend.frndnumber}<br/>
                        {hover &&  (<div className='hover'>
                            <button onClick={()=>handleEdit(friend)} className='edit-button'>Edit </button>
                            <button onClick={()=>handledeletefrnd(friend.frndname)} className='edit-button'>delete </button>
                        </div>)}
                  </div>
                ))}
            </div>
        {editappear && (
          <form className={`form ${editappear ? 'active' : ''}`}>
          <label> New Name :</label>
         <input type='text' placeholder=' new Name' onChange={(e)=>setNewfrndname(e.target.value)} required /><br/>
         <label>Phone Number :</label>
         <input type='number' placeholder='new mobile no'  onChange={(e)=>setNewfrndnumber(e.target.value)} required/><br/>
         <div className='form-buttons'>
         <button className ="subbutton"onClick={handleupdate}> Submit</button>
         <button className ="clbutton" onClick={()=>SetEditappear(false)}>cancel</button>
         </div>
       </form>
        )}
      </div>
    </>
  )
}

export default Members;