import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CreateToken from './pages/CreateToken'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router";
import CreateBasketFactory from './pages/CreateBasketFactory'
import CreateBasket from './pages/CreateBasket'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create-token" element={<CreateToken />} />
        <Route path="/create-basket-factory" element={<CreateBasketFactory />} />
        <Route path="/create-basket" element={<CreateBasket />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
