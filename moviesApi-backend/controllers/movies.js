const express = require('express');
const movieModel = require('../models/movie-schema-model');
const verifyToken=require('../verifyToken');
const router = express.Router();
//------------------------ fetch all movies--------------------------------------------
router.get("/",verifyToken,(req,res)=>{
     movieModel.find()
     .then(movies=>{
         res.send(movies)
     })
     .catch(err=>console.log(err))
})
//----------------- fetch movie by id---------------------------------
router.get("/:id",(req,res)=>{
    let id = req.params.id;
    movieModel.findOne({_id:id})
    .then((movie)=>{
        res.send(movie)
    })
    .catch(err=>console.log(err))
})
//------------------- create movie------------------------------------------
router.post("/createmovie",(req,res)=>{
    let movie = req.body;
    let movieObj= new movieModel(movie)
       movieObj.save()
       .then(()=>{
           res.send({message:"movie created successfully",movie})
       })
       .catch(err=>console.log(err))
})
//---------------- update movie------------------------------------------
router.put("/updatemovie/:id",(req,res)=>{
      let id = req.params.id;
      let dataUpdate =req.body;
      movieModel.updateOne({_id:id},dataUpdate)
      .then(()=>{
          res.send({message:"movie updated"})
      })
      .catch(err=>console.log(err))
})
//------------------delete movie ----------------------------------
router.delete("/deletemovie/:id",(req,res)=>{
    let id=req.params.id;
    movieModel.deleteOne({_id:id})
    .then(()=>{
        res.send({message:"movie deleted"})
    })
    .catch(err=>console.log(err))
})
module.exports=router;