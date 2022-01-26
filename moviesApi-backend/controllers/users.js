const bcryptjs = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const  userModel = require('../models/user-schema-model');
const verifyToken=require('../verifyToken');
const router = express.Router();
//------------------------ fetch all  users--------------------------------------------
router.get("/",(req,res)=>{
      userModel.find()
     .then( users=>{
         res.send( users)
     })
     .catch(err=>console.log(err))
})
//----------------- fetch  user by id---------------------------------
router.get("/:id",(req,res)=>{
    let id = req.params.id;
     userModel.findOne({_id:id})
    .then((user)=>{
        res.send(user)
    })
    .catch(err=>console.log(err))
})
//------------------- create  user------------------------------------------
router.post("/createuser",(req,res)=>{
    let user=req.body;
    // bcryptjs
    bcryptjs.genSalt(10,(err,salt)=>{
        if(err===null){
            bcryptjs.hash(user.password,salt,(err,newpassword)=>{
                user.password=newpassword;
                //obj created from model
                let userObj=new userModel(user)
                    userObj.save()
                    .then((data)=>{
                        res.send({message:"regi. successful",data:data})
                    })
                    .catch(err=>console.log(err))
            })
        }
    })
})
//----------------------------------------login  -------------------------------
router.post("/login",(req,res)=>{  // login create jwt token too
     let userCred= req.body;
     userModel.findOne({username:userCred.username})
     .then((user)=>{
         if(user !==null){
             bcryptjs.compare(userCred.password,user.password,(err,status)=>{
                 if(status===true){
                         jwt.sign(userCred,"secretkey",(err,token)=>{
                             if(err===null){
                                 res.send({message:"welcome user",token:token});
                             }
                         })
                 }else{
                     res.send({message:"password not match"})
                 }
             })

         }else{
             res.send({message:"user not found"})
            }   
     })
     .catch(err=>console.log(err)) 
})
// ------------------ logout-------------------------------------------
router.get("/logout",(req,res)=>{
    res.send({message:"logout successful"})
}) 
//---------------- update  user------------------------------------------
router.put("/updateuser/:id",(req,res)=>{
      let id = req.params.id;
      let dataUpdate =req.body;
       userModel.updateOne({_id:id,dataUpdate})
      .then(()=>{
          res.send({message:"user updated"})
      })
      .catch(err=>console.log(err))
})
//------------------delete  user ----------------------------------
router.delete("/deleteuser/:id",(req,res)=>{
    let id=req.params.id;
     userModel.deleteOne({_id:id})
    .then(()=>{
        res.send({message:"user deleted"})
    })
    .catch(err=>console.log(err))
})
module.exports=router;