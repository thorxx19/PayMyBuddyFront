import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../page/Home';
import Transfert from '../page/Transfert';
import ProfilePerso from '../page/ProfileTransfert'
import Contact from '../page/Contact'

const PageRouter = () => {
    return (
        <Routes>
            <Route index element={<Home />}/>
            <Route path='home' element={<Home />}/>
            <Route path='transfert' element={<Transfert />}/>
            <Route path='profile' element={<ProfilePerso />}/>
            <Route path='contact' element={<Contact />}/>
        </Routes>
    );
};

export default PageRouter;