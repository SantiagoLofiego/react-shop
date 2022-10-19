import React, { useState } from 'react';
import Product from '../components/Product'
import SearchBar from '../components/SearchBar';
import { useProducts } from '../hooks/useProducts';
import { BsDot } from 'react-icons/bs';

import '../styles/productList.css'

const ProductList = () => {
  const [products, loading] = useProducts();
  const [searchValue, setSearchValue] = useState('');
  const glassPic = 'https://firebasestorage.googleapis.com/v0/b/react-shop-90ad9.appspot.com/o/qwe%2Flupa.png?alt=media&token=46bf6032-f61b-4b0b-a601-c81cc8fdaa42';

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
        {searchedProducts.length > 0 ?
          searchedProducts.map((prod, index) => {
            return <Product key={"product_" + index} prod={prod} />
          })
          :
          <div className='container m-2 shadow-sm p-3 mb-5 bg-body rounded d-flex'>
            <div className='p-2 flex-shrink-1'>
              <img src={glassPic} width={'130px'} alt='' />
            </div>
            <div className='p-2 w-100'>
              <h4>No hay resultados que coincidan con tu búsqueda.</h4>
              <ul>
                <li className='list-group-item'><BsDot /><strong>Revisá la ortografía</strong> de la palabra.</li>
                <li className='list-group-item'><BsDot />Utilizá <strong>palabras más genéricas.</strong></li>
              </ul>

            </div>
          </div>
        }
      </div>
    </>
  );
}

export { ProductList };
