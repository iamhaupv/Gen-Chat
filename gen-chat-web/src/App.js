import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Main from './pages/Main';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      {/* <Home/> */}

        <Route path="/" element={<Home />}></Route>
        <Route path="/Main" element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  );
}