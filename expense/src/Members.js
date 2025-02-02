import React,{ useState } from 'react';
import Sidebar from './Sidebar';
import './Allstyles/Addmember.css';
 function Members (){
  const [appear,SetAppear] =useState(false);
  const [frndname,setFrndname] =useState('');
  const [frndnumber, setFrndnumber]=useState('');

  const handlepost = async (e) =>{
    e.preventDefault();
    const username = localStorage.getItem('username');
    console.log({username,frndname,frndnumber});
    const response =await fetch("http://localhost:5000/Members",{
      method:"POST",
      headers:{"content-Type" : "application/json"},
      body : JSON.stringify({username,frndname,frndnumber})
    });
    const data =response.json();
    if(response.ok)
    {
      alert("registor sucessfull");
    }
    else alert("registration failed");
  };

  return (  
    <>
        < Sidebar />
        <div className='content'>
            <h2>Manage friends</h2>
            <button className='createbox' onClick={()=>SetAppear(!appear)}> Add Number</button>
            { appear &&(
              <form className={`form ${appear ? 'active' : ''}`}>
                <label>Name :</label>
               <input type='text' placeholder='Name' onChange={(e)=>setFrndname(e.target.value)} required /><br/>
               <label>Phone Number :</label>
               <input type='number' placeholder='mobile no'  onChange={(e)=>setFrndnumber(e.target.value)} required/><br/>
               <div className='form-buttons'>
               <button className ="subbutton"onClick={handlepost}> Submit</button>
               <button className ="clbutton" onClick={()=>SetAppear(false)}> close</button>
               </div>
             </form>
            )     }
        </div>
    </>
  )
}

export default Members;