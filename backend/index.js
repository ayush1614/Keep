const connectToMongo = require('./db');
const express = require('express');

const app = express();
connectToMongo();

app.get('/', (request, response) => {
    response.send("Hellow world ");
});

//middleware ==> if we want to use request.body 
app.use(express.json()) ; // now we can send json and deal with it 

//available  Routes
app.use('/api/auth/createUser' , require('./routes/auth'))
// app.use('/api/notes' , require('./routes/notes'))

app.listen(5000, () =>{
    console.log("Listening on port 5000") ; 
})


