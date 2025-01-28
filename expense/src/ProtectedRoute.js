import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'

const ProtectedRoute = ({children}) => {
      const navigate =useNavigate();
      const [isValid,setIsValid]=useState(null);
      
      useEffect(()=>{
      const validateToken = async () => {
        const token=localStorage.getItem('token');
        if(!token) {
          alert("Token not found");
          navigate("/Login");
          return;
         }

         try{
          const response =await fetch('http://localhost:5000/validate-token',{
            method : 'GET',
            headers : {Authorization:`Bearer ${token}`},
          });
            
          const data =await response.json();
          if(data.valid)
          {
              setIsValid(true);
          }
          else 
          {
            alert ('invalid token, redirect to login');
            localStorage.removeItem('token');
            navigate('/Login');
          }
         }
         catch(err)
         {
          console.error("Validation error",err);
          localStorage.removeItem('token');
          navigate('/Login');
         }
         //return <Navigate to='/Login'/>
        }
        validateToken();
    },[navigate]);

    if(isValid===null)
    {
      return <div> Loading.... </div>
    }
    return isValid? children :null;
};

export default ProtectedRoute;