import Button from "./Button.jsx"
import type { Note } from "./types.js";

interface ViewNoteProps {
    viewModeOn: boolean
    note: Note
    onCreate: () => void
    onEdit: () => void
    onDelete: ()=> void
}

function formatDateForDisplay(isoString: string): string {
    return new Intl.DateTimeFormat("en-US", {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    }).format(new Date(isoString));
}

export default function ViewNote( {viewModeOn, note, onCreate, onEdit, onDelete} : ViewNoteProps ) {

    if(!viewModeOn) {
        return null;
    }


    return (
        <div className="ViewNoteSection">
            <h2 className="SectionName">View Note</h2>
            <p>
                <strong>Title: </strong>
                <span>{note.title}</span>
            </p>
            <p>
                <strong>Date Created: </strong>
                <span>{formatDateForDisplay(note.createdAt)}</span>
            </p>
            {
                note.editedAt && (
                    <p>
                        <strong>Last Edited: </strong>
                        <span>{formatDateForDisplay(note.editedAt)}</span>
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