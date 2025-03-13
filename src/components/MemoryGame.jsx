import './MemoryGame.css'
import { useState, useEffect } from 'react'

const MemoryGame = ({ onScoreUpdate }) => {
  const [images, setImages] = useState([])
  const [clickedImages, setClickedImages] = useState([])

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/images.json')
        const data = await response.json()

        const duplicatedImages = [...data]
        const shuffledImages = shuffleArray(duplicatedImages)
        setImages(shuffledImages)
      } catch {}
    }
    fetchImages()
  }, [])

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5)
  }

  const handleImageClick = (imageId) => {
    if (clickedImages.includes(imageId)) {
      onScoreUpdate(0, true)
      setClickedImages([])
    } else {
      const newClickedImages = [...clickedImages, imageId]
      setClickedImages(newClickedImages)
      onScoreUpdate(newClickedImages.length, false)
    }
    setImages((prevImages) => shuffleArray([...prevImages]))
  }
  return (
    <div className='imageboard'>
      {images.map((image, index) => (
        <img
          key={index}
          src={image.url}
          alt={`Card ${image.id}`}
          onClick={() => handleImageClick(image.id)}
        />
      ))}
    </div>
  )
}

export default MemoryGame
