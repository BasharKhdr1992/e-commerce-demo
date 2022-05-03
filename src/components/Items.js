import React, { useContext } from 'react';
import './Items.css';
import Item from './Item';
import { useNavigate } from 'react-router-dom';
import { FavouriteContext } from '../context/FavouriteContext';

const Items = ({ products }) => {
  const { favourites } = useContext(FavouriteContext);

  const navigate = useNavigate();

  const clickHandler = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div id="items-container">
      {products.map((prod) => {
        return (
          <Item
            key={prod.id}
            isFavourite={favourites.favourites.includes(prod.id)}
            product={prod}
            onProductClick={clickHandler}
          />
        );
      })}
    </div>
  );
};

export default Items;
