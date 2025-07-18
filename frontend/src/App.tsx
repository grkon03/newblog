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
        <Route
          path="/"
          element={
            <Template>
              <Home />
            </Template>
          }
        />
        <Route
          path="/article/:id"
          element={
            <Template>
              <Article />
            </Template>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
