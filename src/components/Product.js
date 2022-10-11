import React from 'react';
import { AppContext } from '../context/AppContext';
import './product.css'

function Product(props) {
  const product = props.prod;
  const { cartDispatcher } = React.useContext(AppContext);
  return (
    <div title="Ver producto">
      <span><img className="imageProd" src={product.image} alt="producto" /></span>
      <h4>{product.title}</h4>
      <div>{product.shortDescription}</div>
      <div>Precio: $ {product.price}</div>
      <div>Stock: {product.stock}</div>
      <div>
        <button title="Ver detalle" >Detalle</button>
        <button title="Agregar al carrito" onClick={() => cartDispatcher({ type: 'ADD_TO_CART', payload: product })}>Agregar</button>
      </div>
    </div>
  )
}

export default Product;