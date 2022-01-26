import React, { useState } from 'react';
import{useNavigate} from 'react-router-dom';
function Signup(){
     let navigate = useNavigate();
     let[crtname,setCrtname]=useState('');
    let[crtusername,setCrtusername]=useState('');
    let[crtpassword,setCrtpassword]=useState('');
     //---------------------------------------Login
     function handleLogin(){
          fetch("http://localhost:8000/users/createuser",{
               method:'POST',
               headers:{
                    "Content-Type":"application/json"
               },
               body:JSON.stringify({
                    name:crtname,
                    username:crtusername,
                    password:crtpassword
               })
          })
          .then(response=>response.json())
          .then((data)=>{
               console.log(data)
               setCrtname('')
               setCrtusername('')
               setCrtpassword('')
               navigate('/login')
          })
          .catch(err=>console.log(err))
     }
    return(
        <div className="signup">
             <h1>Signup </h1> <br/>
             <label>Enter name:</label><br/>
              <input type="text" name="crtname" value={crtname} onChange={(event)=>{
                   setCrtname(event.target.value)
              }}/> <br/> <br/>
              <label>Enter username:</label><br/>
              <input type="text" name="crtusername" value={crtusername} onChange={(event)=>{
                   setCrtusername(event.target.value)
              }}/> <br/> <br/>
              <label>Create password:</label> <br/>
              <input type="text" name="crtpassword" value={crtpassword} onChange={(event)=>{
                   setCrtpassword(event.target.value)
              }}/> <br/> <br/>
              <button onClick={()=>{
                   handleLogin()
              }} className='signup-btn'> SIGN UP</button>
        </div>
    )
}
export default Signup;