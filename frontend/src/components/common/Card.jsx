export default function Card({ title, value, image }) {
  return (
    <div className="card">
      {image && <img src={image} alt={title} className="card-img" />}
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}