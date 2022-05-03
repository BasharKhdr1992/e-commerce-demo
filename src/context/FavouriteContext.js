import React, { createContext, useReducer } from 'react';
import { FavouriteReducer } from '../reducers/FavouriteReducer';
import * as Types from '../reducers/ActionTypes';
const initialState = {
  favourites: [],
  isloading: false,
  error: null,
};

export const FavouriteContext = createContext();

export const FavouriteProvider = (props) => {
  const [state, dispatch] = useReducer(FavouriteReducer, initialState);

  const addToFavourite = (id) => {
    dispatch({
      type: Types.ADD_FAVOURITE,
      payload: id,
    });
  };

  const deleteFromFavourite = (id) => {
    dispatch({
      type: Types.DELETE_FAVOURITE,
      payload: id,
    });
  };

  const setFavouritesLoading = () => {
    dispatch({
      type: Types.LOADING_FAVOURITES,
    });
  };

  const setFavouritesError = (err) => {
    dispatch({
      type: Types.FAVOURITES_ERROR,
      payload: err,
    });
  };

  const favouritesLoaded = () => {
    dispatch({
      type: Types.FAVOURITES_LOADED,
    });
  };

  return (
    <FavouriteContext.Provider
      value={{
        favourites: state,
        addToFavourite,
        deleteFromFavourite,
        setFavouritesLoading,
        setFavouritesError,
        favouritesLoaded,
      }}
    >
      {props.children}
    </FavouriteContext.Provider>
  );
};
