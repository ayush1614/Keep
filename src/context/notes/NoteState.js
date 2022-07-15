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
        const response = await fetch(`${host}/api/notes/addNote/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjZjM2YjNkNGFmZGYyYzM3NWViYmViIn0sImlhdCI6MTY1Nzc0NzEyM30.HOedlC5LBlO5MZVWud0DT8lIIzTslMTgyoSCUCn_p_M"
            },
            body: JSON.stringify({ title, description, tag })
        });
        let note = await response.json();
        setNotes(notes.concat(note));
    }

    // edit note 
    const editNote = async (id, title, description, tag) => {
        // fetch api  
        const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjZjM2YjNkNGFmZGYyYzM3NWViYmViIn0sImlhdCI6MTY1Nzc0NzEyM30.HOedlC5LBlO5MZVWud0DT8lIIzTslMTgyoSCUCn_p_M'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);
        // logic to edit 
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    //delete note 
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjZjM2YjNkNGFmZGYyYzM3NWViYmViIn0sImlhdCI6MTY1Nzc0NzEyM30.HOedlC5LBlO5MZVWud0DT8lIIzTslMTgyoSCUCn_p_M'
            },
        });
        const json = await response.json();  // it parses the json , that's why it is await 
        console.log(json);
        setNotes(json);
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