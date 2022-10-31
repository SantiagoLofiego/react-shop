import React, { useState, useEffect } from "react";
import { BsDashCircleFill, BsPlusCircleFill, BsTrashFill } from "react-icons/bs";
import "../styles/ShoppingCart.css";

const CartItem = ({ prod, cartDispatcher }) => {
  let { image, title, quantity, price, stock } = prod;
  const [addDisabled, setAddDisabled] = useState(false)
  useEffect(() => {
    if (stock <= quantity) {
      setAddDisabled(true)
    } else {
      setAddDisabled(false)
    }
  }, [stock, quantity]);
  return (
    <>
      <h4 className="mx-md-3 mx-1 mb-1 align-self-center text-start">{title}</h4>
      <div className="productDetail">
        <div className="divImg mx-md-3 mx-1">
          <img src={image} alt={title} />
        </div>
        <div className="cantSubTotal mx-md-3 mx-1">
          <div className="p-1 d-flex">
            <span
              title="Quitar"
              className="simbMenos py-2 px-3 "
              onClick={() =>
                cartDispatcher({
                  type: "REMOVE_FROM_CART",
                  payload: prod,
                })
              }
            >
              <BsDashCircleFill />
            </span>
            <h4 className="m-0 d-inline align-self-center" title="Cantidad de propsuctos">
              {quantity}
            </h4>
            <span
              title="Agregar"
              className="simbMas py-2 px-3 "
              disabled={addDisabled}
              onClick={() =>
                cartDispatcher({
                  type: "ADD_TO_CART",
                  payload: prod,
                })
              }
            >
              <BsPlusCircleFill />
            </span>
          </div>
          <div>
            Precio: {price}
          </div>
          <div>
            Subtotal ${price * quantity}
          </div>
        </div>
        <div className=" p-2 btn-danger btn">
          <div
            className=" d-flex text-light justify-content-center h-100"
            title="Eliminar todos"
            onClick={() => cartDispatcher({ type: 'REMOVE_ALL', payload: prod })}
          >
            <BsTrashFill className="align-self-center" />
          </div>
        </div>
      </div>
    </>

  );
};

export default CartItem;
