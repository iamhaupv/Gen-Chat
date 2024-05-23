import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  BrowserRouter, 
  RouterProvider,
  Route,
  Link,
  Router,
} from "react-router-dom";
import Home from './pages/Home';
import Main from './pages/Main';
import SignUp from './components/SignUp';
import OTP from './components/OTP';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/Main",
    element: <Main />
  },
  {
    path: "/SignUp",
    element: <SignUp />
  },
  {
    path: "/OTP",
    element: <OTP />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <BrowserRouter>
    <React.StrictMode>
      <RouterProvider router={router} />
      <App />
    </React.StrictMode>
  // </BrowserRouter>
  
    // Go react strictmode de no ko render cai nay 2 lan
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
