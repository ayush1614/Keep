import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const initialNotes = []  // updated using fetch api initially

    const [notes, setNotes] = useState(initialNotes);

    // Get all notes 
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchNotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjZjM2YjNkNGFmZGYyYzM3NWViYmViIn0sImlhdCI6MTY1Nzc0NzEyM30.HOedlC5LBlO5MZVWud0DT8lIIzTslMTgyoSCUCn_p_M'
            },
        });
        const json = await response.json();  // it parses the json , that's why it is await 
        console.log(json);
        setNotes(json);
    }


    // add note 
    const addNote = async (title, description, tag) => {
        //fetch api  
        // const response = await fetch(`${host}/api/notes/addNote/`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjZjM2YjNkNGFmZGYyYzM3NWViYmViIn0sImlhdCI6MTY1Nzc0NzEyM30.HOedlC5LBlO5MZVWud0DT8lIIzTslMTgyoSCUCn_p_M"
        //     },
        //     body: JSON.stringify({ title, description, tag })
        // });
        // const json = response.json();


        console.log("adding a new note");
        let note = {
            "_id": "62cf36e7d4afdf2c375ebbf3",
            "user": "62cf36b3d4afdf2c375ebbeb",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-06-21T13:56:36.718Z",
            "__v": 0
        }
        setNotes(notes.concat(note));
    }

    // edit note 
    const editNote = async (id, title, description, tag) => {
        //fetch api  
        // const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjZjM2YjNkNGFmZGYyYzM3NWViYmViIn0sImlhdCI6MTY1Nzc0NzEyM30.HOedlC5LBlO5MZVWud0DT8lIIzTslMTgyoSCUCn_p_M'
        //     },
        //     body: JSON.stringify({ title, description, tag })
        // });
        // const json = response.json();

        // logic to edit 
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }

    //delete note 
    const deleteNote = (id) => {
        console.log("delete note " + id);
        let newNotes = notes.filter((notes) => { return notes._id !== id });
        setNotes(newNotes);
    }
    return (
        // yh jo note hai yh notes ko saare state provide karegi  
        < NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, getNotes }} >
            {props.children} ;
        </ NoteContext.Provider >
    )
}

export default NoteState; 