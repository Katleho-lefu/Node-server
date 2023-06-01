const router = require("express").Router();
const { json } = require("express");
const Cart = require("../models/Cart")
const {verifyTokenAndAdmin, verifyTokenAndAuthorization} = require("./verifyToken")


// Create Cart
router.post("/",verifyTokenAndAdmin, async(req,res)=>{
    const newCart = new Cart(req.body);
    try {
      const cart = await newCart.save()
      res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json(error);
    }
})

// Get all Carts of all users
router.get("/", verifyTokenAndAdmin, async(req,res)=>{
    try {
        const carts = await Cart.find();
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error);
    }
})

// Get User Cart
router.get("/find/:userId", async (req,res)=>{
    try {
      const cart = await Cart.findOne({userId: req.params.userId});
      res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(err);
    }
})

// Update Cart
router.put("/:id", verifyTokenAndAuthorization, async(req,res)=> {
    try {
       const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
           $set: req.body
       }, {new: true})
       res.status(200).json(updatedCart)
    }
    catch (error) {
       res.status(500).json(err);
    }
})

// Empty Cart
router.delete("/:id", verifyTokenAndAuthorization, async (req,res)=>{ // User can delete their own cart
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Your cart has been deleted");
    } catch (error) {
        res.status(500).json(err);
    }
})

module.exports = router