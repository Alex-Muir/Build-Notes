import Button from "./Button";
import Input from "./Input";
import type { Note } from "./types";

interface SearchSectionProps {
    listItems: Note[]
    handlers: [(value: string) => void, (note_id: string) => void, () => void]
    value: string
}

export default function SearchSection({ listItems, handlers, value } : SearchSectionProps) {

    const [handleSearch, handleNoteClick, clearSearch] = handlers;

    const listOfResults = listItems.map(item => 
        <li key={item.id} onClick={() => {handleNoteClick(item.id)}}>{item.title}</li>
    )

    return (
        <div className="SearchSection">
            <h2 className="SectionName">Search Notes</h2>
            <Input  
                label="Search (Separate by comma)" 
                type="search"  
                placeholder="query1, query2, query3"
                value={value}
                onChange={handleSearch}>
            </Input>
            <Button type="button" handleClick={clearSearch}>Clear</Button>
            <ul className="SearchResults">{listOfResults}</ul>
        </div>
    );
}