import * as Types from './ActionTypes';

const categoriesReducer = (state, action) => {
  switch (action.type) {
    case Types.CATEGORIES_ARE_LOADING:
      return { ...state, isloading: true, error: null };
    case Types.CATEGORIES_ARE_LOADED:
      return {
        ...state,
        isloading: false,
        error: null,
        categories: action.payload,
      };
    case Types.CATEGORIES_ERROR:
      return { ...state, isloading: false, error: action.payload };
    case Types.CLEAR_SELECTION:
      return { ...state, selectedCategory: '' };
    case Types.CATEGORY_SELECTED:
      return { ...state, selectedCategory: action.payload };
    default:
      throw new Error('something went wrong. Try again later!');
  }
};

export default categoriesReducer;
