import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//
function Login(){
    let[username,setUsername]=useState('');
    let[password,setPassword]=useState('');

    let navigate = useNavigate(); 
  //
  function handleLogin(){
      let loginobj={
          username:username,
          password:password
      }
     /* console.log(loginobj) */
      fetch(`http://localhost:8000/users/login`,{
          method:'POST',
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(loginobj)
      })
      .then((response)=>response.json())
      .then((message)=>{
              // console.log(message)
                let{token}=message;
                //console.log(token)
                localStorage.setItem("token",token)// saving token in localstorage
                setUsername('')
                setPassword('')
                navigate('/home');
                //on success i want to save username to localstorage
                localStorage.setItem("username",loginobj.username)
      })
      .catch(err=>console.log(err))
  }
  //---------------------------------------------------------------------------------------------------------
    return(
        <>
          <div className="login">
            <h1>Login</h1> <br/>
            <label>Enter username</label> <br/>
            <input type="text" name="username" value={username} onChange={(event)=>setUsername(event.target.value)
             }  required/> <br/> <br/>
             <label>Enter password</label> <br/>
             <input type="text" name="password" value={password} onChange={(event)=>setPassword(event.target.value)
            }  required/> <br/> <br/>
            <button onClick={()=>{
                handleLogin()
            }} className='login-btn'>LOGIN </button>
            <p>New user signup for free</p>
             <button onClick={()=>{
                 navigate('/signup')
             }} className='signup-btn'> SIGN UP </button>
          </div>
        
        </>
    )
}
export default Login;