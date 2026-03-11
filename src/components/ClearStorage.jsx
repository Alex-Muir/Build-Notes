import Button from "./Button";

export default function ClearStorage() {
    return (
        <div className="ClearStorage">
            <h2 className="SectionName">Clear Local Storage</h2>
            <Button type="button" buttonName="Clear All Notes"></Button>
        </div>
    );
}