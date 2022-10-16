import './style/App.css';
import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LoginRouter from './router/LoginRouter';
import PageRouter from './router/PageRouter';
import AuthGuard from './router/AuthGuard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth/*' element={<LoginRouter/>}/>
        <Route path='/*' element={
        <AuthGuard>
          <PageRouter/>
        </AuthGuard>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
