import React, { useContext } from "react";
import { OrderItem } from "../components/OrderItem";
import { AppContext } from "../context/AppContext";
import { useOrder } from "../hooks/useOrder";
import "../styles/checkout.css"

const Checkout = () => {
  const { cartState, userState } = useContext(AppContext);
  const { order, status, error, confirm } = useOrder(cartState.cart, userState.user);
  const total = order.reduce(
    (previous, current) => previous + current.quantity * current.price,
    0
  );

  const handleConfirm = ()=>{
    confirm()
  }

  console.log(order)
  
  return (
    <>
      <h2>Orden de compra</h2>
      {status ? <h3>{status}</h3> : ''}
      {error ? <h3>{error}</h3> : ''}
      {order.map(item => <OrderItem key={'orderItem' + item.fid} item={item} />)}
      <h3>Total ${total}</h3>
      <button className="btn btn-primary" onClick={handleConfirm}>Confirmar</button>
    </>
  )
}

export { Checkout }