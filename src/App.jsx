import { useState } from 'react'
import NoteSection from "./components/NoteSection.jsx"
import './App.css'
import SearchSection from './components/SearchSection.jsx';

function App() {
  let currentNoteId = null;
  const notes = [];

  return (
    <>
      <h1 className='AppName'>Build Notes</h1>
      <NoteSection></NoteSection>
      <SearchSection></SearchSection>
    </>
  )
}

export default App
