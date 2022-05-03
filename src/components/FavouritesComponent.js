import React, { useContext, useEffect } from 'react';
import { FavouriteContext } from '../context/FavouriteContext';
import { CategoryContext } from '../context/CategoryContext';
import { useFetchFavourites } from '../custom-hooks/useFetchFavourites';
import Items from './Items';
import Loader from './UI/Loader';
import Categories from './Categories';
const InfoMessage = ({ msg }) => {
  return (
    <div className="centering-container">
      <p className="info-para">{msg}</p>
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

const RenderCategories = (props) => {
  return (
    <>
      {props.categories.isloading && <Loader />}
      {props.categories.error && <h2>{props.categories.error}</h2>}
      {props.categories.categories && (
        <Categories
          categories={props.categories.categories}
          onSelectCategory={props.updateSelectedCategory}
          selectedCategory={props.categories.selectedCategory}
          clearSelection={props.clearSelectedCategory}
        />
      )}
    </>
  );
};

const FavouritesComponent = () => {
  const {
    favourites,
    setFavouritesLoading,
    setFavouritesError,
    favouritesLoaded,
  } = useContext(FavouriteContext);

  const {
    categories,
    updateSelectedCategory,
    clearSelectionHandler,
  } = useContext(CategoryContext);

  // Clear the selected category if any exists.
  useEffect(() => {
    clearSelectionHandler();
  }, []);

  if (favourites.favourites.length === 0) {
    return (
      <>
        <InfoMessage
          msg={`It looks like you have not added any product to your favourites list
        yet.`}
        />
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
    return (
      <>
        <RenderCategories categories={categories} />
        <Loading />;
      </>
    );
  }

  if (favourites.error) {
    return <Error error={favourites.error} />;
  }

  const filterFavourites = (selectedCategory) => {
    if (selectedCategory === '') return myFavourites;
    else
      return myFavourites.filter((item) => item.category === selectedCategory);
  };

  const myFilteredFavourites = filterFavourites(categories.selectedCategory);

  if (myFilteredFavourites.length === 0) {
    return (
      <>
        <RenderCategories
          updateSelectedCategory={updateSelectedCategory}
          clearSelectedCategory={clearSelectionHandler}
          categories={categories}
        />
        <InfoMessage
          msg={`It looks like you do not have any favourite product in category ${categories.selectedCategory}`}
        />
      </>
    );
  }

  return (
    <>
      <RenderCategories
        updateSelectedCategory={updateSelectedCategory}
        clearSelectedCategory={clearSelectionHandler}
        categories={categories}
      />
      <Items products={myFilteredFavourites} />
    </>
  );
};

export default FavouritesComponent;
