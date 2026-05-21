import Button from "./Button";
import Input from "./Input";
import type { Note } from "./types";

interface EditNoteProps {
    editModeOn: boolean
    note: Note
    cancelEditNote: () => void
    handleEditNote: (formData: FormData) => void
}

export default function EditNote( {editModeOn, note, cancelEditNote, handleEditNote} : EditNoteProps) {
    if(!editModeOn) {
        return null;
    }
 
    return (
        <div className="EditNoteSection">
            <h2 className="SectionName">{editModeOn && "Edit Note"}</h2>
            <form action={handleEditNote} className="NoteForm">
                <Input 
                    labelFor="title"
                    label="Title:" 
                    type="text" 
                    name="title" 
                    required
                    defaultValue={note.title}>
                </Input>
                <Input 
                    labelFor="content" 
                    label="Note Content:" 
                    name="content" 
                    multiline 
                    required
                    defaultValue={note.content}>
                </Input>
                <Input
                    labelFor="tags"
                    label="Tags (separate by comma)"
                    type="text"
                    name="tags"
                    placeholder="tag1,tag2,tag3"
                    defaultValue={note.tags.join(", ")}>
                </Input>
                <div>
                    <Button type="submit">Save Changes</Button>
                    <Button type="button" handleClick={cancelEditNote}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}