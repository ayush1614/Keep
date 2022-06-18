// authentication related endpoints
const express = require('express') ; 
const router  = express.Router() ; 
const User = require('../models/User.js')

//CREATING the user using  : POST "/api/auth/" , doesn't require authentication
router.post('/' , (req , res)=>{
    console.log(req.body);
    let newUser  = User(req.body) ; 
    newUser.save() ; 
    res.send(req.body) ; 
})

module.exports = router 