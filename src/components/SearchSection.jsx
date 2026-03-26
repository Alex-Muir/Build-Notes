import Button from "./Button";
import Input from "./Input";

export default function SearchSection() {
    return (
        <div className="SearchSection">
            <h2 className="SectionName">Search Notes</h2>
            <form className="SearchForm">
                <Input 
                    labelFor="search" 
                    label="Search (Separate by comma)" 
                    type="search" 
                    name="search" 
                    placeholder="query1, query2, query3" 
                    required>
                </Input>
                <Button type="button">Search</Button>
            </form>
        </div>
    );
}