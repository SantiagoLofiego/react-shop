import React from 'react';
import { Carousel } from '../containers/Carousel';
import { ProductList } from '../containers/ProductList';
import { useFirestore } from '../hooks/useFirestore';

const Home = () => {
  const [products, loading] = useFirestore('products');
  return (
    <React.Fragment>
      {loading?<h2>Cargando ...</h2>:''}
      {products.map((prod,index) => <h3 key={'prod'+index}>{prod.title} ${prod.price}</h3>)}
      <Carousel />
      <ProductList />
    </React.Fragment>
  );
}

export {Home} ;
