const express = require('express');
const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    moviename:{type:String,required:true},
    genre:{type:String,required:true}
})
//
const movieModel = new mongoose.model("movies",movieSchema)
module.exports= movieModel;