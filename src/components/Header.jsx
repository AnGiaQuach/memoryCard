import Button from "./Button";

export default function Header({ score, bestScore, restartHandle }) {
  return (
    <div className="header">
      <Button title="Restart" handleClick={restartHandle}></Button>
      <button className="button">Score:{score}</button>
      <button className="button">Best Score: {bestScore}</button>
    </div>
  );
}
