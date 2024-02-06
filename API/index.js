const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cookieparser=require('cookie-parser')
const app=express();
const cors = require("cors");
const Hotel=require("./Routes/hotel.js");
const Auth=require("./Routes/auth.js");
const User = require("./Routes/user.js");
const Room = require("./Routes/room.js");
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieparser());
const connect = async()=> {
try {

await mongoose.connect(process.env.MONGO);
console.log("Connected to Database");
}catch(err){
    console.log("Not Connected");
}
}

app.get("/",(req,res) => {
    res.setHeader("Access-Control-Allow-Credentials","true");
    res.send("Welcome to the api page");
})


app.get("/",(req,res)=> {
    res.send("Welcome to Booking App");
})

app.use("/hotel",Hotel);
app.use("/auth",Auth);
app.use("/user",User);
app.use("/room",Room);
app.listen(9000,()=>{
    connect();
    console.log("Server started at port 9000");
})