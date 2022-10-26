import React from "react";
import CartItem from "./CartItem";
import CartEmpty from "./CartEmpty";
import CartTotal from "./CartTotal";
import Button from "react-bootstrap/Button";
import "../styles/ShoppingCart.css";
import { useNavigate } from "react-router-dom";

const CartList = (props) => {
  const navigate = useNavigate();
  const handleConfirm = () => {
    props.setActiveCart(!props.isActiveCart)
    navigate("/checkout")
  }
  return (
    <div className={ !props.isActiveCart? 'containerCart': 'containerCart max-test'}>
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
              <CartItem
                key={prod.id + index}
                prod={prod}
                cartDispatcher={props.cartDispatcher}
              />
            );
          })}
          <CartTotal total={props.total} productLength={props.productLength} />
          <Button onClick={handleConfirm} className="mb-3" variant="primary" title="Confirma tu compra">
            Confirmar compra
          </Button>
        </div>
      ) : (
        <CartEmpty setActiveCart={props.setActiveCart} />
      )}
    </div>
  );
};

export default CartList;
