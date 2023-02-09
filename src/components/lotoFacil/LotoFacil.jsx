import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

export function LotoFacil() {
  const [numbers, setNumbers] = useState([])
  const [limit, setLimit] = useState(15)
  const [errorMessage, setErrorMessage] = useState('')
  const [previousNumbers, setPreviousNumbers] = useState([])
  const [allLotoGames, setAllLotoGames] = useState([])
  const [cookies, setCookie] = useCookies(['allGames'])

  useEffect(() => {
    if (cookies.allLotoGames) {
      setAllLotoGames(cookies.allLotoGames)
    }
  }, [])

  useEffect(() => {
    setCookie('allLotoGames', allLotoGames, { path: '/' })
  }, [allLotoGames])

  function generateNumbers() {
    if (limit < 15 || limit > 20) {
      setErrorMessage('Por favor, digite entre 15 á 20 números')
      return
    }

    const allNumbers = Array.from({ length: 25 }, (_, i) => i + 1)
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
    setAllLotoGames([...allLotoGames, sorted])
    setErrorMessage('')
  }

  function deleteGame(index) {
    const updatedGames = allLotoGames.filter((_, i) => i !== index)
    setAllLotoGames(updatedGames)
  }

  return (
    <div>
      <h2> Números da Loto Fácil</h2>
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
        {allLotoGames.map((game, index) => (
          <li key={index}>
            {game.join(', ')}{' '}
            <button onClick={() => deleteGame(index)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
