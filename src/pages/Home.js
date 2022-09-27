import React from 'react';
import { Carousel } from '../containers/Carousel';
import { ProductList } from '../containers/ProductList';
import { useFirestore } from '../hooks/useFirestore';

const Home = () => {
  const [products, loading] = useFirestore('products');
  return (
    <React.Fragment>
      <Carousel />
      {loading?<h2>Cargando ...</h2>:''}
      <ProductList products={products} />
    </React.Fragment>
  );
}

export {Home} ;
