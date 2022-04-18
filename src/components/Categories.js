import React from 'react';
import Category from './Category';
import './Categories.css';

const Categories = ({
  categories,
  selectedCategory,
  onSelectCategory,
  clearSelection,
}) => {
  return (
    <div id="categories-container">
      {categories.map((category, index) => {
        return (
          <Category
            key={index}
            selected={category === selectedCategory}
            title={category}
            onSelectCategory={(val) => onSelectCategory(val)}
          />
        );
      })}
      <Category
        key={categories.length}
        title={'clear selection'}
        onSelectCategory={clearSelection}
      />
    </div>
  );
};

export default Categories;
