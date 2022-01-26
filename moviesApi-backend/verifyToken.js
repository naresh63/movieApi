const jwt = require('jsonwebtoken')
// custom middleware for token verification
function verifyToken(req,res,next){
    if(req.headers.authorization !==undefined){
        let token=req.headers.authorization.split(" ")[1];
         jwt.verify(token,"secretkey",(err,userCred)=>{
             if(err===null){
                  next();
             }else{
                 res.send({message:"invalid token"})
             }
         }) 
    }else{
        res.send({message:"please authenticate"})
    }
}
module.exports= verifyToken;
