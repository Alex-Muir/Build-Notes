import { useState, useEffect } from 'react'
import './App.css'
import NoteSection from "./components/NoteSection.jsx"
import SearchSection from './components/SearchSection.jsx';
import PreviousNotesSection from './components/PreviousNotesSection.jsx';
import ClearStorage from './components/ClearStorage.jsx';

function App() {
  // State for the notes array, which contains all user notes
  const [notes, setNotes] = useState([]);

  // State for the id of current note. Used for viewing and editing
  const [currentNote, setCurrentNote] = useState(null);

  // Effect to view changes to notes
  useEffect(() => {
            console.log(notes);
          }, [notes]);

  // Hnadles the formn submission of a note
  function handleNoteSubmit(formData) {
          const title = formData.get("title");
          const content = formData.get("content");
          const tags = formData.get("tags");
  
          const note = {
              id: Date.now().toString(), 
              title: title, 
              content: content, 
              tags: tags, 
              createdAt: new Date().toString(), 
              editiedAt: null
          };
  
          setNotes([...notes, note]);
      }

  return (
    <div className="App">
      <h1 className='AppName'>Build Notes</h1>
      <NoteSection handleSubmit={handleNoteSubmit}></NoteSection>
      <SearchSection></SearchSection>
      <PreviousNotesSection></PreviousNotesSection>
      <ClearStorage></ClearStorage>
    </div>
  )
}

export default App
