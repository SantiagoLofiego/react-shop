import React from 'react';
import { Carousel } from '../containers/Carousel';
import { ProductList } from '../containers/ProductList';


const Home = () => {

  
  console.log('RENDER HOME')
  return (
    <React.Fragment>
      <Carousel />
      <ProductList />
    </React.Fragment>
  );
}

export {Home} ;
