const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    user: {     // helps in identifying the diffrent user notes
        type: mongoose.Schema.Types.ObjectId, // works like a foreign key // user id stored
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('notes', notesSchema)