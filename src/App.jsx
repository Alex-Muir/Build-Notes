import { useState, useEffect } from 'react'
import './App.css'
import NoteSection from "./components/NoteSection.jsx"
import SearchSection from './components/SearchSection.jsx';
import PreviousNotesSection from './components/PreviousNotesSection.jsx';
import ClearStorage from './components/ClearStorage.jsx';

function App() {

  // State for the notes array, which contains all user notes
  const [notes, setNotes] = useState(loadNotes());

  // State for the id of current note. Used for viewing and editing
  const [currentNote, setCurrentNote] = useState(null);

  // Effect to save the notes and view the updated note array in the console
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    console.log(notes);
  }, [notes]);

  // Get notes from local storage. If notes doesn't exist return an empty array
  function loadNotes() {
    console.log("Loading notes...")
    const storedNotes = localStorage.getItem("notes");

    if(!storedNotes) 
        return [];

    return JSON.parse(storedNotes);
  }

  // Clear notes from local storage. Reset the notes array to an empty array
  function clearLocalStorage() {
    if(window.confirm("You are about to delete all data. Do you want to proceed?")) {
      localStorage.removeItem("notes");
      setNotes([]);
    } else {
      return;
    }
    
  }

  // Handles the form submission of a note
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
      <ClearStorage handleClear={clearLocalStorage}></ClearStorage>
    </div>
  )
}

export default App
