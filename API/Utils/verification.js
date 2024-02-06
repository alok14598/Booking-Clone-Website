const jwt=require('jsonwebtoken');
const  createError =require("../Utils/error.js");

const verifyToken= (req,res,next)=> {
    const token=req.cookies.access_token;
    console.log(token);
  
    if(!token){
        return next(createError(401,"you are not authonticated"));
    }
    jwt.verify(token,process.env.JWT,(err,user)=> {
 
        if(err){
            return next(createError(403,"token is not valid"));
        }
        req.user=user;
        console.log(req.user);
        next();
    });

}

const verifyUser= (req,res,next)=>{
    verifyToken(req,res,next,() => {
        console.log(user.id);
        if(req.user.id ===req.params.id || req.user.isAdmin){
            next();
        }
        else {
            return next(createError(403,"token is not valid"));
        }

    });
}

const verifyAdmin= (req,res,next)=>{
    verifyToken(req,res,() => {
        if(req.user.isAdmin){
            next();
        }
        else {
            return next(createError(403,"token is not valid"));
        }

    });
}

module.exports = {verifyToken, verifyUser, verifyAdmin};