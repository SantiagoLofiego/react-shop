import React from "react";
import "../styles/ShoppingCart.css";

const CartItem = ({ prod, cartDispatcher }) => {
  let { image, title, quantity, price } = prod;
  return (
    <div className="productDetail">
      <div className="divImg mx-md-3 mx-1">
        <img src={image} alt="nutella" />
      </div>
      <h4 className="mx-md-3 mx-1">{title}</h4>
      <div className="cantSubTotal mx-md-3 mx-1">
        <span
          className="x closetCart"
          title="Eliminar todos"
          onClick={() => cartDispatcher({type:'REMOVE_ALL', payload:prod})}
        >
          X
        </span>
        <div>
          <div className="counterpropsucts">
            <h4 className="m-0" title="Cantidad de propsuctos">
              {quantity}
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
        <div>precio: {price}</div>
        <div>
          x {quantity} = {price * quantity}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
