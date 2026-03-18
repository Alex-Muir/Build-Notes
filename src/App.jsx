import { useState } from 'react'
import './App.css'
import NoteSection from "./components/NoteSection.jsx"
import SearchSection from './components/SearchSection.jsx';
import PreviousNotesSection from './components/PreviousNotesSection.jsx';
import ClearStorage from './components/ClearStorage.jsx';

function App() {
  let currentNoteId = null;
  const notes = [];

  return (
    <div className="App">
      <h1 className='AppName'>Build Notes</h1>
      <NoteSection></NoteSection>
      <SearchSection></SearchSection>
      <PreviousNotesSection></PreviousNotesSection>
      <ClearStorage></ClearStorage>
    </div>
  )
}

export default App
