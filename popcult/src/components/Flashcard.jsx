import React, { useState } from 'react';
import './Flashcard.css';
import cardData from '../data/CardData';

const FlashcardApp = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cards, setCards] = useState(cardData);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextClick = () => {
    const nextIndex = (currentCardIndex + 1) % cards.length;
    setCurrentCardIndex(nextIndex);
    setIsFlipped(false);
    setIsCorrect(null);
    setUserGuess('');
  };

  const handleBackClick = () => {
    const prevIndex = (currentCardIndex - 1 + cards.length) % cards.length;
    setCurrentCardIndex(prevIndex);
    setIsFlipped(false);
    setIsCorrect(null);
    setUserGuess('');
  };

  const handleInputChange = (e) => {
    setUserGuess(e.target.value);
  };

  const handleSubmit = () => {
    setIsCorrect(userGuess.toLowerCase() === cards[currentCardIndex].answer.toLowerCase());
  };

  return (
    <div className="flashcard-app">
      <div className="card-set-info">
        <p>Total Cards: {cards.length}</p>
      </div>
      <div className="card-container">
        <div className={`card-inner ${isFlipped ? 'is-flipped' : ''}`} onClick={handleCardClick}>
          <div className="card-front">
            {cards[currentCardIndex].question}
          </div>
          <div className={`card-back ${isCorrect !== null ? (isCorrect ? 'correct' : 'incorrect') : ''}`}>
            {cards[currentCardIndex].answer}
          </div>
        </div>
      </div>
      <div className="controls">
        <button onClick={handleBackClick}>Back</button>
        <input type="text" value={userGuess} onChange={handleInputChange} placeholder="Your guess" />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleNextClick}>Next</button>
      </div>
      {isCorrect !== null && (
        <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? 'Correct!' : 'Incorrect!'}
        </div>
      )}
    </div>
  );
};

export default FlashcardApp;
