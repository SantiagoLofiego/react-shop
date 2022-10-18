import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from '../pages/NotFound';
import { Home } from '../pages/Home';
import { Account } from '../pages/Account';
import { Login } from '../pages/Login';
import '../styles/App.css';
import NavBarApp from '../containers/NavBarApp';
import Layout from '../containers/Layout';
import { Checkout } from '../pages/Checkout';

function App() {
  return (
    <Layout>
      <NavBarApp />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/account' element={<Account />} />
        <Route path='/checkout/:id' element={<Checkout />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/login' element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
