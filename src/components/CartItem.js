import React from "react";
import "../containers/ShoppingCart.css";

const CartItem = ({prod, cartDispatcher}) => {
    let {image, title, quantity, price} = prod;
  return (
    <div className="productDetail">
      <div className="divImg">
        <img src={image} alt="nutella" />
      </div>
      <h4 className="mx-3">{title}</h4>
      <div className="cantSubTotal">
        <span
          className="x closetCart"
          title="Eliminar todos"
          onClick={() => alert("se elimina este bloque...")}
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
