import Button from "./Button.jsx"

export default function ViewNote( {viewModeOn, note} ) {

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
            <p>{note.content}</p>
            <p>
                <strong>tags: </strong>
                <span>{note.tags}</span>
            </p>
            <div>
                <Button type="button">Edit Note</Button>
                <Button type="button">Delete Note</Button>
                <Button type="button">Create New Note</Button>
            </div>
        </div>
    );
}