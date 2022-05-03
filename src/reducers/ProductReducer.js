import * as Types from './ActionTypes';

export const productReducer = (state, action) => {
  switch (action.type) {
    case Types.PRODUCT_IS_LOADING:
      return { ...state, isloading: true, error: null };
    case Types.PRODUCT_IS_LOADED:
      return { ...state, isloading: false, product: action.payload };
    case Types.PRODUCT_ERROR:
      return { ...state, isloading: false, error: action.payload };
    default:
      throw new Error('Something went wrong!');
  }
};

export default productReducer;
