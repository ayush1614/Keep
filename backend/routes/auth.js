// authentication related endpoints
require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/User.js')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');

//CREATING the user using  : POST "/api/auth/createUser" , No authentication required
router.post('/createUser', [
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

        const salt = await bcrypt.genSalt(10); // returns promise  
        let encPassword = await bcrypt.hashSync(req.body.password, salt);

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
        user: {
            id: User.id
        }
    }
    const authToken = jwt.sign(data, process.env.JWT_SECRET); // signing the data 
    res.json({ authToken });
})

// AUTHENTICATE a user using :POST "api/auth/login" ,  login required
router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists()
], async (req, res) => {

    // validation of incoming data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "please try with correct credentials." });
        }
        let passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: 'please try with correct credentials' });
        }

        const payload = {
            user: {
                id: User.id
            }
        }

        const authToken = jwt.sign(payload, process.env.JWT_SECRET);
        res.json({ authToken });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }
})

// Gives Logged In User details : POST "" , login required
router.post('/getUser' , fetchuser, async (req, res) => {
    try {
        let userId = req.user.id;
        console.log(userId) ; 
        const user = await User.findById(userId).select('-password'); // getting all rhe fields except password
        // console.log(user) ; 
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router 