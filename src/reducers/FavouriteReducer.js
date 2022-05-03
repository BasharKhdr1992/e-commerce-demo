import * as Types from './ActionTypes';

export const FavouriteReducer = (state, action) => {
  switch (action.type) {
    case Types.LOADING_FAVOURITES: {
      return {
        ...state,
        isloading: true,
        error: null,
      };
    }

    case Types.FAVOURITES_LOADED: {
      return {
        ...state,
        isloading: false,
      };
    }

    case Types.ADD_FAVOURITE: {
      return {
        ...state,
        favourites: [...state.favourites, action.payload],
      };
    }

    case Types.DELETE_FAVOURITE: {
      return {
        ...state,
        favourites: state.favourites.filter((fav) => fav !== action.payload),
      };
    }

    case Types.FAVOURITES_ERROR: {
      return {
        ...state,
        isloading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
