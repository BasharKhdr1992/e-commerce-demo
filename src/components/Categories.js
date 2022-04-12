import Category from './Category';
import './Categories.css';

const Categories = ({ categories, selectedCategory, onSelectCategory }) => {
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
    </div>
  );
};

export default Categories;
