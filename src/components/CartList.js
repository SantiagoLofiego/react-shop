import React from "react";
import CartItem from "./CartItem";
import CartEmpty from "./CartEmpty";
import CartTotal from "./CartTotal";
import Button from "react-bootstrap/Button";
import "../styles/ShoppingCart.css";
import { useNavigate } from "react-router-dom";
import { BsFillXCircleFill } from "react-icons/bs";

import { useEffect } from "react";

const CartList = ({cart, isActiveCart, setActiveCart, cartDispatcher, productLength, total, handleToggleCart, css, setCss}) => {
  const navigate = useNavigate();
  const handleConfirm = () => {
    setActiveCart(!isActiveCart)
    navigate("/checkout")
  }


  useEffect(()=>{
    setTimeout(()=>{setCss('anim-toggle-cart-end')},50)
  },[setCss])

  return (
    <div  className={`containerCart ${css}`} onTransitionEnd={()=>{
      if(css === 'anim-toggle-cart-start'){
        setActiveCart(false)
      }
    }}>
      <div className="cartHeader w-100 h-100">
        <h3>Detalle Carrito</h3>
        <h2
          className="closetCart"
          title="Cerrar"
          onClick={() => handleToggleCart()}
        >
         <BsFillXCircleFill />
        </h2>
      </div>
      {cart.length > 0 ? (
        <div className="bodyCart">
          {cart.map((prod, index) => {
            return (
              <CartItem
                key={prod.id + index}
                prod={prod}
                cartDispatcher={cartDispatcher}
              />
            );
          })}
          <CartTotal total={total} productLength={productLength} />
          <Button onClick={handleConfirm} className="mb-3" variant="primary" title="Confirma tu compra">
            Confirmar compra
          </Button>
        </div>
      ) : (
        <CartEmpty setActiveCart={setActiveCart} />
      )}
    </div>
  );
};

export default CartList;
