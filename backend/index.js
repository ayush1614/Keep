const connectToMongo = require('./db');
const express = require('express');
const { response } = require('express');

const app = express();
connectToMongo();

app.get('/', (request, response) => {
    response.send("Hellow world ");
});

app.listen(3000, () =>{
    console.log("Listening on port 3000") ; 
})


