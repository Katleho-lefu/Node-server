const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
require('dotenv').config();
const jwt = require("jsonwebtoken")

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

// Login
router.post("/login", async (req,res) => {

    try {
        const user = await User.findOne({email: req.body.email})
        !user && res.status(401).json("Wrong credentials!") //If user is not found
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_ENCRYPTION_KEY);
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
        OriginalPassword !== req.body.password //If passwords don't match
            && res.status(401).json("Wrong credentials!")
            const accessToken = jwt.sign( //else
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_KEY,
            {expiresIn:"2d"}
        )
            const { password, ...others} = user._doc;  //I don't understand what's happening here...
            res.status(200).json({...others, accessToken})
    }
    catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router