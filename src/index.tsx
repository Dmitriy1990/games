import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
