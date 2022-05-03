import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { CategoryProvider } from './context/CategoryContext';
import { FavouriteProvider } from './context/FavouriteContext';

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <FavouriteProvider>
    <CategoryProvider>
      <App />
    </CategoryProvider>
  </FavouriteProvider>
);
