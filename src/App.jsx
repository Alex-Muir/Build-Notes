import { useState } from 'react'
import NoteSection from "./components/NoteSection.jsx"
import './App.css'

function App() {
  let currentNoteId = null;
  const notes = [];

  return (
    <>
      <NoteSection></NoteSection>
    </>
  )
}

export default App
