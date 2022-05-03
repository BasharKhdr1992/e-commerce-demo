import { useEffect, useState } from 'react';

export const useFetchFavourites = (favourites, start, end, error) => {
  const [myFavourites, setMyFavourites] = useState([]);

  const fetchFavourite = async (favourites) => {
    try {
      const promises = favourites.map((fav) =>
        fetch(`https://fakestoreapi.com/products/${fav}`)
      );
      const responses = await Promise.all(promises);
      const favourite_products = await Promise.all(
        responses.map((res) => res.json())
      );
      setMyFavourites(favourite_products);
      end();
    } catch (err) {
      error(err.message);
    }
  };

  useEffect(() => {
    start();
    setTimeout(2000, fetchFavourite(favourites));
  }, [favourites]);
  return [myFavourites];
};
