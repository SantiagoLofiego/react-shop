import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import '../styles/product.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BsCartPlus, BsInfoCircle } from 'react-icons/bs';
import { useState } from 'react';
import AddToCartIcon from './AddToCartIcon';

function Product(props) {
  const product = props.prod;
  const { cartDispatcher, cartState } = React.useContext(AppContext);
  const [addIcon, setAddIcon] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const inCartItem = cartState.cart.find((prod) => prod.fid === product.fid);
  const inCartQuantity = inCartItem ? inCartItem.quantity : 0;

  const handleAdd = (product) => {
    if (!addIcon) {
      setAddIcon(true)
      cartDispatcher({ type: 'ADD_TO_CART', payload: product })
    }
  }

  useEffect(() => {
    const inCartItem = cartState.cart.find((prod) => prod.fid === product.fid);
    const inCartQuantity = inCartItem ? inCartItem.quantity : 0;
    if (product.stock === 0 || inCartQuantity === product.stock) {
      setDisabled(true)
    }else{
      setDisabled(false)
    }
  }, [product, cartState])

  return (
    <Card style={{ width: '18rem' }} className='m-2 cardShaddow'>
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
        <Button id={`btnAdd_` + product.id} variant="primary" onClick={() => handleAdd(product)} className='me-1 buttonBG buttonBG-1' disabled={disabled}>
          <BsCartPlus /> Agregar
        </Button>
        <Link to={`/item/${product.fid}`} className="text-decoration-none ms-1">
          <Button variant="primary" className='buttonBG buttonBG-1'>
            <BsInfoCircle /> Detalle
          </Button>
        </Link>
        {addIcon ? <AddToCartIcon setAddIcon={setAddIcon} addIcon={addIcon} /> : ''}
      </Card.Body>
    </Card>
  )
}

export default Product;