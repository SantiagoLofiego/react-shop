import React from 'react'

const CartTotal = ({productLength, total}) => {
  return (
    <div className="d-flex flex-column justify-content-center  aling-items-center">
      <h5 className="mt-3">Cantidad de productos: {productLength}</h5>
      <h2 className="pt-3">Total a pagar: </h2>
      <div className="tolalCart m-2 d-flex justify-content-center">
        <h3 className="px-3 text-center w-100">${total}</h3>
      </div>
    </div>
  );
}

export default CartTotal;