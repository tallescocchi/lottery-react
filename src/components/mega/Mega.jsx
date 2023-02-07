import React, { useState, useEffect } from 'react'
import { useCookies } from "react-cookie";

export function Mega() {
  const [numbers, setNumbers] = useState([])
  const [limit, setLimit] = useState(6)
  const [errorMessage, setErrorMessage] = useState('')
  const [previousNumbers, setPreviousNumbers] = useState([])
  const [allGames, setAllGames] = useState([])
  const [cookies, setCookie] = useCookies(["allGames"]);

  useEffect(() => {
    if (cookies.allGames) {
      setAllGames(cookies.allGames);
    }
  }, []);

  useEffect(() => {
    setCookie("allGames", allGames, { path: "/" });
  }, [allGames]);

  function generateNumbers() {
    if (limit < 6 || limit > 15) {
      setErrorMessage('Por favor, digite entre 6 á 15 números')
      return
    }

    const allNumbers = Array.from({ length: 60 }, (_, i) => i + 1)
    let shuffled = allNumbers.filter(num => !previousNumbers.includes(num))

    if (shuffled.length < limit) {
      shuffled = allNumbers
      setPreviousNumbers([])
    }

    const sorted = shuffled
      .sort(() => Math.random() - 0.5)
      .slice(0, limit)
      .sort((a, b) => a - b)
    setNumbers(sorted)
    setPreviousNumbers(sorted)
    setAllGames([...allGames, sorted])
    setErrorMessage('')
  }

  function deleteGame(index) {
    const updatedGames = allGames.filter((_, i) => i !== index)
    setAllGames(updatedGames)
  }

  return (
    <div>
      <h2> Números da Mega Sena</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <p>
        <label htmlFor="limit">Números: </label>
        <input
          id="limit"
          type="number"
          value={limit}
          onChange={e => setLimit(e.target.value)}
        />
      </p>
      <p>{numbers.join(', ')}</p>
      <button onClick={generateNumbers}>Gerar os números</button>
      <h3>Todos os jogos</h3>
      <ul>
        {allGames.map((game, index) => (
          <li key={index}>
            {game.join(', ')}{' '}
            <button onClick={() => deleteGame(index)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
