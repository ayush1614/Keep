import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
export const NoteItem = (props) => {
    const { note, updateNote } = props;

    const context = useContext(noteContext);
    const { deleteNote } = context;

    return (
        <div className='col-md-3'>
            <div className="card my-3 " >
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="far fa-edit mx-2" onClick={() => { updateNote(note) }}></i>
                    </div>
                    <p className="card-text">{note.description} </p>
                    <i className="fa-solid fa-trash-can mx-2 " onClick={() => { deleteNote(note._id) }}></i>
                </div>
            </div>
        </div>
    )
}
