import { useEffect, useState } from 'react';
import './App.css';
import categories from './../fake-data/all-categories';
import products from './../fake-data/all-products';
import Items from './Items';
import Categories from './Categories';

const App = () => {
  const [data, setData] = useState({ cats: [], prods: [] });
  const [category, setCategory] = useState('');

  useEffect(() => {
    setData({ cats: categories, prods: products });
  }, []);

  const updateProducts = (cat) => {
    setData((prev) => {
      return {
        ...prev,
        prods: products.filter((prod) => `FAKE: ${prod.category}` === cat),
      };
    });
  };

  return (
    <div id="main">
      <h1>Products</h1>

      <Categories
        categories={data.cats}
        selectedCategory={category}
        onSelectCategory={(cat) => {
          updateProducts(cat);
          setCategory(cat);
        }}
      />
      <Items products={data.prods} />
    </div>
  );
};

export default App;
