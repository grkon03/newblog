import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';
import './App.css';
import './whole.css';
import 'katex/dist/katex.min.css';
import { MyRoutes } from './routes';

Modal.setAppElement('#root');

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {MyRoutes.map((p) => (
          <Route path={p.path} element={p.elem} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
