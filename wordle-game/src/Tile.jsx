export default function Tile({ letter, color }) {
  const tileStyle = {
    width: "40px",
    height: "40px",
    border: "2px solid white",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "2px",
    fontSize: "24px",
    fontWeight: "bold",
    backgroundColor:
      color === "green" ? "green" :
      color === "yellow" ? "goldenrod" :
      color === "gray" ? "gray" :
      "black",
    color: "white",
    transition: "background-color 0.3s ease",
  };

  return <div style={tileStyle}>{letter}</div>;
}
