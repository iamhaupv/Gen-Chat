import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter, 
  Route,
  Link,
  Router,
} from "react-router-dom";
import Home from './pages/Home';
import Main from './pages/Main';
import SignUp from './components/SignUp';
import OTP from './components/OTP';
import CallScreen from './components/CallScreen';

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
  {
    path: "/CallScreen",
    element: <CallScreen />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // Go react strictmode de no ko render cai nay 2 lan
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
