import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/card'

function App() {
  let myObj = {
    username: "gargi",
    age: 21
  }

  return (
    <>
        <h1 className='bg-green-400 text-black p-4 rounded-xl mb-4'>Welcome to my first simple react project</h1>
        <Card username="welcome" btnText="click me"/>
        <Card username="Gargi" btnText="visit me"/>
    </>
  )
}

export default App
