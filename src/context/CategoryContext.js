import React, { createContext, useReducer } from 'react';
import categoriesReducer from '../reducers/CategoryReducer';
import * as Types from '../reducers/ActionTypes';

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
  const [state, dispatch] = useReducer(categoriesReducer, {
    categories: null,
    error: null,
    isloading: false,
    selectedCategory: '',
  });

  const loadCategories = () => {
    dispatch({
      type: Types.CATEGORIES_ARE_LOADING,
    });

    setTimeout(2000, fetchCategories());
  };

  const updateSelectedCategory = (cat) => {
    dispatch({
      type: Types.CATEGORY_SELECTED,
      payload: cat,
    });
  };
  const clearSelectionHandler = () => {
    dispatch({
      type: Types.CLEAR_SELECTION,
    });
  };
  const fetchCategories = async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/products/categories');
      const categories = await res.json();

      dispatch({
        type: Types.CATEGORIES_ARE_LOADED,
        payload: categories,
      });
    } catch (err) {
      dispatch({
        type: Types,
        payload: err.message,
      });
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories: state,
        loadCategories,
        updateSelectedCategory,
        clearSelectionHandler,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};
