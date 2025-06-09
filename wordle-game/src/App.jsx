import { useState, useEffect } from "react";
import WordleGrid from "./WordleGrid";
import Keyboard from "./Keyboard"; // ✅ Import the Keyboard component
import "./App.css";

export default function App() {
  const WORDS = ["REACT", "STACK", "PLANE", "BRICK", "MOUSE", "SHEET", "CLOUD"];
  const getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

  const [solution, setSolution] = useState(getRandomWord());
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [turn, setTurn] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      handleKeyPress(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, guesses, gameOver, solution]);

  const handleKeyPress = (key) => {
    if (gameOver) return;

    const upperKey = key.toUpperCase();

    if (/^[A-Z]$/.test(upperKey) && currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + upperKey);
    } else if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (key === "Enter") {
      if (currentGuess.length === 5) {
        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);
        setTurn((prev) => prev + 1);

        if (currentGuess === solution) {
          setMessage("🎉 You guessed the word!");
          setGameOver(true);
        } else if (newGuesses.length === 6) {
          setMessage(`❌ Game over! The word was "${solution}".`);
          setGameOver(true);
        }

        setCurrentGuess("");
      }
    }
  };

  const handleRetry = () => {
    setSolution(getRandomWord());
    setGuesses([]);
    setCurrentGuess("");
    setTurn(0);
    setGameOver(false);
    setMessage("");
  };

  return (
    <div className="app">
      <h1>Wordle-game</h1>
      <WordleGrid
        guesses={guesses}
        currentGuess={currentGuess}
        solution={solution}
        turn={turn}
      />
      {message && <p style={{ marginTop: "20px", fontSize: "18px" }}>{message}</p>}
      {gameOver && (
        <button onClick={handleRetry} style={{ marginTop: "10px", padding: "8px 16px" }}>
          Retry
        </button>
      )}
      <Keyboard onKeyClick={handleKeyPress} /> {/* ✅ Working on-screen keyboard */}
    </div>
  );
}
