import React, { useContext, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useMountAnimation} from "../hooks/useMountAnimation"
import { OrderItem } from "../components/OrderItem";
import { AppContext } from "../context/AppContext";
import { useOrder } from "../hooks/useOrder";
import "../styles/checkout.css"

const Checkout = () => {
  const { id } = useParams();
  const { cartState, userState, cartDispatcher } = useContext(AppContext);
  const [disabled, setDisabled] = useState(false);
  const { order, status, error, orderId, confirm } = useOrder(cartState.cart, userState.user, cartDispatcher, id);
  const animated = useMountAnimation('anim-translateXstart', 'anim-translateXend');
  
  const navigate = useNavigate();
  const total = order.reduce(
    (previous, current) => previous + current.quantity * current.price,
    0
  );
  useEffect(() => {
    if (orderId) {
      navigate(`/checkout/${orderId}`)
    }
  }, [orderId, navigate])

  const handleConfirm = () => {
    setDisabled(true);
    confirm().then(() => setDisabled(false))
  }

  return (
    <div className={animated}>
      <h2 className="h2 display-6">Orden de compra</h2>
      {status ? <h3>{status}</h3>: ''}
      {orderId ? <h3 className="alert alert-success order-id">ID : {orderId}</h3> : ''}
      {error ? <h3>{error}</h3> : ''}
      {order.map(item => <OrderItem key={'orderItem' + item.fid} item={item} />)}
      <h3>Total ${total}</h3>
      {!orderId ?
        <>
          <button hidden={disabled} className="btn btn-primary m-2" onClick={handleConfirm}>Confirmar</button>
          {disabled?<Button variant="primary" disabled>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            Procesando
          </Button>
          :''}
        </>
        : ''
      }

    </div>
  )
}

export { Checkout }