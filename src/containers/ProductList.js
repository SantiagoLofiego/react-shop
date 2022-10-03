import React, { useState } from 'react';
import Product from '../components/Product'
import SearchBar from '../components/SearchBar';

import './productList.css'

const ProductList = ({products}) => {
  const [ searchValue, setSearchValue ] = useState('');
  
  let searchedProducts = [];
  
  if (!searchValue.length >= 1) {
    searchedProducts = products;
  }
  else {
    searchedProducts = products.filter(product => {
      const productTitle = product.title.toLowerCase();
      const productDescription = product.shortDescription.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return productTitle.includes(searchText) || productDescription.includes(searchText);
    });
  }

  return (
    <>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="productsList">
        {
          searchedProducts.map((prod, index) => {
            return <Product key={"product_" + index} prod={prod} />
          })
        }
      </div>
    </>
  );
}

export { ProductList };
