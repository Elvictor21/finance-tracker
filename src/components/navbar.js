// import React from 'react'
import { useEffect, useContext} from "react";
import { UserContext } from "../userContext";


export default function Navbar(){
  const{setUserInfo}=useContext(UserContext);
  useEffect(()=> {
        const url='http://localhost:4040/profile';
        fetch(url,{
          credentials:'include'
        }).then(response=>{
          response.json().then(userInfo=>{
          setUserInfo(userInfo);
          });
        });
  },[]); 

  function logout(){
    const url='http://localhost:4040/logout';
    fetch(url,{
      method:'POST',
      credentials:"include"
    });
    setUserInfo(null);
  }
  
     return(
       <>

        {/* <h3>{username}, logout succesful</h3> */}
          
        <div className='leftbar'>
           
        <div className='logo'> <i class="fab fa-gg" /></div> 
        <h3><span>EL</span> SPACE-x</h3>
        
        <div className='navigate'>
         
           <a href=""> <i class="fab fa-gg" /> Money-Tracker</a>
           <a href=""> <i class="fas fa-tenge"/> Todo</a>
           <a onClick={logout}><i class='fa fa-sign-out'/> Logout</a>
            
        </div>
       </div>
       </>
     );
   }

