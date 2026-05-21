import Button from "./Button";
import Input from "./Input";
import type { Note } from "./types";

interface SearchSectionProps {
    listItems: Note[]
    value: string
    handleSearch: (rawQueryString: string) => void
    handleNoteClick: (note_id: string) => void
    handleClearSearch: () => void
}

export default function SearchSection({ listItems, value, handleSearch, handleNoteClick, handleClearSearch } : SearchSectionProps) {


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
            <Button type="button" handleClick={handleClearSearch}>Clear</Button>
            <ul className="SearchResults">{listOfResults}</ul>
        </div>
    );
}