import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { url } from './backendurl';

const ProtectedRoute = ({children}) => {
      const navigate =useNavigate();
      const [isValid,setIsValid]=useState(null);
      
      useEffect(()=>{
      const validateToken = async () => {
        const token=localStorage.getItem('token');
        if(!token) {
          alert("Token not found");
          navigate("/");
          return;
         }

         try{     //http://localhost:5000/validate-token
          const response =await fetch(`${url}/validate-token`,{
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
            navigate('/');
          }
         }
         catch(err)
         {
          console.error("Validation error",err);
          localStorage.removeItem('token');
          navigate('/');
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