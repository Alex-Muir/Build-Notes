import Button from "./Button";
import Input from "./Input";

export default function NoteSection({ handleSubmit }) {

    return (
        <div className="NoteSection">
            <h2 className="SectionName">New Note</h2>
            <form action={handleSubmit} className="NoteForm">
                <Input 
                    labelFor="title"
                    label="Title:" 
                    type="text" 
                    name="title" 
                    required>
                </Input>
                <Input 
                    labelFor="content" 
                    label="Note Content:" 
                    name="content" 
                    multiline 
                    required>
                </Input>
                <Input
                    labelFor="tags"
                    label="Tags (separate by comma)"
                    type="text"
                    name="tags"
                    placeholder="tag1,tag2,tag3">
                </Input>
                <div>
                    <Button type="submit">Submit</Button>
                    <Button type="reset" /*handleClick={handleClick}*/>Reset</Button>
                </div>
            </form>
        </div>
    )
}