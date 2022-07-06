import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import { NoteItem } from './NoteItem';

export const Notes = () => {
    const context = useContext(noteContext);
    const { notes } = context;

    // add note 

    // edit note 

    //delete note 
    
    return (
        <div className='row my-3'>
            <h2> Your Notes</h2>
            {notes.map((note) => {
                return <NoteItem key={note._id} note={note} />;
            })}
        </div>
    )
}
