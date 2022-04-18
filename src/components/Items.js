import React from 'react';
import './Items.css';
import Item from './Item';
import { useNavigate } from 'react-router-dom';

const Items = ({ products }) => {
  const navigate = useNavigate();

  const clickHandler = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div id="items-container">
      {products.map((prod) => {
        return (
          <Item key={prod.id} product={prod} onProductClick={clickHandler} />
        );
      })}
    </div>
  );
};

export default Items;
