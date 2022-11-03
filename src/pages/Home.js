import React from 'react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { MainCarousel } from '../containers/MainCarousel';
import { ProductList } from '../containers/ProductList';
import { useProducts } from '../hooks/useProducts'

const Home = () => {
  const{loading} = useProducts();
  return (
    <React.Fragment>
      {loading
        ? <LoadingSpinner></LoadingSpinner>
        : <>
          <MainCarousel />
          <ProductList />
        </>
      }
    </React.Fragment>
  );
}

export { Home };
