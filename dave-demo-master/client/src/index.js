import { render } from "react-dom";
import React from 'react';
import ReactDOM from "react-dom";
import App from "./app/App";
import  store  from './store/store';
import { Provider } from 'react-redux';
import { StrictMode } from "react";

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')

);