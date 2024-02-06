const {RegisterUser,login}=require("../Controller/auth.js");
const express=require('express');
const router=express.Router();

router.post("/register",RegisterUser);
router.post("/login",login);

module.exports= router;