const Hotel=require("../Models/hotel.js");
const Room=require("../Models/room.js");
const createHotel= async(req,res)=> {
  const newHotel= new Hotel(req.body);
  try{
    await newHotel.save();
    res.status(200).json("New Hotel Created");
  }catch(err){
    res.status(500).json(err);
  }
}

const updateHotel=async(req,res) =>{
    try{
       const updated= await Hotel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(updated);
    }catch(err){
        res.status(500).json(err);
    }
}

const deleteHotel=async(req,res)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel Deleted");
    }catch(err){
        res.status(500).json(err);
    }
}


const getHotel=async(req,res)=>{
    try{
      const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    }catch(err){
        res.status(500).json(err);
    }
}
const getHotels=async(req,res)=>{
    const {min, max, ...others}=req.query;
    try{
       const hotels= await Hotel.find({...others,cheapestPrice: {$gt:min | 1, $lt :max||999},}).limit(req.query.limit);
        res.status(200).json(hotels);
    }catch(err){
        res.status(500).json(err);
    }
}

const countByCity=async(req,res)=>{
    const cities=req.query.cities.split(",");
    try{
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city:city});
        }))
    
        res.status(200).json(list);
    }catch(err){
        res.status(500).json(err);
    }
}

const countByType=async(req,res)=>{
    
    try{
     const Hotelcount= await Hotel.countDocuments({type:"Hotel"});
     const Apartmentscount= await Hotel.countDocuments({type:"Apartments"});
     const Resortscount= await Hotel.countDocuments({type:"Resorts"});
     const Villascount= await Hotel.countDocuments({type:"Villas"});
     const Glamingcount= await Hotel.countDocuments({type:"Glaming"});
     
        res.status(200).json([{type:"Hotel",count:Hotelcount},
        {type:"Apartments",count:Apartmentscount},
        {type:"Resorts",count:Resortscount},{type:"Villas",count:Villascount},{type:"Glaming",count:Glamingcount},
    ]);
    }catch(err){
        res.status(500).json(err);
    }
}

const gethotelrooms= async(req,res,next) => {
  try{ 
    const id=await Hotel.findById(req.params.id);
    const list=await Promise.all(id.rooms.map((room) =>
 {       return Room.findById(room);}
        ))
    res.status(200).json(list)}
        catch(err) {
            res.status(500).json("Room not Found")
        }
}

module.exports = {createHotel,updateHotel,deleteHotel,getHotel,getHotels,countByCity, countByType ,gethotelrooms}