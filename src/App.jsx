import { useState } from 'react'
import NoteSection from "./components/NoteSection.jsx"
import './App.css'

function App() {
  let currentNoteId = null;
  const notes = [];

  return (
    <>
      <h1 className='AppName'>Build Notes</h1>
      <NoteSection></NoteSection>
    </>
  )
}

export default App
