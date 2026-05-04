import Button from "./Button";

interface ClearStorageProps {
    handleClear: () => void
}

export default function ClearStorage({ handleClear } : ClearStorageProps) {
    return (
        <div className="ClearStorage">
            <h2 className="SectionName">Clear Local Storage</h2>
            <Button type="button" handleClick={handleClear}>Clear All Notes</Button>
        </div>
    );
}