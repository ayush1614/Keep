import React from 'react'
import noteContext from '../context/notes/noteContext'
import { useState, useContext } from 'react'

export const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });  // after adding note , fields should be empty
    }

    const handleOnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="container my-3">
            <h2>Add Note</h2>
            <form className='my-3'>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={handleOnChange} aria-describedby="emailHelp" placeholder="Enter title" minLength={2} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleOnChange} placeholder="Enter tag" minLength={3} required />
                </div>
                <div className="form-group">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleOnChange} placeholder="Enter description" />
                </div>

                <button disabled={note.title.length < 2 || note.description.length < 3} type="submit" className="btn btn-primary my-3" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}
