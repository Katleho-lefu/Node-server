const router = require("express").Router();
const User = require("../models/User");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken")

// Get all users
router.get("/", verifyTokenAndAdmin, async (req,res)=>{
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
        res.status(500).json(err);
    }
})

// Get One User
router.get("/find/:id", verifyTokenAndAdmin, async (req,res)=>{
    try {
      const user = await User.findById(req.params.id);
      const {password, ...others} = user._doc
      res.status(200).json(user);
    } catch (error) {
        res.status(500).json(err);
    }
})

//Update User
router.put("/:id", verifyTokenAndAuthorization, async(req,res)=>{
    if(req.body.password ){
        req.body.password= CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_ENCRYPTION_KEY).toString()  
    }
    try {
       const updatedUser = await User.findByIdAndUpdate(req.params.id, {
           $set: req.body
       }, {new: true})
       res.status(200).json(updatedUser)
    } 
    catch (error) {
       res.status(500).json(err);
    }
})

// Delete User
router.delete("/:id", verifyTokenAndAuthorization, async (req,res)=>{
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (error) {
        res.status(500).json(err);
    }
})

// Get Stats about Users
router.get("/stats", verifyTokenAndAdmin, async (req,res)=>{
    
})


module.exports = router