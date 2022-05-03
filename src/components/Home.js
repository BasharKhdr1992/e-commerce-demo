import React, { useEffect, useContext, useReducer } from 'react';
import { CategoryContext } from '../context/CategoryContext';
import Items from './Items';
import Categories from './Categories';
import * as Types from '../reducers/ActionTypes';
import productsReducer from '../reducers/ProductsReducer';
import Loader from './UI/Loader';

const Home = () => {
  const [productsState, dispatchProductsAction] = useReducer(productsReducer, {
    products: null,
    error: null,
    isloading: false,
  });

  const {
    categories,
    loadCategories,
    clearSelectionHandler,
    updateSelectedCategory,
  } = useContext(CategoryContext);

  const fetchProducts = () => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then((json) => {
        localStorage.setItem('products', JSON.stringify(json));

        dispatchProductsAction({
          type: Types.PRODUCTS_ARE_LOADED,
          payload: json,
        });
      })
      .catch((err) => {
        dispatchProductsAction({
          type: Types.PRODUCTS_ERROR,
          payload: err.message,
        });
      });
  };

  const filterProductsByCategory = (cat) => {
    dispatchProductsAction({
      type: Types.PRODUCTS_ARE_LOADING,
    });

    fetch(`https://fakestoreapi.com/products/category/${cat}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then((json) =>
        dispatchProductsAction({
          type: Types.PRODUCTS_ARE_LOADED,
          payload: json,
        })
      )
      .catch((err) => {
        dispatchProductsAction({
          type: Types.PRODUCTS_ERROR,
          payload: err.message,
        });
      });
  };

  useEffect(() => {
    // fetch categories
    loadCategories();
    dispatchProductsAction({
      type: Types.PRODUCTS_ARE_LOADING,
    });
    fetchProducts();
  }, []);

  const filterProducts = (cat) => {
    updateSelectedCategory(cat);
    filterProductsByCategory(cat);
  };

  const clearSelectedCategory = () => {
    clearSelectionHandler();
    if (localStorage.getItem('products') !== null) {
      dispatchProductsAction({
        type: Types.PRODUCTS_ARE_LOADED,
        payload: JSON.parse(localStorage.getItem('products')),
      });
    } else {
      fetchProducts();
    }
  };

  return (
    <div role="main">
      {categories.isloading && <Loader />}
      {categories.error && <h2>{categories.error}</h2>}
      {categories.categories && (
        <Categories
          categories={categories.categories}
          onSelectCategory={filterProducts}
          selectedCategory={categories.selectedCategory}
          clearSelection={clearSelectedCategory}
        />
      )}
      {productsState.isloading && <Loader />}
      {productsState.error && <h2>{productsState.error}</h2>}
      {productsState.products && <Items products={productsState.products} />}
    </div>
  );
};

export default Home;
