
import { Link, Navigate } from 'react-router-dom';
import { useState,useContext } from "react";
import '../css/Account.css';
import { UserContext } from '../userContext';


export default function LoginPage () {
    const[username,setUsername]= useState("");
    const[password,setPassword]= useState("");
    const[redirect,setRedirect]=  useState("");
    const{setUserInfo}=useContext(UserContext);
    async function login(ev){
        ev.preventDefault();

        const url='http://localhost:4040/login';
        
     const response=  await fetch(url,{
            method:"POST",
            headers:{'Content-type':'application/json'},
            body: JSON.stringify({username,password}),
            credentials:"include"
        });
      
        if(response.ok){
            response.json().then(userInfo=>{
                setUserInfo(userInfo);
                setRedirect(true);
            });
            
        }else{
            alert("wrong credentails")
        }
        
    }
    if(redirect){
        return <Navigate to={'/index'}></Navigate>
    }
    return (  
        <main className='LoginMain'>
        <div className='LoginDiv'>
        <h1>Sign In</h1>
        <form className="signin" onSubmit={login}>
      
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
       <button>Sign in</button>
       <h5>To Create Account <Link to='/'>Sign Up</Link> </h5>

     </form> 
     </div>
     </main>
    );
}

