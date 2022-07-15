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
    body('title', 'title should be 2 characters long').isLength({ min: 2 }),
    body('description', 'description should be atleast 5 chars long').isLength({ min: 3 })
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
});

// Update an existing node if it exists :  PUT : /api/notes/updateNote' , LogIn Required
router.put('/updateNote/:id', fetchuser, async (req, res) => {

    const {title , description , tag} = req.body ; 

    //create a new note object 
    const newNote ={} ; 

    //updating details if it exists 
    if(title){
        newNote.title = title
    }
    if(description){
        newNote.description = description
    }
    if(tag){
        newNote.tag = tag
    } 
     
    // find the note to be updated and update it
    let note = await Notes.findById(req.params.id) ; 
    if(!note){
        return res.status(404).send("Not found") ; 
    } 

    // checks whether the user is authenticated or not 
    if(req.user.id!==note.user.toString()){
        return res.status(401).send("Not allowed ") ; 
    }

    // updation of note 
    note  = await Notes.findByIdAndUpdate(req.params.id , {$set:newNote} , {new:true})
    res.json({note}) ; 
})


//Deleting the existing node : DELETE : /api/notes/deleteNote ,  LogIn required
router.delete('/deleteNote/:id' , fetchuser , async (req,res)=>{

    //find the note to delete
    let note  = await Notes.findById(req.params.id) ; 

    //check if that note exists or not 
    if(!note){
        return res.status(404).send("Not found") ; 
    }

    // checks this is valid user or not 
    if(req.user.id!==note.user.toString()){
        return res.status(401).send("Not Allowed") ; 
    }

    // deleting node 
    note = await Notes.findByIdAndDelete(req.params.id)
    res.send({"Success":"Node has been deleted" , note:note}) ; 
})

module.exports = router 