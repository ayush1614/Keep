const jwt = require('jsonwebtoken');
require('dotenv').config();

// middleware is a function , takes req, res and next and at end next is called 
const fetchuser = (req, res, next) => {

    //Get user from jwt Token and add id to req object 
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "please authenticate with valid token" })
    }
    try {

        // verify thee incoming token 
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "please authenticate with valid token" });
    }
}

module.exports = fetchuser; 