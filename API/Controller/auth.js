const User =require("../Models/user.js");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const RegisterUser=async (req,res) => {
    const hash = bcrypt.hashSync(req.body.password, 10);
    try {
        const newUser= new User({
            username: req.body.username,
            password:hash,
            email:req.body.email,
            isAdmin:req.body.isAdmin
        })
        await newUser.save();
res.status(200).json("User Created");
    }catch(err){
        res.status(500).json(err);
    }

}

const  login = async(req,res,next) =>{
    const user=await User.findOne({username:req.body.username});
try{    if(!user){
        return next(createError(401,"User not found"));
    }
    const isPasswordCorrect=await bcrypt.compareSync(req.body.password, user.password);
    if(!isPasswordCorrect){
        return next(createError(402,"Incorrect Password"));

    }
    const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT);
    const {password,isAdmin,...otherDetails} =user._doc;

    res.cookie("access_token",token,{
        httpOnly:true
    }).status(200).json({...otherDetails});
}catch(err){
    res.status(500).json("Not Successful");
}
}

module.exports = {RegisterUser,login}