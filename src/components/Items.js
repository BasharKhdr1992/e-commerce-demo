import './Items.css';
import Item from './Item';

const Items = ({ products }) => {
  return (
    <div id="items-container">
      {products.map((prod) => {
        return <Item key={prod.id} product={prod} />;
      })}
    </div>
  );
};

export default Items;
