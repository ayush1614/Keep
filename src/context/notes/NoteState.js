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
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();  // it parses the json , that's why it is await 
        setNotes(json);
    }

    // add note 
    const addNote = async (title, description, tag) => {
        //fetch api  
        const response = await fetch(`${host}/api/notes/addNote/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
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
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
         //eslint-disable-next-line
        const json = await response.json();
        // logic to edit 
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
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
                'auth-token': localStorage.getItem('token')
            },
        });
        //eslint-disable-next-line
        const json = await response.json();  // it parses the json , that's why it is await 
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