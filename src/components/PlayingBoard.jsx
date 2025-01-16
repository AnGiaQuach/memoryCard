import Card from "./Card";

export default function PlayingBoard({ imgArray, handleCardClick }) {
  return (
    <div className="playing-board">
      {imgArray.map((card) => (
        <Card key={card.id} card={card} handleClick={handleCardClick} />
      ))}
    </div>
  );
}
