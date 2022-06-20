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

        // creating a new user 
        user = await User.create({
            name: req.body.name,
            password: encPassword,
            email: req.body.email,
        });

        let data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET); // signing the data 
        res.json({ authToken });

    } catch (error) {   // error catching code 
        console.log(error);
        res.status(500).send("Internal server error");
    }
    // console.log(process.env.JWT_TOKEN);

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

    //de structuring of data 
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        // check whether this email exists or not 
        if (!user) {
            return res.status(400).json({ error: "please try with correct credentials." });
        }

        // password compare 
        let passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: 'please try with correct credentials' });
        }

        let data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET); // signing the data 
        res.json({ authToken });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }
})

// Gives Logged In User details : POST "" , login required
router.post('/getUser', fetchuser, async (req, res) => {
    try {
        let userId = req.user.id; // id of that object
        const user = await User.findById(userId).select('-password'); // getting all rhe fields except password
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router 