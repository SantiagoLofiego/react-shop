import React, { useEffect, useState } from 'react';
import Product from '../components/Product'
import SearchBar from '../components/SearchBar';
import { useProducts } from '../hooks/useProducts';
import { BsDot } from 'react-icons/bs';
import '../styles/productList.css'
import { useMountAnimation } from '../hooks/useMountAnimation';
import { Pagination } from 'react-bootstrap';

const ProductList = () => {
  const { products } = useProducts();
  const [searchValue, setSearchValue] = useState('');
  const glassPic = 'https://firebasestorage.googleapis.com/v0/b/react-shop-90ad9.appspot.com/o/qwe%2Flupa.png?alt=media&token=46bf6032-f61b-4b0b-a601-c81cc8fdaa42';
  const animated = useMountAnimation('anim-fade-start', 'anim-fade-end');
  const [searchedProducts, setSearchedProducts] = useState(products)
  const [pagProducts, setPageProducts] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState([]);
  const [fade, setFade] = useState('')

  useEffect(() => {
    if (!searchValue.length >= 1) {
      setSearchedProducts(products);
    }
    else {
      const newProductList = products.filter(product => {
        const productTitle = product.title.toLowerCase();
        const productDescription = product.shortDescription.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return productTitle.includes(searchText) || productDescription.includes(searchText);
      });
      setSearchedProducts(newProductList);
    }
  }, [searchValue, products])

  useEffect(() => {
    let maxItems=12;
    const pagesCount = Math.ceil((searchedProducts.length / maxItems));
    const newPages = []
    for (let i = 1; i <= pagesCount; i++) {
      newPages.push(i);
    }
    const start = (activePage - 1) * maxItems;
    const newProductList = searchedProducts.slice(start, start + maxItems)
    setPages(newPages)
    setPageProducts(newProductList);
  }, [activePage, searchedProducts])

  const handleChangePage = (number) => {
    setFade('anim-pagination-start')
    setActivePage(number);
    setTimeout(()=>setFade('anim-pagination-end'),50)
  }

  return (
    <div className={animated}>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />



      <div className="container">
        {searchedProducts.length > 0 ?
          <>
            <div className={`productsList ${fade}`} >
              {pagProducts.map((prod, index) => {
                return <Product key={"product_" + index} prod={prod} />
              })}
            </div>
            <Pagination>
              {pages.map((number) => {
                return (<Pagination.Item onClick={() => handleChangePage(number)} key={number} active={number === activePage}>{number}</Pagination.Item>)
              })}
            </Pagination>
          </>
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
    </div>
  );
}

export { ProductList };
