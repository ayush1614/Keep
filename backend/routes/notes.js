// notes related endpoints
const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// fetches user notes from notes database : GET: /api/notes/fetchNotes 
router.get('/fetchNotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})


// adding the new notes : POST : '/api/notes/addNotes' LOGIN Required
router.post('/addNote', fetchuser, [
    body('title', 'title should be 2 characters long').isLength({ min: 3 }),
    body('description', 'description should be atleast 5 chars long').isLength({ min: 5 })
], async (req, res) => {

    //If there are errors , return Bad Request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // for errors
    try {
        // destructuring
        const { title, description, tag } = req.body;

        const note = new Notes({
            title, description, tag, user: req.user.id
        });
        const saveNote = await note.save();
        res.json(saveNote);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})



module.exports = router 