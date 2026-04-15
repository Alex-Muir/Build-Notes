import { useState, useEffect } from 'react'
import './App.css'
import NoteSection from "./components/NoteSection.jsx"
import ViewNote from './components/ViewNote.jsx';
import EditNote from './components/EditNote.jsx';
import SearchSection from './components/SearchSection.jsx';
import PreviousNotesSection from './components/PreviousNotesSection.jsx';
import ClearStorage from './components/ClearStorage.jsx';

function App() {

  // State for the notes array, which contains all user notes
  const [notes, setNotes] = useState(loadNotes);

  // State for the current note. Used for viewing and editing
  const [currentNote, setCurrentNote] = useState(null);

  // State for each model. Create Mode is the default
  const [createMode, setCreateMode] = useState(true);
  const [viewMode, setViewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Effect to save the notes and view the updated note array in the console
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    console.log(notes);
  }, [notes]);

  // Effect to view the current note in the terminal after a change
  useEffect(() => {
    console.log("Current Note: ", currentNote)
  }, [currentNote]);

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
      enterCreateMode();
    }
  }

  function enterCreateMode() {
    setCurrentNote(null);
    setCreateMode(true);
    setViewMode(false);
    setEditMode(false);
  }

  function enterViewMode() {
    setCreateMode(false);
    setEditMode(false);
    setViewMode(true);
  }

  function enterEditMode() {
    setCreateMode(false);
    setViewMode(false);
    setEditMode(true);
  }

  // Handles the form submission of a note
  function handleNoteSubmit(formData) {
    const title = formData.get("title");
    const content = formData.get("content");
    const tags = formData.get("tags");
    
    let newNote = null;
    let editedNote = null;

    if(currentNote) {
      editedNote = {
        id: currentNote.id,
        title: title,
        content: content,
        tags: tags,
        createdAt: currentNote.createdAt,
        editedAt: new Date().toString()
      };

      setCurrentNote(editedNote);
      enterViewMode();
      const updatedNotes = notes.map( note => {
        if(note.id === currentNote.id) {
          return editedNote;
        } else {
          return note;
        }
      });
      setNotes(updatedNotes);
    } else {
      newNote = {
        id: Date.now().toString(), 
        title: title, 
        content: content, 
        tags: formatTags(tags), 
        createdAt: new Date().toString(), 
        editedAt: null
      };
      setNotes([...notes, newNote]);
    }
  }

  // Separates tags, removes whitespace and empty strings, converts tags lower case. 
  function formatTags(tagString) {
    if(!tagString) 
      return []

    return tagString
        .split(",")
        .map(tag => tag.trim())
        .map(tag => tag.toLowerCase())
        .filter(tag => tag !== "");
}

  function handleNoteClick(note_id) {
    const note = notes.find((note) => note.id === note_id);
    if(note) {setCurrentNote(note);}
    enterViewMode();
  }

  function deleteNote() {
    console.log("In deleteNotes");
    const newNotes = notes.filter(note => note.id !== currentNote.id);
    setNotes(newNotes);
    setCurrentNote(null);
    enterCreateMode();
  }

  return (
    <div className="App">
      <h1 className='AppName'>Build Notes</h1>
      <NoteSection createModeOn={createMode} handleSubmit={handleNoteSubmit}></NoteSection>
      <ViewNote viewModeOn={viewMode} note={currentNote} handlers={[enterCreateMode, enterEditMode, deleteNote]}></ViewNote>
      <EditNote editModeOn={editMode} handlers={[handleNoteSubmit, enterViewMode]} note={currentNote}></EditNote>
      <SearchSection></SearchSection>
      <PreviousNotesSection listItems={notes} handleClick={handleNoteClick}></PreviousNotesSection>
      <ClearStorage handleClear={clearLocalStorage}></ClearStorage>
    </div>
  )
}

export default App
