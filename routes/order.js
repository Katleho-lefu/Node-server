const router = require("express").Router();
const Order = require("../models/Order")
const {verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization} = require("./verifyToken")


// Create Order
router.post("/",verifyToken, async(req,res)=>{
    const newOrder = new Order(req.body);
    try {
      const order = await newOrder.save()
      res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json(error);
    }
})

// Get all Orders of all users
router.get("/", verifyTokenAndAdmin, async(req,res)=>{
    try {
        const orders = await Order.find();
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error);
    }
})

// Get User Orders coz there can be more than one Order for one user
router.get("/find/:userId", verifyTokenAndAuthorization, async (req,res)=>{
    try {
      const orders = await Order.find({userId: req.params.userId});
      res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(err);
    }
})

// Update Order
router.put("/:id", verifyTokenAndAdmin, async(req,res)=> {
    try {
       const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
           $set: req.body
       }, {new: true})
       res.status(200).json(updatedOrder)
    }
    catch (error) {
       res.status(500).json(err);
    }
})

// Delete Order
router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{ // User can delete their own cart
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Your Order has been deleted");
    } catch (error) {
        res.status(500).json(err);
    }
})

module.exports = router