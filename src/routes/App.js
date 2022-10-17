import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from '../pages/NotFound';
import { Home } from '../pages/Home';
import { Account } from '../pages/Account';
import '../styles/App.css'
import NavBarApp from '../containers/NavBarApp';
import Layout from '../containers/Layout';
import ProductDetailContainer from '../containers/ProductDetailContainer';

function App() {
  return (
    <Layout>
      <NavBarApp />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/account' element={<Account />} />
        <Route
          path='/item/:id'
          element={
            <ProductDetailContainer />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
