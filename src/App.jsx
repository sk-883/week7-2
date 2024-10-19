import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import react from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [dat, setDat] = useState([])
  useEffect(() => {
    async function call() {
      const response = await fetch('http://localhost:3000/signup/master/aezakmi',{
        // headers:{
        mode:'no-cors'
        // }
      })
      const data = response
      console.log(data)
    };
    call()
  }, [])

  return (
    <div>
      {dat}
    </div>
  )
}

export default App
