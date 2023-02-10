import './Content.css'

import { Route, Routes } from 'react-router-dom'

import { Home } from '../../pages/Home'

import { LotoFacil } from '../lotoFacil/LotoFacil'
import { MegaSena } from '../megaSena/MegaSena'

export const Content = () => {
  return (
    <main className="Content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/megasena" element={<MegaSena />} />
        <Route path="/lotofacil" element={<LotoFacil />} />
      </Routes>
    </main>
  )
}
