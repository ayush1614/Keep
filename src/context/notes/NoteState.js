import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const initialNotes = [
        {
            "_id": "625b1bbdd86d86e65dcdc3383",
            "user": "62b0704621a358eb89a61d2d",
            "title": "My firsddst teitle ",
            "description": "helldddo world ",
            "tag": "casual",
            "date": "2022-06-21T12:38:53.904Z",
            "__v": 0
        },
        {
            "_id": "621b1bd4d779fab7e107b0af7",
            "user": "62b0704621a358eb89a61d2d",
            "title": "My first title ",
            "description": "hello world ",
            "tag": "casual",
            "date": "2022-06-21T12:45:01.311Z",
            "__v": 0
        },
        {
            "_id": "622b1bd4d779fab7e107b0af7",
            "user": "62b0704621a358eb89a61d2d",
            "title": "My first title ",
            "description": "hello world ",
            "tag": "casual",
            "date": "2022-06-21T12:45:01.311Z",
            "__v": 0
        },
        {
            "_id": "62b1bd64d779fab7e107b0af9",
            "user": "62b0704621a358eb89a61d2d",
            "title": "My first title ",
            "description": "hello world ",
            "tag": "casual",
            "date": "2022-06-21T12:45:01.457Z",
            "__v": 0
        },
        {
            "_id": "62b1ce17479da3464324cb235",
            "user": "62b0704621a358eb89a61d2d",
            "title": "My firsddst teitle ",
            "description": "helldddo world ",
            "tag": "casual",
            "date": "2022-06-21T13:56:36.718Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(initialNotes)

    // add note 
    const addNote = (title, description, tag) => {
        console.log("addign a new note");
        let note = {
            "_id": "62b1ce17479da3464324cb235",
            "user": "62b0704621a358eb89a61d2d",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-06-21T13:56:36.718Z",
            "__v": 0
        }
        setNotes(notes.concat(note));
    }

    // edit note 
    const editNote = (id) => {

    }

    //delete note 
    const deleteNote = () => {

    }
    return (
        // yh jo note hai yh notes ko saare state provide karegi  
        < NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote }} >
            {props.children} ;
        </ NoteContext.Provider >
    )
}

export default NoteState; 