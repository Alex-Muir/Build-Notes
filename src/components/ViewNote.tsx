import Button from "./Button.jsx"
import type { Note } from "./types.js";

interface ViewNoteProps {
    viewModeOn: boolean
    note: Note
    onCreate: () => void
    onEdit: () => void
    onDelete: ()=> void
}

export default function ViewNote( {viewModeOn, note, onCreate, onEdit, onDelete} : ViewNoteProps ) {

    if(!viewModeOn) {
        return null;
    }

    //const [enterCreateMode, enterEditMode, deleteNote] = handlers;

    return (
        <div className="ViewNoteSection">
            <h2 className="SectionName">View Note</h2>
            <p>
                <strong>Title: </strong>
                <span>{note.title}</span>
            </p>
            <p>
                <strong>Date Created: </strong>
                <span>{note.createdAt}</span>
            </p>
            {
                note.editedAt && (
                    <p>
                        <strong>Last Edited: </strong>
                        <span>{note.editedAt}</span>
                    </p>
                )
            }
            <strong>Note Content:</strong>
            <p className="ViewNoteContent">{note.content}</p>
            <p>
                <strong>tags: </strong>
                <span>{note.tags.join(", ")}</span>
            </p>
            <div>
                <Button type="button" handleClick={onEdit}>Edit Note</Button>
                <Button type="button" handleClick={onDelete}>Delete Note</Button>
                <Button type="button" handleClick={onCreate}>Create New Note</Button>
            </div>
        </div>
    );
}