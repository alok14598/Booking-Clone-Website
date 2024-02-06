const Room=require('../Models/room.js')
const Hotel=require("../Models/hotel.js");

const createroom = async (req, res) =>{
    const hotelId=req.params.hotelid;
    const newRoom=new Room(req.body);
    try{
       const savedroom= await newRoom.save();
        try{
await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:savedroom._id}});
res.status(200).json("Room Created"); 
        }catch(err){
            res.status(500).json("not inserted"); 
        }
        
    }catch(err){
        res.status(500).json("not Created");
    }
}



const updateRoom=async(req,res) =>{
    try{
       const updated= await Room.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(updated);
    }catch(err){
        res.status(500).json(err);
    }
}

const updateRoomAvailability = async (req, res, next) => {
    try {
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            'roomNumbers.$.unavailableDates': req.body.date
          },
        }
      );
      console.log(req.params.id);
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
  };

const deleteRoom=async(req,res)=>{
    const hotelId=req.params.hotelid;
    try{
        await Room.findByIdAndDelete(req.params.id);
        try{
            await Hotel.findByIdAndUpdate(hotelId,{$pull:{rooms:req.params.id}});
                    }catch(err){
                        res.status(500).json("not inserted"); 
                    }
                    
        res.status(200).json("room Deleted");
    }catch(err){
        res.status(500).json(err);
    }
}


const getroom=async(req,res)=>{
    try{
      const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    }catch(err){
        res.status(500).json(err);
    }
}
const getrooms=async(req,res)=>{
    try{
       const rooms= await Room.find();
        res.status(200).json(rooms);
    }catch(err){
        res.status(500).json(err);
    }
}
module.exports = {createroom,updateRoom,deleteRoom,getroom,getrooms, updateRoomAvailability}