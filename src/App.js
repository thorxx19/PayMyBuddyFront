import './style/App.css';
import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './page/Home';
import Transfert from './page/Transfert';
import Contact from './page/Contact';
import ProfilePerso from './page/ProfileTransfert';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/transfert' element={<Transfert />}/>
        <Route path='/profile' element={<ProfilePerso />}/>
        <Route path='/contact' element={<Contact />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
