import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from "./routes/root";
import Checkout from './routes/checkout'
import Cart from './routes/cart'
import Products,  { loader as productLoader } from './routes/products'
import ErrorPage from './routes/error-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: ':category',
        element: <Products />,
        loader: productLoader,
      },
      {
        path: '/',
        element: <Products />,
        loader: productLoader,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
