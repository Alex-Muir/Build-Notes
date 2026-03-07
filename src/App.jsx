import { useState } from 'react'
import Button from './components/Button'
import './App.css'

function App() {
  function handleClick() {
    alert("I've been pressed!");
  }

  return (
    <>
      <Button type={"button"} label={"test"} handleClick={handleClick}></Button>
    </>
  )
}

export default App
