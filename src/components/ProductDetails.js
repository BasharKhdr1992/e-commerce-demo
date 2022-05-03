import React, { useReducer, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productReducer } from '../reducers/ProductReducer';
import * as Types from '../reducers/ActionTypes';
import Loader from './UI/Loader';
import './ProductDetails.css';
import IconButton from './UI/IconButton';
import { MdWest } from 'react-icons/md';
import { BsFillCartPlusFill } from 'react-icons/bs';

const CategoryDetails = () => {
  const [productState, dispatchProductAction] = useReducer(productReducer, {
    product: null,
    isloading: false,
    error: null,
  });

  const [prodInCart, setProdInCart] = useState(0);

  const { product_id } = useParams();
  const navigate = useNavigate();

  const fetchProductById = (product_id) => {
    fetch(`https://fakestoreapi.com/products/${product_id}`)
      .then((res) => {
        if (!res.ok) {
          dispatchProductAction({
            type: Types.PRODUCT_ERROR,
            payload: res.statusText,
          });
        } else {
          return res.json();
        }
      })
      .then((json) => {
        dispatchProductAction({
          type: Types.PRODUCT_IS_LOADED,
          payload: json,
        });
      })
      .catch((err) => {
        dispatchProductAction({
          type: Types.PRODUCT_ERROR,
          payload: err.message,
        });
      });
  };

  useEffect(() => {
    dispatchProductAction({
      type: Types.PRODUCT_IS_LOADING,
    });

    setTimeout(fetchProductById(product_id), 2000);
  }, [product_id]);

  const prod = productState.product;

  const RenderLoader = () => {
    return (
      <div className="centering-container">
        <Loader h={'120px'} w={'120px'} />
      </div>
    );
  };

  const ErrorMessage = () => {
    return (
      <div className="centering-container">
        <h1>{productState.error}</h1>
      </div>
    );
  };

  const increment = () => {
    setProdInCart((prev) => prev + 1);
  };

  const decrement = () => {
    setProdInCart((prev) => Math.max(0, prev - 1));
  };

  const navigateToCategoryPage = () => {
    navigate('/', { state: prod.category });
  };

  const btnBackClickHandler = () => navigate(-1);

  return (
    <div className="wrapper">
      {productState.isloading && <RenderLoader />}
      {productState.error && <ErrorMessage />}
      {prod && (
        <div className="product-container">
          <div className="prod-img-section">
            <IconButton
              icon={<MdWest />}
              text="Back"
              onClick={btnBackClickHandler}
            />
            <div className="img-outer-container">
              <div className="img-container">
                <img
                  className="product-img"
                  src={prod.image}
                  alt={prod.title}
                />
              </div>
            </div>
          </div>
          <div className="product-details">
            <div className="btn-category" onClick={navigateToCategoryPage}>
              In category&nbsp;{prod.category}
            </div>
            <h1>{prod.title}</h1>
            <p className="product-desc">{prod.description}</p>
            <p className="product-price">$&nbsp;{prod.price}</p>
            <div className="add-to-cart-section">
              <div className="add-to-cart-inner-section">
                <div className="btn-add" onClick={increment}>
                  +
                </div>
                <p className="product-in-cart">{prodInCart}</p>
                <div className="btn-subtract" onClick={decrement}>
                  -
                </div>
              </div>
              <div className="add-to-cart-btn">
                <BsFillCartPlusFill />
                Add to cart
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;
