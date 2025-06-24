import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Template from './template';
import './whole.css';
import Home from './contents/home';
import Article from './contents/article';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Template mainarea={<Home />} />} />
        <Route
          path="/article/:id"
          element={<Template mainarea={<Article />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
