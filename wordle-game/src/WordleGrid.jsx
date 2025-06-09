import React from "react";

export default function WordleGrid({ guesses, currentGuess, solution, turn }) {
  const rows = Array.from({ length: 6 }, (_, i) => {
    const guess = i < guesses.length ? guesses[i] : i === turn ? currentGuess : "";
    return (
      <div className="wordle-row" key={i}>
        {Array.from({ length: 5 }, (_, j) => {
          const letter = guess[j] || "";
          let bgColor = "";

          if (i < guesses.length && guess.length === 5) {
            if (letter === solution[j]) {
              bgColor = "green";
            } else if (solution.includes(letter)) {
              bgColor = "goldenrod";
            } else {
              bgColor = "#444";
            }
          }

          return (
            <div
              className="wordle-cell"
              key={j}
              style={{ backgroundColor: bgColor }}
            >
              {letter}
            </div>
          );
        })}
      </div>
    );
  });

  return <div className="wordle-grid">{rows}</div>;
}
