import React from 'react';
import ReactDOM from 'react-dom/client';
import { Preview } from './preview';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Preview />
  </React.StrictMode>
); 