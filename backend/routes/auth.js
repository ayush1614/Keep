// authentication related endpoints
require('dotenv').config() ; 
const express = require('express');
const router = express.Router();
const User = require('../models/User.js')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs') ; 
const jwt = require('jsonwebtoken') ; 


//CREATING the user using  : POST "/api/auth/createUser" , No authentication required
router.post('/', [
    body('name', 'name must be atleast 3 chars long').isLength({ min: 3 }),      // name length minimum is 3
    body('email', 'enter valid email').isEmail(),            //  must be valid email
    body('password', 'password should be of atleast 7 chars long ').isLength({ min: 7 }) // password must be at least 7 chars long
], async (req, res) => {

    // validation of incoming data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //for errors
    try {
        let user = await User.findOne({ email: req.body.email }); // it's a promise
        if (user) {
            return res.status(400).json({ error: "User already exits with this email" })
        }

        const salt = await bcrypt.genSalt(10) ; // returns promise  
        let encPassword = await bcrypt.hashSync(req.body.password , salt) ; 

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: encPassword,
        });

    } catch (error) {   // error catching code 
        console.log(error);
        res.status(500).send("Internal server error");
    }
    // console.log(process.env.JWT_TOKEN);
    let data = {
        user:{
            id:User.id
        }
    }
    const authToken = jwt.sign(data , process.env.JWT_SECRET) ;  
    res.json({authToken});
})

module.exports = router 