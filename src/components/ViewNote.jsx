import Button from "./Button.jsx"

export default function ViewNote( {viewModeOn, note, handlers} ) {

    if(!viewModeOn) {
        return null;
    }

    const [enterCreateMode, enterEditMode, deleteNote] = handlers;

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
                <Button type="button" handleClick={enterEditMode}>Edit Note</Button>
                <Button type="button" handleClick={deleteNote}>Delete Note</Button>
                <Button type="button" handleClick={enterCreateMode}>Create New Note</Button>
            </div>
        </div>
    );
}