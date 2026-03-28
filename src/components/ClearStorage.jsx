import Button from "./Button";

export default function ClearStorage({ handleClear }) {
    return (
        <div className="ClearStorage">
            <h2 className="SectionName">Clear Local Storage</h2>
            <Button type="button" handleClick={handleClear}>Clear All Notes</Button>
        </div>
    );
}