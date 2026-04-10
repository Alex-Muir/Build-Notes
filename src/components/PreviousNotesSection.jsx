export default function PreviousNotesSection( {listItems, handleClick}) {
    
    const listOfNotes = listItems.map(item => 
        <li key={item.id} onClick={() => {handleClick(item.id)}}>{item.title}</li>
    )

    return (
        <div className="PreviousNotesSection">
            <h2 className="SectionName">Previous Notes</h2>
            <ol>{listOfNotes}</ol>
        </div>
    )
}