import Button from "./Button";
import Input from "./Input";

export default function SearchSection({ listItems, handlers }) {

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
                onChange={(e) => handleSearch(e.target.value)}>
            </Input>
            <Button type="button" handleClick={clearSearch}>Clear</Button>
            <ul>{listOfResults}</ul>
        </div>
    );
}