import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from '../pages/NotFound';
import { Home } from '../pages/Home';
import { Account } from '../pages/Account';
import { Login } from '../pages/Login';
import '../styles/App.css';
import NavBarApp from '../containers/NavBarApp';
import Layout from '../containers/Layout';
import ProductDetailContainer from '../containers/ProductDetailContainer';
import { Checkout } from '../pages/Checkout';
import { AppContext } from '../context/AppContext';

function App() {
  const { userState } = useContext(AppContext);
  return (
    <Layout>
      <NavBarApp />
      <Routes>
        {userState.user.authenticated ?
          <>
            <Route path='/account' element={<Account />} />
            <Route path='/checkout/:id' element={<Checkout />} />
            <Route path='/checkout' element={<Checkout />} />
          </>
          :
          <>
            <Route path='/checkout' element={<Login />} />
            <Route path='/account' element={<Login />} />
          </>
        }
        <Route path='/' element={<Home />} />
        <Route
          path='/item/:id'
          element={
            <ProductDetailContainer />
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
