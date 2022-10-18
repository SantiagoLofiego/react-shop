import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OrderItem } from "../components/OrderItem";
import { AppContext } from "../context/AppContext";
import { useOrder } from "../hooks/useOrder";
import "../styles/checkout.css"

const Checkout = () => {
  const {id} = useParams();
  const { cartState, userState, cartDispatcher } = useContext(AppContext);
  const { order, status, error, orderId, confirm } = useOrder(cartState.cart, userState.user, cartDispatcher,id);
  const navigate = useNavigate();
  const total = order.reduce(
    (previous, current) => previous + current.quantity * current.price,
    0
  );
  useEffect(()=>{
    if (orderId){
      navigate(`/checkout/${orderId}`)
    }
  },[orderId, navigate])

  const handleConfirm = () => {
    confirm()
  }

  const handleModify = () => {
    navigate("/account")
  }


  return (
    <>
      <h2 className="h2 display-6">Orden de compra</h2>
      {status ? <><h3>{status}</h3> {status === "Procesando compra" ? <span className="spinner-border text-primary"></span> : ''} </> : ''}
      {orderId?<h3 className="alert alert-success order-id">ID : {orderId}</h3> : ''}
      {error ? <h3>{error}</h3> : ''}
      {order.map(item => <OrderItem key={'orderItem' + item.fid} item={item} />)}
      <h3>Total ${total}</h3>
      { !orderId ?
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