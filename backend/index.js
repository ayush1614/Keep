const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')

const app = express();
connectToMongo();

app.get('/', (request, response) => {
    response.send("Hellow world ");
});

app.use(cors());

//middleware ==> if we want to use request.body 
app.use(express.json()); // now we can send json and deal with it 


//available  Routes
app.use('/api/auth/', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(process.env.PORT || 5000, () => {
    // console.log(process.env.JWT_SECRET);
    console.log("Listening on port 5000");
})


