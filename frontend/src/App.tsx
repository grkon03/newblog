import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Template from './template';
import './whole.css';
import Home from './contents/home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Template mainarea={<Home />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
