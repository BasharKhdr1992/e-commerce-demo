import React, { useContext } from 'react';
import { FavouriteContext } from '../context/FavouriteContext';
import { useFetchFavourites } from '../custom-hooks/useFetchFavourites';
import Items from './Items';
import Loader from './UI/Loader';
const InfoMessage = () => {
  return (
    <div className="centering-container">
      <p className="info-para">
        It looks like you have not added any product to your favourites list
        yet.
      </p>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="centering-container">
      <Loader />
    </div>
  );
};

const Error = ({ error }) => {
  return <div className="centering-container">{error}</div>;
};

const FavouritesComponent = () => {
  const {
    favourites,
    setFavouritesLoading,
    setFavouritesError,
    favouritesLoaded,
  } = useContext(FavouriteContext);

  if (favourites.favourites.length === 0) {
    return (
      <>
        <InfoMessage />
      </>
    );
  }

  const [myFavourites] = useFetchFavourites(
    favourites.favourites,
    setFavouritesLoading,
    favouritesLoaded,
    setFavouritesError
  );

  if (favourites.isloading) {
    return <Loading />;
  }

  if (favourites.error) {
    return <Error error={favourites.error} />;
  }

  return <Items products={myFavourites} />;
};

export default FavouritesComponent;
