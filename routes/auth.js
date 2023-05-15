const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
require('dotenv').config();

//Register
router.post("/register", async (req,res)=> {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_ENCRYPTION_KEY).toString()
    });

    try{
       const savedUser = await newUser.save();
       res.status(200).json(savedUser);
    }
    catch(err){
        res.status(500).json(err);
    }
})

//Login
// router.post("/login", async (req,res)=> {

//     const user = new User({
//         email: req.body.email,
//         password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_ENCRYPTION_KEY).toString()
//     });

//     try{
//        const savedUser = await newUser.save();
//        res.status(200).json(savedUser);
//     }
//     catch(err){
//         res.status(500).json(err);
//     }
// })

module.exports = router