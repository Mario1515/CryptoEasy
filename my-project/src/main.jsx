import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from "react-dom/client";
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from './pages/Home.jsx';
import Crypto from './pages/Crypto.jsx';
import Saved from './pages/Saved.jsx';
import Register from './pages/Register.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children:[
      {
        path:"/crypto",
        element: <Crypto />
      },
      {
        path:"/saved",
        element: <Saved />
      },
      {
        path:"/register",
        element: <Register />
      },
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);