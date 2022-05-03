import * as Types from './ActionTypes';

const productsReducer = (state, action) => {
  switch (action.type) {
    case Types.PRODUCTS_ARE_LOADING:
      return { ...state, isloading: true, error: null, products: null };
    case Types.PRODUCTS_ARE_LOADED:
      return { ...state, isloading: false, products: action.payload };
    case Types.PRODUCTS_ERROR:
      return { ...state, isloading: false, error: action.payload };
    case Types.FILTER_PRODUCTS:
      return {
        ...state,
        products: state.products.filter((p) => p.id === action.payload),
      };
    default:
      throw new Error('something went wrong. Try again later!');
  }
};

export default productsReducer;
