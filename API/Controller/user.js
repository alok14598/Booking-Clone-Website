const User=require("../Models/user.js");



const updateUser=async(req,res) =>{
    try{
       const updated= await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(updated);
    }catch(err){
        res.status(500).json(err);
    }
}

const deleteUser=async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User Deleted");
    }catch(err){
        res.status(500).json(err);
    }
}


const getUser=async(req,res)=>{
    try{
      const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
}
const getUsers=async(req,res)=>{
    try{
       const users= await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err);
    }
}
module.exports = {updateUser,deleteUser,getUser,getUsers}