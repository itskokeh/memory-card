import './App.css'
import { useState } from 'react'
import Header from './components/Header'
import MemoryGame from './components/MemoryGame'

export default function App () {
  const [currentScore, setCurrentScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)

  const handleScoreUpdate = (score, isReset) => {
    if (isReset) {
      if (currentScore > bestScore) {
        setBestScore(currentScore)
      }
      setCurrentScore(0)
    } else {
      setCurrentScore(score)
    }
  }

  return (
    <div className='container'>
      <Header currentScore={currentScore} bestScore={bestScore} />
      <MemoryGame onScoreUpdate={handleScoreUpdate} />
    </div>
  )
}
