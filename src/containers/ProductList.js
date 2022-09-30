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
    const searchedProductsTitle = products.filter(product => {
      const productTitle = product.title.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return productTitle.includes(searchText);
    });
    const searchedProductsDesc = products.filter(product => {
      const productDescription = product.shortDescription.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return productDescription.includes(searchText);
    })
    searchedProducts = [...new Set([...searchedProductsTitle, ...searchedProductsDesc])];
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
