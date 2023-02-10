import './Aside.css'

import { Link } from 'react-router-dom'

export const Aside = () => {
  return (
    <aside className="Menu">
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/lotofacil'>Loto Fácil</Link></li>
          <li><Link to='/megasena'>Mega Sena</Link></li>
        </ul>
      </nav>
    </aside>
  )
}