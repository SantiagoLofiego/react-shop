import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import { useMountAnimation } from '../hooks/useMountAnimation';
import { useProducts } from '../hooks/useProducts';

const MainCarousel = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const { products } = useProducts();
  const [filterProdAv, setFilterProdAv] = useState([]);
  const [filterProdLim, setFilterProdLim] = useState([]);
  const animated = useMountAnimation('anim-fade-start', 'anim-fade-end');
  const firstSlide = {
    id: 22,
    src: 'https://firebasestorage.googleapis.com/v0/b/react-shop-90ad9.appspot.com/o/qwe%2Foferta-especial.jpg?alt=media&token=a7378371-6c57-4860-8d9c-5ac29584c458'
  };

  useEffect(() => {
    setFilterProdAv(products.filter(prod => prod.stock > 5));
    setFilterProdLim(products.filter(prod => prod.stock <= 5 && prod.stock > 0));

    function handleWindowResize() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [products]);


  return (
    <div className={animated}>
      <Carousel className='m-2 shadow-sm p-3 mb-5 bg-body rounded' style={windowSize > 750 ? { height: "400px" } : { height: "255px" }}>
        <Carousel.Item key={"slide_" + firstSlide.id} className='h-75'>
          <img
            height={windowSize > 750 ? "345px" : "200px"}
            className="mw-100"
            src={firstSlide.src}
            alt=""
          />
        </Carousel.Item>
        {filterProdLim.map((banner, index) =>
          index <= 4 ?
            <Carousel.Item key={"slide_" + banner.id} className='h-75'>
              <Link to={`/item/${banner.fid}`} className="text-decoration-none ms-1">
                <img
                  height={windowSize > 750 ? "345px" : "200px"}
                  className="mw-100"
                  src={banner.image}
                  alt=""
                />
                <div className='card-img-overlay'>
                  <h5 className="badge text-bg-warning stock-tag">Stock Limitado</h5>
                </div>
              </Link>
            </Carousel.Item>
            :
            null
        )}
        {filterProdAv.map((banner, index) =>
          index <= 5 ?
            <Carousel.Item key={"slide_" + banner.id} className='h-75'>
              <Link to={`/item/${banner.fid}`} className="text-decoration-none ms-1">
                <img
                  height={windowSize > 750 ? "345px" : "200px"}
                  className="mw-100"
                  src={banner.image}
                  alt=""
                />
                <div className='card-img-overlay'>
                  <h5 className="badge text-bg-success stock-tag">Stock Disponible</h5>
                </div>
              </Link>
            </Carousel.Item>
            :
            null
        )}
      </Carousel>
    </div>
  )
}

export { MainCarousel }
