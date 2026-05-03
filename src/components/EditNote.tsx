import Button from "./Button";
import Input from "./Input";

export default function EditNote( {editModeOn, handlers, note} ) {
    if(!editModeOn) {
        return null;
    }

    const[handleEditNote, cancelEditNote] = handlers;    
    // !! Need to create an edit submit function !!
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
                    defaultValue={note.tags}>
                </Input>
                <div>
                    <Button type="submit">Save Changes</Button>
                    <Button type="button" handleClick={cancelEditNote}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}