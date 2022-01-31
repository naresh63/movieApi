import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//
function Login(){
    let[username,setUsername]=useState('');
    let[password,setPassword]=useState('');
     // err msg
    let[errmodal,setErrmodal]=useState(false);// i am testing hide and show err div feature
    let[errmsg,setErrmsg]=useState('')
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
      .then((message1)=>{
        //console.log(message1)
         let{token,message}=message1;
         setErrmodal(true)
         setErrmsg(message);
         //console.log(token)
         if(token){
             localStorage.setItem("token",token)// saving token in localstorage
              //on success i want to save username to localstorage
             localStorage.setItem("username",loginobj.username)
         navigate('/home');
         setUsername('')
         setPassword('')
         }
        })
      .catch(err=>console.log(err))
  }
  //---------------------------------------------------------------------------------------------------------
    return(
        <div>
            <div>
          <div className="login">
            <h1>Login</h1> <br/>
            <label>Enter username</label> <br/>
            <input type="text" name="username" value={username} onChange={(event)=>setUsername(event.target.value)
             }  required/> <br/> <br/>
             <label>Enter password</label> <br/>
             <input type="password" name="password" value={password} onChange={(event)=>setPassword(event.target.value)
            }  required/> <br/> <br/>
            <button onClick={()=>{
                handleLogin()
            }} className='login-btn'>LOGIN </button> 
            <p>New user signup for free</p>
             <button onClick={()=>{
                 navigate('/signup')
             }} className='signup-btn'> SIGN UP </button>
          </div>
              <div className='errmsg'>{errmsg}</div>
          </div>     
        </div>
    )
}
export default Login;