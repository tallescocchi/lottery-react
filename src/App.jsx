import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'

import { Content } from './components/layout/Content'
import { Aside } from './components/layout/Aside'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Aside />
          <Content />
      </BrowserRouter>
    </div>
  )
}

export default App
