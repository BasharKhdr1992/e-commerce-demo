import React from 'react';
import './Category.css';
import { useState } from 'react';

const Category = ({ selected, title, onSelectCategory }) => {
  const [focused, setFocused] = useState(false);

  const categoryClicked = () => {
    onSelectCategory(title);
  };

  const changeBG = () => setFocused((prev) => !prev);

  return (
    <div
      onMouseEnter={changeBG}
      onMouseLeave={changeBG}
      style={{
        backgroundColor: focused || selected ? 'cornflowerblue' : '#efeff0',
      }}
      className="category-item"
      onClick={categoryClicked}
    >
      {title}
    </div>
  );
};

export default Category;
