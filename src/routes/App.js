import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from '../pages/NotFound';
import { Home } from '../pages/Home';
import '../styles/App.css'
import Navbar from '../containers/Navbar';
import Layout from '../containers/Layout';

function App() {
  return (
    <Layout>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
