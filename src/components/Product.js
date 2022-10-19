import React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import '../styles/product.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BsCartPlus, BsInfoCircle } from 'react-icons/bs';

function Product(props) {
  const product = props.prod;
  const { cartDispatcher } = React.useContext(AppContext);
  return (
    <Card style={{ width: '18rem' }} className='m-2'>
      <Card.Img className='imageProd' variant="top" src={product.image} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
          {product.shortDescription}
        </Card.Text>
        <Button variant="primary" onClick={() => cartDispatcher({ type: 'ADD_TO_CART', payload: product })} className='me-1'>
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