import React from 'react';
import './IconButton.css';

const IconButton = ({ icon, text, onClick }) => {
  return (
    <div className="icon-button" onClick={onClick}>
      <div className="icon">{icon}</div>
      <p>{text}</p>
    </div>
  );
};

export default IconButton;
