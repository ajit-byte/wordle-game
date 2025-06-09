import Tile from "./Tile";

export default function Row({ guess = "", solution, isFinal }) {
  const getGuessColors = (guess, solution) => {
    const colors = Array(5).fill("gray");
    const solutionArray = solution.split("");

    guess.split("").forEach((letter, i) => {
      if (solutionArray[i] === letter) {
        colors[i] = "green";
        solutionArray[i] = null;
      }
    });

    guess.split("").forEach((letter, i) => {
      if (colors[i] !== "green" && solutionArray.includes(letter)) {
        colors[i] = "yellow";
        solutionArray[solutionArray.indexOf(letter)] = null;
      }
    });

    return colors;
  };

  const colors = isFinal ? getGuessColors(guess, solution) : Array(5).fill("");
  return (
    <div className="row">
      {[...Array(5)].map((_, i) => (
        <Tile key={i} letter={guess[i] || ""} color={colors[i]} />
      ))}
    </div>
  );
}
