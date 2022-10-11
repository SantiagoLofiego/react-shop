import React from 'react';
import { MainCarousel } from '../containers/MainCarousel';
import { ProductList } from '../containers/ProductList';


const Home = () => {

  
  console.log('RENDER HOME')
  return (
    <React.Fragment>
      <MainCarousel />
      <ProductList />
    </React.Fragment>
  );
}

export {Home} ;
