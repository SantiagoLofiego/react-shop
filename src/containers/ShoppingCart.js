import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import { FaShoppingCart } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";
import CartList from "../components/CartList";
import "../styles/ShoppingCart.css";
import { useSessionStorage } from "../hooks/useLocalStorage";

const ShopingCart = () => {
  const [css, setCss] = useState('anim-toggle-cart-start')
  const [isActiveCart, setActiveCart] = useState(false);
  const { cartState, cartDispatcher} = useContext(AppContext);
  const [productLength, setProductsLength] = useState(0);
  const { cart } = cartState;

  useSessionStorage('cart', cart, (storageCart) => { cartDispatcher({ type: 'SET_CART', payload: storageCart}) });

  const handleToggleCart = () =>{
    if(isActiveCart){
      setCss('anim-toggle-cart-start')
    }else{
      setActiveCart(true)
    }
  }

  useEffect(() => {
    setProductsLength(
      cart.reduce((previous, current) => previous + current.quantity, 0)
    );
  }, [cart]);

  const total = cart.reduce(
    (previous, current) => previous + current.quantity * current.price,
    0
  );

  return (
    <>
      <Button
        className="d-flex justify-content-center aling-items-center "
        variant="outline-primary px-4 me-lg-3 mx-1"
        onClick={() => handleToggleCart()}
      >
        <div className="position-relative">
          <div className="itemsInCart">{productLength}</div>
          <FaShoppingCart className="faShoppingCart" />
        </div>
      </Button>
      {isActiveCart && (
        <CartList
          cart={cart}
          cartDispatcher={cartDispatcher}
          total={total}
          productLength={productLength}
          isActiveCart={isActiveCart}
          setActiveCart={setActiveCart}
          handleToggleCart={handleToggleCart}
          setCss={setCss}
          css={css}
        />
      )}
    </>
  );
};

export default ShopingCart;
