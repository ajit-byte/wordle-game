// src/Board.jsx
import Row from './Row';

export default function Board({ guesses, solution }) {
  const rows = [];

  for (let i = 0; i < 6; i++) {
    const guess = guesses[i] || '';
    rows.push(
      <Row
        key={i}
        guess={guess}
        solution={solution}
        isFinal={i < guesses.length - 1 || (i === guesses.length - 1 && guess.length === 5)}
      />
    );
  }

  return <div className="board">{rows}</div>;
}
