import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";

const CartEmpty = ({ setActiveCart }) => {
  return (
    <div className="d-flex flex-column justify-content-center  aling-items-center cartEmty">
      <h4 className="mt-5">Carrito vacio</h4>
      <img
        className="w-50 align-self-center mt-4"
        src="https://d3tvemk8zf61cc.cloudfront.net/empty_cart_icon.png"
        alt="vacio"
      />
      <LinkContainer to="/">
        <Button
          className="m-3 w-50 align-self-center"
          variant="primary"
          title="Confirma tu compra"
          onClick={() => setActiveCart(false)}
        >
          Ver productos
        </Button>
      </LinkContainer>
    </div>
  );
};

export default CartEmpty;
