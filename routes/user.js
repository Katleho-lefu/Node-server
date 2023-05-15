const router = require("express").Router();

router.post("/login", (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password)
})


module.exports = router