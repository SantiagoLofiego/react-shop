import React from 'react';
import { MainCarousel } from '../containers/MainCarousel';
import { ProductList } from '../containers/ProductList';

const Home = () => {
  return (
    <React.Fragment>
      <MainCarousel />
      <ProductList />
    </React.Fragment>
  );
}

export { Home };
