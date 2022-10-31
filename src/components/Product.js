import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import '../styles/product.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BsCartPlus, BsInfoCircle } from 'react-icons/bs';

function Product(props) {
  const product = props.prod;
  const { cartDispatcher } = React.useContext(AppContext);

  useEffect(() => {
    if (product.stock === 0) {
      document.getElementById('btnAdd_' + product.id).classList.add('disabled')
    }
  }, [product])

  return (
    <Card style={{ width: '18rem' }} className='m-2'>
      <Card.Img className='imageProd' variant="top" src={product.image} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
          {product.shortDescription}
          <br></br>
          {product.stock > 0 ?
            <span className='fw-bolder mt-2'>
              {`Stock Disponible: ${product.stock}`}
            </span>
            :
            <span className='fw-bolder mt-2 bg-danger py-1 px-5 text-light rounded'>
              Sin Stock
            </span>
          }
          <br />
          {`$ ${product.price}`}
        </Card.Text>
        <Button id={`btnAdd_` + product.id} variant="primary" onClick={() => cartDispatcher({ type: 'ADD_TO_CART', payload: product })} className='me-1'>
          <BsCartPlus /> Agregar
        </Button>
        <Link to={`/item/${product.fid}`} className="text-decoration-none ms-1">
          <Button variant="primary">
            <BsInfoCircle /> Detalle
          </Button>
        </Link>

      </Card.Body>
    </Card>
  )
}

export default Product;