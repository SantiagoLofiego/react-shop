import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OrderItem } from "../components/OrderItem";
import { AppContext } from "../context/AppContext";
import { useOrder } from "../hooks/useOrder";
import "../styles/checkout.css"

const Checkout = () => {
  const { cartState, userState, cartDispatcher } = useContext(AppContext);
  const { order, status, error, orderId, confirm } = useOrder(cartState.cart, userState.user, cartDispatcher);
  const navigate = useNavigate();
  const total = order.reduce(
    (previous, current) => previous + current.quantity * current.price,
    0
  );

  const handleConfirm = () => {
    confirm()
  }

  const handleModify = () => {
    navigate("/account")
  }


  return (
    <>
      <h2>Orden de compra</h2>
      {status ? <><h3>{status}</h3> {status === "Procesando compra" ? <span className="spinner-border text-primary"></span> : ''} </> : ''}
      {orderId?<h3 className="'alert alert-success'">ID : {orderId}</h3> : ''}
      {error ? <h3>{error}</h3> : ''}
      {order.map(item => <OrderItem key={'orderItem' + item.fid} item={item} />)}
      <h3>Total ${total}</h3>
      {status !== 'Orden completada' ?
      <>
      <button className="btn btn-primary" onClick={handleConfirm}>Confirmar</button>
      <button className="btn btn-primary" onClick={handleModify}>Modificar</button>
      </>
      : ''  
    }

    </>
  )
}

export { Checkout }