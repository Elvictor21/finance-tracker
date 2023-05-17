
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../css/Account.css';


export default function RegisterPage () {
   const[username,setUsername]= useState("");
   const[password,setPassword]=useState("");
   const[redirect,setRedirect]=useState(false);

 async function register(ev){
      ev.preventDefault();
    //   console.log("start");

      const url='http://localhost:4040/register';
   const response=await fetch(url,{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({username,password}),
      });
      if( response.status ===200){
        alert("registration succesfull")
        setRedirect(true) 
      }else{
        alert("registration failed// username used")
      }
   }
    
     
if(redirect){
  return  <Navigate to={"/index"}/>
}

    return (  
        <main className='LoginMain'>
        <div className='LoginDiv'>
        <h1>Sign Up</h1>
        <form className="signin" onSubmit={register} >
      
       <input  type="text"
        placeholder="username"
        value={username}
        onChange={ev=>setUsername(ev.target.value)}
        />
       <input type="password"
        placeholder="password"
        value={password}
        onChange={ev=>setPassword(ev.target.value)}
        />
       <button>Sign Up</button>
       <h5>Already have an account <Link to="/login"> Sign In</Link></h5>

     </form> 
     </div>
     </main>
    );
}