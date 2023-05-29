const router = require("express").Router();
const Product = require("../models/Product");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken")

// Create Product
router.post("/",verifyTokenAndAdmin, async(req,res)=>{
    const newProduct = new Product(req.body);

    try {
      const product = await newProduct.save()
      res.status(200).json(product); 
    } 
    catch (error) {
        res.status(500).json(error);
    }
})



// Get all products
router.get("/", verifyTokenAndAdmin, async (req,res)=>{
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
        res.status(500).json(err);
    }
})

// Get One Product
router.get("/find/:id", verifyTokenAndAdmin, async (req,res)=>{
    try {
      const user = await User.findById(req.params.id);
      const {password, ...others} = user._doc
      res.status(200).json(user);
    } catch (error) {
        res.status(500).json(err);
    }
})

//Update Product
router.put("/:id", verifyTokenAndAdmin, async(req,res)=> {
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

// Delete Product
router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (error) {
        res.status(500).json(err);
    }
})

// Get Stats about Products
router.get("/stats", verifyTokenAndAdmin, async (req,res)=>{
    
})



module.exports = router