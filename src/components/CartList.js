import React from 'react'
import CartItem from "./CartItem";
import CartEmpty from "./CartEmpty";
import CartTotal from './CartTotal';
import Button from "react-bootstrap/Button";
import "../containers/ShoppingCart.css";

const CartList = (props) => {
  return (
    <div className="containerCart">
          <div className="cartHeader w-100 h-100">
            <h3>Detalle Carrito</h3>
            <h2
              className="closetCart"
              title="Cerrar"
              onClick={() => props.setActiveCart(!props.isActiveCart)}
            >
              X
            </h2>
          </div>
          {props.cart.length > 0 ? (
            <div className="bodyCart">
              {props.cart.map((prod, index) => {
                return (
                  <CartItem key={prod.id + index} prod={prod}  cartDispatcher={props.cartDispatcher}/>
                );
              })}
              <CartTotal total={props.total} productLength={props.productLength} />
              <Button
                className="mb-3"
                variant="primary"
                title="Confirma tu compra"
              >
                Confirmar compra
              </Button>
            </div>

          ) : (

            <CartEmpty setActiveCart={props.setActiveCart}/>

          )}
        </div>
  )
}

export default CartList