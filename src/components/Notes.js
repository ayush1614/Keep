import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext'
import { AddNote } from './AddNote';
import { NoteItem } from './NoteItem';

export const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;

    let navigate = useNavigate();
    useEffect(() => {
        // if token is set then redirect to add notes page  else navigate to login page 
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else
            navigate('/login');
        // eslint-disable-next-line
    }, []);
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    const updateNote = (currNote) => {
        ref.current.click();
        setNote({ id: currNote._id, etitle: currNote.title, edescription: currNote.description, etag: currNote.tag });
    }

    const handleClick = (e) => {
        // console.log('updating the not ' + note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert('Updated Successfully', 'success');
    }

    const handleOnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote showAlert={props.showAlert} />
            {/* Button trigger modal  */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit Note</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {/* modal body */}
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="etitle">Title</label>
                                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={handleOnChange} aria-describedby="emailHelp" placeholder="Enter title" minLength={2} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="edescription">Description</label>
                                <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={handleOnChange} placeholder="Enter description" minLength={3} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="etag">Tag</label>
                                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handleOnChange} placeholder="Enter tag" />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 2 || note.edescription.length < 3} type="button" className="btn btn-primary" onClick={handleClick}>Save</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row my-3'>
                <h2> Your Notes</h2>
                <div className="container mx-1">
                    {notes.length === 0 && "Nothing to display!"}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />;
                })}
            </div>
        </>
    )
}
