import type { Note } from "./types"

interface PreviousNoteSectionProps {
    listItems: Note[]
    handleClick: (value: string) => void
}

export default function PreviousNotesSection( {listItems, handleClick} : PreviousNoteSectionProps) {
    
    const listOfNotes: React.ReactNode[] = listItems.map(item => 
        <li key={item.id} onClick={() => {handleClick(item.id)}}>{item.title}</li>
    )

    return (
        <div className="PreviousNotesSection">
            <h2 className="SectionName">Previous Notes</h2>
            <ol className="PreviousNotesList">{listOfNotes}</ol>
        </div>
    )
}