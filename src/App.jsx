import { useState, useEffect } from "react";
import { createPokemonImageArray, shuffleOrderArray } from "./script/utils";
import Header from "./components/Header";
import PlayingBoard from "./components/PlayingBoard";
import "./styles/styles.css";

function App() {
  const INITIAL_CARD_AMOUNT = 12;

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [imgArray, setImgArray] = useState([]);
  const [cardAmount, setCardAmount] = useState(INITIAL_CARD_AMOUNT);
  const [restart, setRestart] = useState(false);
  const [firstTimePlay, setFirstTimePlay] = useState(true);

  if (firstTimePlay) {
    setFirstTimePlay(false);
    setNewImgArray();
  }

  async function setNewImgArray() {
    const newImgArray = await createPokemonImageArray(cardAmount);
    setImgArray(newImgArray);
  }

  useEffect(() => {
    if (restart) {
      try {
        setNewImgArray();
        setRestart(false);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, [restart]);

  function handleRestart() {
    const newImgArray = imgArray.map((c) => {
      c.isClicked = false;
      return c;
    });
    setImgArray(newImgArray);
    setRestart(true);
    setScore(0);
  }

  function shuffleCards() {
    const newArray = [...imgArray];
    setImgArray(shuffleOrderArray(newArray));
  }

  function handleCardClick(card) {
    if (card.isClicked) {
      handleRestart();
    } else {
      setScore(score + 1);
      if (score + 1 > bestScore) {
        setBestScore(score + 1);
      }
    }

    const newImgArray = imgArray.map((c) => {
      if (c.id === card.id) {
        c.isClicked = true;
      }
      return c;
    });
    setImgArray(newImgArray);
    shuffleCards();
  }

  return (
    <div>
      <Header
        score={score}
        bestScore={bestScore}
        restartHandle={handleRestart}
      ></Header>
      <PlayingBoard
        imgArray={imgArray}
        handleCardClick={handleCardClick}
      ></PlayingBoard>
    </div>
  );
}

export default App;
