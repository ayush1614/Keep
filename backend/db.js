const mongoose = require('mongoose');

const mongodbURI = 'mongodb://localhost:27017/?directConnection=true';

const connectToMongo = () => {
    mongoose.connect(mongodbURI, () => {
        console.log('Connected to mongo successfully');
    })
}

module.exports = connectToMongo; 