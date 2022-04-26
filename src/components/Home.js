import React, { useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import Items from './Items';
import Categories from './Categories';
import * as Types from './reducers/ActionTypes';
import categoriesReducer from './reducers/CategoryReducer';
import productsReducer from './reducers/ProductsReducer';
import Loader from './UI/Loader';

const Home = () => {
  const location = useLocation();

  const [categoriesState, dispatchCategoriesAction] = useReducer(
    categoriesReducer,
    {
      categories: null,
      error: null,
      isloading: false,
      selectedCategory: '',
    }
  );

  const [productsState, dispatchProductsAction] = useReducer(productsReducer, {
    products: null,
    error: null,
    isloading: false,
  });

  const fetchCategories = () => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => {
        if (res.status !== 200) {
          dispatchCategoriesAction({
            type: Types.CATEGORIES_ERROR,
            payload: res.statusText,
          });
        } else {
          return res.json();
        }
      })
      .then((json) =>
        dispatchCategoriesAction({
          type: Types.CATEGORIES_ARE_LOADED,
          payload: json,
        })
      )
      .catch((err) => {
        dispatchCategoriesAction({
          type: Types.CATEGORIES_ERROR,
          payload: err.message,
        });
      });
  };

  const fetchProducts = () => {
    dispatchProductsAction({
      type: Types.PRODUCTS_ARE_LOADING,
    });

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
    dispatchCategoriesAction({
      type: Types.CATEGORIES_ARE_LOADING,
    });

    // fetch categories
    setTimeout(fetchCategories, 2000);

    if (location.state) {
      updateProducts(location.state);
    } else {
      dispatchProductsAction({
        type: Types.PRODUCTS_ARE_LOADING,
      });
      // fetch products
      setTimeout(fetchProducts, 2000);
    }
  }, []);

  const updateSelectedCategory = (cat) => {
    dispatchCategoriesAction({
      type: Types.CATEGORY_SELECTED,
      payload: cat,
    });

    return new Promise((resolve, reject) => {
      if (productsState.error || categoriesState.error) {
        reject('An error occurred. Sorry for the inconvenience');
      } else {
        resolve(cat);
      }
    });
  };

  const updateProducts = (cat) => {
    updateSelectedCategory(cat).then((cat) => {
      filterProductsByCategory(cat);
    });
  };

  const clearSelectionHandler = () => {
    dispatchCategoriesAction({
      type: Types.CLEAR_SELECTION,
    });

    dispatchProductsAction({
      type: Types.PRODUCTS_ARE_LOADED,
      payload: JSON.parse(localStorage.getItem('products')),
    });
  };

  return (
    <div id="main" role="main">
      <h1 className="main-title">Products</h1>
      {categoriesState.isloading && <Loader />}
      {categoriesState.error && <h2>{categoriesState.error}</h2>}
      {categoriesState.categories && (
        <Categories
          categories={categoriesState.categories}
          onSelectCategory={updateProducts}
          selectedCategory={categoriesState.selectedCategory}
          clearSelection={clearSelectionHandler}
        />
      )}
      {productsState.isloading && <Loader />}
      {productsState.error && <h2>{productsState.error}</h2>}
      {productsState.products && <Items products={productsState.products} />}
    </div>
  );
};

export default Home;
