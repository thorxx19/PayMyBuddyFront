import './style/App.css';
import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './page/Home';
import Transfert from './page/Transfert';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/transfert' element={<Transfert />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
