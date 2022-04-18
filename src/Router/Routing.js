import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryDetails from '../components/ProductDetails';
import Home from '../components/Home';

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:product_id" element={<CategoryDetails />} />
      </Routes>
    </Router>
  );
};

export default Routing;
