const express=require('express');

const router=express.Router();
const {verifyToken, verifyUser, verifyAdmin} =require('../Utils/verification.js')
const  {updateUser,deleteUser,getUser,getUsers} =require('../Controller/user.js');

router.put("/:id",verifyUser,updateUser);
router.delete("/:id",verifyUser,deleteUser);
router.get("/:id",verifyUser,getUser);
router.get("/",verifyAdmin,getUsers);

module.exports=router;