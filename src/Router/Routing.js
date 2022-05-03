import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoryDetails from '../components/ProductDetails';
import Home from '../components/Home';
import Favourites from '../components/FavouritesComponent';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/products/:product_id" element={<CategoryDetails />} />
    </Routes>
  );
};

export default Routing;
