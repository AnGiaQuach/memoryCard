export default function Card({ card, handleClick }) {
  return (
    <img
      className="card"
      src={`${card.imgUrl}`}
      onClick={() => handleClick(card)}
    />
  );
}
