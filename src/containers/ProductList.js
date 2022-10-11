import React, { useState } from 'react';
import Product from '../components/Product'
import SearchBar from '../components/SearchBar';
import { useProducts } from '../hooks/useProducts';

import './productList.css'

const ProductList = () => {
  const [products, loading] = useProducts();
  const [searchValue, setSearchValue] = useState('');

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
      {loading ? <h2>Cargando...</h2> : null}
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
