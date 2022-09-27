import React from 'react';
import Product from '../components/Product'

import './productList.css'

const ProductList = (props) => {
  return (
    <div className="productsList">
      {
        props.products.map((prod, index) => {
          return <Product key={index} prod={prod} />
        })
      }
    </div>
  );
}

export { ProductList };
