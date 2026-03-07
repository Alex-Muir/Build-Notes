import Button from "./Button";
import Input from "./Input";

export default function NoteSection() {
    function handleClick() {
        alert("I've been pressed!");
  }

    return (
        <div>
            <h2>New Note</h2>
            <form>
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
                    <Button type="submit" buttonName="Submit" handleClick={handleClick}></Button>
                    <Button type="reset" buttonName="Reset" handleClick={handleClick}></Button>
                </div>
            </form>
        </div>
    )
}