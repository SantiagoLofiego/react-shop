import React from "react";

const OrderItem = ({ item }) => {
  const setValues = item => {
    if (item.status === 'badStock') {
      return ({ style: 'alert alert-warning', message: `Solo ${item.actualStock} unidades disponibles` })
    } else if (item.status === 'ok') {
      return { style: 'alert alert-success', message: '' }
    } else if (item.status === 'error') {
      return { style: 'alert alert-danger', message: 'No existe este artículo' }
    }
    else return { style: 'alert alert-primary', message: '' };
  }
  const { style, message } = setValues(item);
  
  return (
    <div className={'order-item ' + style}>
      <h4 className="order-item-title">{item.title}</h4>
      <div className="order-item-body">
        <div className="order-item-image">
          <img className="order-item-img" src={item.image} alt="" />
        </div>
        <div className="order-item-details">
          <ul>
            <li>Precio unitario: ${item.price}</li>
            <li>cantidad: {item.quantity}</li>
          </ul>
        </div>
      </div>
      <h5 className="order-item-subtotal">Subtotal: $ {item.price * item.quantity}</h5>
      <div><span>{message}</span></div>
    </div>
  )
}

export { OrderItem }