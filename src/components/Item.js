import './Item.css';

const Item = ({ product }) => {
  return (
    <div className="item">
      <img src={product.image} alt={product.title} title={product.title} />
      <p>{product.title}</p>
    </div>
  );
};

export default Item;
