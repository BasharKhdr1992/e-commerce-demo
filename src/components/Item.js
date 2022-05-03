import React, { useContext } from 'react';
import './Item.css';
import heartRegular from '../assets/heart-regular.svg';
import heartSolid from '../assets/heart-solid.svg';
import { FavouriteContext } from '../context/FavouriteContext';

const Item = ({ product, onProductClick, isFavourite }) => {
  const { addToFavourite, deleteFromFavourite } = useContext(FavouriteContext);

  const toggleFavourite = (id) => {
    if (isFavourite) {
      deleteFromFavourite(id);
    } else {
      addToFavourite(id);
    }
  };

  return (
    <div className="item">
      <div className="item-header">
        <img
          src={isFavourite ? heartSolid : heartRegular}
          alt={`heart ${isFavourite ? 'solid' : 'regular'} icon`}
          className="icon-heart"
          onClick={() => toggleFavourite(product.id)}
        />
      </div>
      <div className="img-container no-box-shadow">
        <img src={product.image} alt={product.title} title={product.title} />
      </div>
      <p className="prod-title" onClick={() => onProductClick(product.id)}>
        {product.title}
      </p>
    </div>
  );
};

export default Item;
