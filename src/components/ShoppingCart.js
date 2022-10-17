import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import { FaShoppingCart } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import "./ShoppingCart.css";

const ShopingCart = () => {
  const [isActiveCart, setActiveCart] = useState(false);
  const { cartState, cartDispatcher } = useContext(AppContext);
  const [productLength, setProductsLength] = useState(0);
  const { cart } = cartState;

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
        variant="outline-primary px-4 me-lg-3"
        onClick={() => setActiveCart(!isActiveCart)}
      >
        <div className="position-relative">
          <div className="itemsInCart">{productLength}</div>
          <FaShoppingCart className="faShoppingCart" />
        </div>
      </Button>
      {isActiveCart && (
        <div className="containerCart">
          <div className="cartHeader w-100 h-100">
            <h3>Detalle Carrito</h3>
            <h2
              className="closetCart"
              title="Cerrar"
              onClick={() => setActiveCart(!isActiveCart)}
            >
              X
            </h2>
          </div>
          {cart.length > 0 ? (
            <div className="bodyCart">
              {cart.map((prod, index) => {
                return (
                  <div className="productDetail" key={prod.id + index}>
                    <div className="divImg">
                      <img src={prod.image} alt="nutella" />
                    </div>
                    <h4 className="mx-3">{prod.title}</h4>
                    <div className="cantSubTotal">
                      <span
                        className="x closetCart"
                        title="Eliminar todos"
                        onClick={() => alert("se elimina este bloque...")}
                      >
                        X
                      </span>
                      <div>
                        <div className="counterProducts">
                          <h4 className="m-0" title="Cantidad de productos">
                            {prod.quantity}
                          </h4>
                          <div className="p-1">
                            <span
                              title="Agregar"
                              className="simbMas p-2"
                              onClick={() =>
                                cartDispatcher({
                                  type: "ADD_TO_CART",
                                  payload: prod,
                                })
                              }
                            >
                              +
                            </span>
                            <span
                              title="Eliminar uno"
                              className="simbMenos py-2 px-3"
                              onClick={() =>
                                cartDispatcher({
                                  type: "REMOVE_FROM_CART",
                                  payload: prod,
                                })
                              }
                            >
                              -
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>precio: {prod.price}</div>
                      <div>
                        x {prod.quantity} = {prod.price * prod.quantity}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="d-flex flex-column justify-content-center  aling-items-center">
                <h5 className="mt-3">Cantidad de productos: {productLength}</h5>
                <h2 className="pt-3">Total a pagar: </h2>
                <div className="tolalCart m-2 d-flex justify-content-center">
                  <h3 className="px-3 text-center w-100">${total}</h3>
                </div>
              </div>
              <Button
                className="mb-3"
                variant="primary"
                title="Confirma tu compra"
              >
                Confirmar compra
              </Button>
            </div>

          ) : (

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

          )}
        </div>
      )}
    </>
  );
};

export default ShopingCart;
