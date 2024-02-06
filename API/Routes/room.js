const express=require('express');
const {createroom,updateRoom,deleteRoom,getroom,getrooms, updateRoomAvailability}  = require('../Controller/room.js');
const router=express.Router();
const {verifyToken, verifyUser, verifyAdmin} =require('../Utils/verification.js')

router.post("/:hotelid",createroom);
router.put("/:id",updateRoom);
router.put("/available/:id",updateRoomAvailability);
router.delete("/:id/:hotelid",verifyAdmin,deleteRoom);
router.get("/:id",getroom);
router.get("/",getrooms);

module.exports=router;