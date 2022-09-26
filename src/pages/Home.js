import React from 'react';
import { Carousel } from '../containers/Carousel';
import { ProductList } from '../containers/ProductList';
import { useFirestore } from '../hooks/useFirestore';

const Home = () => {
  const [products, loading] = useFirestore('react-shop');
  return (
    <React.Fragment>
      <Carousel />
      <ProductList />
    </React.Fragment>
  );
}

export {Home} ;
