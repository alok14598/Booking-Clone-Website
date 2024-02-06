const express=require('express');
const {createHotel,updateHotel,deleteHotel,getHotel,getHotels,countByCity, countByType,gethotelrooms}=require('../Controller/hotel.js');
const {verifyToken, verifyUser, verifyAdmin} =require('../Utils/verification.js')
const router=express.Router();

router.post("/",verifyAdmin,createHotel);
router.put("/:id",verifyAdmin,updateHotel);
router.delete("/:id",verifyAdmin,deleteHotel);
router.get("/find/:id",getHotel);
router.get("/",getHotels);
router.get("/countByCity",countByCity);
router.get("/countByType",countByType);
router.get("/getrooms/:id",gethotelrooms);
module.exports=router;