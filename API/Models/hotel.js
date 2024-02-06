const mongoose=require('mongoose');

const HotelSchema= new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    type:{
        type: String,
        required:true
    },
    featured :{
        type:Boolean
    },
    city:{
        type: String,
        required:true
    },
    Address:{
        type: String,
        required:true
    },
    distance:{
        type: Number,
        required:true
    },
    photos:{
        type: [String],
        
    },
    title:{
        type: String,
        required:true
    },
    Desc:{
        type: String,
        required:true
    },
    rating:{
        type: Number,
        min:0,
        max:5
    },
    rooms:{
        type: [String],
     
    },
    cheapestPrice:{
        type: Number,
        required:true
    }
})

module.exports=mongoose.model("Hotel",HotelSchema);