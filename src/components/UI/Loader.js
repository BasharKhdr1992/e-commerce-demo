import React from 'react';
import './Loader.css';

const Loader = ({ w, h }) => {
  let styles = {
    width: '50px',
    height: '50px',
  };

  if (h && w) {
    styles.width = w;
    styles.height = h;
  }

  return <div className="loader" style={styles}></div>;
};

export default Loader;
