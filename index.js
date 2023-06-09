const express = require("express");
const app = express();
const mongoose = require("mongoose")
const port = 3000

const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")
const productRouter = require("./routes/product")
const cartRouter = require("./routes/cart")
const orderRouter = require("./routes/order")
const paymentRouter = require("./routes/stripe")

// Connection to the DB
mongoose.connect("mongodb+srv://Katleholefu18:Password123@cluster0.or6txt5.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected to MongoDB Successfully")
})
.catch((error)=>{
    console.log(error)
})

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/payments", paymentRouter);



//Give app port to run on
app.listen(port, ()=> {
    console.log(`Backend server is running on port ${port}`);
})
