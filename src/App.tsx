import { useState, useEffect } from 'react'
import './App.css'
import NoteSection from "./components/NoteSection.tsx"
import ViewNote from './components/ViewNote.tsx';
import EditNote from './components/EditNote.tsx';
import SearchSection from './components/SearchSection.tsx';
import PreviousNotesSection from './components/PreviousNotesSection.tsx';
import ClearStorage from './components/ClearStorage.tsx';
import type { Note, AppMode } from './components/types.ts';

function App() {

  // State for the notes array, which contains all user notes
  const [notes, setNotes] = useState<Note[]>(loadNotes);

  const [titleSet, setTitleSet] = useState<Set<string>>(getTitlesFromNotes);

  // State for the current note. Used for viewing and editing
  const [currentNote, setCurrentNote] = useState<Note| null>(null);

  // State for the current search query
  const [searchQuery, setSearchQuery] = useState("");

  // State for AppMode. Create Mode is the default
  const [mode, setMode] = useState<AppMode>("create");

  let searchTags = formatTags(searchQuery);
  const filteredNotes = filterNotesByQuery(searchTags);

  function filterNotesByQuery(searchTags: string[]): Note[]{
    const filteredNotesArray: Note[] = [];
    for (let i = 0; i < notes.length; i++) {
      for (let j = 0; j < searchTags.length; j++) {
        if (notes[i].tags.some(tag => tag.includes(searchTags[j]))) {
          filteredNotesArray.push(notes[i]);
          break;
        }
      }
    }
    return filteredNotesArray
  }
  
  // Effect to save the notes and view the updated note array in the console
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    console.log(notes);
  }, [notes]);

  // Effect to view the current note in the terminal after a change
  useEffect(() => {
    console.log("Current Note: ", currentNote)
  }, [currentNote]);

  useEffect(() => {
    console.log(titleSet);
  }, [titleSet]);

  // Get notes from local storage. If notes doesn't exist return an empty array
  function loadNotes() {
    console.log("Loading notes...")
    const storedNotes = localStorage.getItem("notes");

    if(!storedNotes) 
        return [];

    return JSON.parse(storedNotes);
  }

  function getTitlesFromNotes(): Set<string> {
     const titleSet: Set<string> = new Set();
     if (notes) {
      for (const note of notes) {
        titleSet.add(note.title);
      }
     }

     return titleSet
  }

  // Clear notes from local storage. Reset the notes array to an empty array
  function clearLocalStorage() {
    if(window.confirm("You are about to delete all data. Do you want to proceed?")) {
      localStorage.removeItem("notes");
      setNotes([]);
      setTitleSet(new Set());
      clearSearch();
      enterCreateMode();
    }
  }

  function addTitleToSet(title: string): void {
    setTitleSet(prev => new Set([...prev, title]));
  }

  function removeTitleFromSet(title: string): void {
    setTitleSet(prev => {
      const next = new Set(prev);
      next.delete(title);
      return next;
    });
  }

  function enterCreateMode() {
    setCurrentNote(null);
    setMode("create");
  }

  function enterViewMode() {
    setMode("view");
  }

  function enterEditMode() {
    setMode("edit");
  }

  // Handles the form submission of a note
  function handleNoteSubmit(formData: FormData) : void {
    let title = formData.get("title") as string;
    let content = formData.get("content") as string;
    const tags = formData.get("tags") as string;

    title = title.trim();
    content = content.trim();

    while(titleSet.has(title) && title !== currentNote?.title) {
      const input = prompt(
        "Title already exists. Please pick a different title.\nIf cancel is selected the current note will be erased.");
      if(input === null) {
        return;
      }
      title = input.trim();
    }
    
    let newNote: Note | null = null;
    let editedNote: Note | null = null;

    if(currentNote) {
      removeTitleFromSet(currentNote.title);
      editedNote = {
        id: currentNote.id,
        title: title,
        content: content,
        tags: formatTags(tags),
        createdAt: currentNote.createdAt,
        editedAt: getFormattedDate()
      };

      setCurrentNote(editedNote);
      addTitleToSet(title);
      enterViewMode();

      const updatedNotes: Note[] = notes.map( note => {
        if(note.id === currentNote.id) {
          return editedNote!;
        } else {
          return note;
        }
      });

      setNotes(updatedNotes);

    } else {
      newNote = {
        id: crypto.randomUUID(), 
        title: title, 
        content: content, 
        tags: formatTags(tags), 
        createdAt: getFormattedDate(), 
        editedAt: null
      };
      addTitleToSet(newNote.title);
      setNotes([...notes, newNote]);
    }
  }

  function handleSearch(rawQueryString: string) : void {
    setSearchQuery(rawQueryString);
  }

  // Separates tags, removes whitespace and empty strings, converts tags lower case. 
  function formatTags(tagString: string) : string[] {
    if(!tagString) 
      return []

    return tagString
        .split(",")
        .map(tag => tag.trim())
        .map(tag => tag.toLowerCase())
        .filter(tag => tag !== "");
}

  function handleNoteClick(note_id: string) : void {
    const note = notes.find((note) => note.id === note_id);
    if(note) {setCurrentNote(note);}
    enterViewMode();
  }

  function clearSearch() : void {
    setSearchQuery("");
  }

  function deleteNote() : void {
    if(window.confirm("Are you sure you want to delete this note?")){
      removeTitleFromSet(currentNote!.title);
      const newNotes: Note[] = notes.filter(note => note.id !== currentNote!.id);
      setNotes(newNotes);
      setCurrentNote(null);
      enterCreateMode();
    }
  }

  function getFormattedDate() : string {
    const d = new Date();
    const dateString = d.toDateString() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(); 
    return dateString;
  }

  return (
    <div className="App">
      <h1 className='AppName'>Build Notes</h1>
      <NoteSection 
        createModeOn={mode === "create"} 
        handleSubmit={handleNoteSubmit}>
      </NoteSection>
      <ViewNote 
        viewModeOn={mode === "view"} 
        note={currentNote!} 
        onCreate={enterCreateMode}
        onEdit={enterEditMode}
        onDelete={deleteNote}
        >
      </ViewNote>
      <EditNote 
        editModeOn={mode === "edit"} 
        note={currentNote!}
        cancelEditNote={enterViewMode}
        handleEditNote={handleNoteSubmit}>
      </EditNote>
      <SearchSection 
        listItems={filteredNotes} 
        value={searchQuery}
        handleNoteClick={handleNoteClick}
        handleSearch={handleSearch}
        handleClearSearch={clearSearch}>
      </SearchSection>
      <PreviousNotesSection 
        listItems={notes} 
        handleClick={handleNoteClick}>
      </PreviousNotesSection>
      <ClearStorage 
        handleClear={clearLocalStorage}>
      </ClearStorage>
    </div>
  )
}

export default App
