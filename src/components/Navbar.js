import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <ul className="navbar">
      <h1>Products</h1>
      <li>
        <Link to={'/'} className="navlink">
          Home
        </Link>
      </li>
      <li>
        <Link to={'/favourites'} className="navlink">
          Favourites
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
