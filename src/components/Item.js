import React from 'react';
import './Item.css';

const Item = ({ product, onProductClick }) => {
  return (
    <div className="item" onClick={() => onProductClick(product.id)}>
      <img src={product.image} alt={product.title} title={product.title} />
      <p>{product.title}</p>
    </div>
  );
};

export default Item;
