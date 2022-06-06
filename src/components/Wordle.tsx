import { useState, useEffect } from "react";
import { useWindow } from "../hooks/usewindow";
import { getWordOfTheDay, isValidWord } from "../service/request";
import { KeyBoard } from "./KeyBoard";
import Modal from "./Modal";
import RowCompleted from "./RowCompleted";
import RowCurrent from "./RowCurrent";
import RowEmpty from "./RowEmpty";
import { GameStatus } from "./Types";
import styles from "./wordle.module.scss";

const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
];

const Wordle = () => {
  // Crear los estados para el juego
  const [wordOfTheDay, setWordOfTheDay] = useState<string>("");
  const [turn, setTurn] = useState<number>(1);
  const [currentWord, setCurretWord] = useState<string>("");
  const [completeWord, setCompleteWord] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Playing);
  // llamar el coostomHook

  useWindow("keydown", handleKeyDown);
  //Usar el useEffect
  useEffect(() => {
    setWordOfTheDay(getWordOfTheDay());
  }, []);

  function handleKeyDown(event: KeyboardEvent) {
    const key = event.key.toUpperCase();
    onKeyPressed(key);
  }

  function onKeyPressed(key: string) {
    if (gameStatus !== GameStatus.Playing) {
      return;
    }

    if (key === "BACKSPACE" && currentWord.length > 0) {
      onDelete();
      return;
    }
    if (key === "ENTER" && currentWord.length === 5 && turn <= 6) {
      onEnter();
      return;
    }
    if (currentWord.length >= 5) return;

    // Ingresar la letra al teclado
    if (keys.includes(key)) {
      onInput(key);
      return;
    }
  }

  function onInput(letter: string) {
    const newWord = currentWord + letter;
    setCurretWord(newWord);
  }

  function onDelete() {
    const newWord = currentWord.slice(0, -1);
    setCurretWord(newWord);
  }

  async function onEnter() {
    if (currentWord === wordOfTheDay) {
      // gano el usuario
      setCompleteWord([...completeWord, currentWord]);
      setGameStatus(GameStatus.Won);
      return;
    }

    if (turn === 6) {
      // Perdio el usuario
      setCompleteWord([...completeWord, currentWord]);
      setGameStatus(GameStatus.Lost);
      return;
    }

    // Validar si existe la palabra
    const validWord = await isValidWord(currentWord);
    if (currentWord.length === 5 && !validWord) {
      alert("Not a valid word");
      return;
    }

    setCompleteWord([...completeWord, currentWord]);
    setTurn(turn + 1);
    setCurretWord("");
  }
  return (
    <>
      {gameStatus === GameStatus.Won ? (
        <Modal
          type="Won"
          completedWords={completeWord}
          solution={wordOfTheDay}
        />
      ) : gameStatus === GameStatus.Lost ? (
        <Modal
          type="Lost"
          completedWords={completeWord}
          solution={wordOfTheDay}
        />
      ) : null}
      <div className={styles.mainContainer}>
        {completeWord.map((word, i) => (
          <RowCompleted key={i} word={word} solution={wordOfTheDay} />
        ))}

        {gameStatus === GameStatus.Playing ? (
          <RowCurrent word={currentWord} />
        ) : null}

        {Array.from(Array(6 - turn)).map((_, i) => (
          <RowEmpty key={i} />
        ))}
      </div>
      <KeyBoard keys={keys} onKeyPressed={onKeyPressed} />
    </>
  );
};

export default Wordle;
