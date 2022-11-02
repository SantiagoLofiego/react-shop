import { useEffect, useState } from "react";
import { getDocument, updateDocument, addDocument } from "../firebase/firestore";

const useOrder = (cart, user, cartDispatcher, orderID) => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [order, setOrder] = useState([]);
  const [orderId, setOrderID] = useState(orderID);

  useEffect(() => { setError(null) }, [cart])

  useEffect(() => {
    let newOrder = [];
    if (!orderID && !error) {
      for (const product of cart) {
        const orderProd = { ...product, status: 'unchecked' }
        newOrder.push(orderProd);
      }
      setOrder(newOrder);
    } else if (orderID) {
      getDocument('orders', orderID).then((resp) => {
        const date = new Date(resp.date.seconds * 1000);
        setOrderID(orderID);
        setOrder(resp.items);
        setStatus(`Compra realizada el ${date.toLocaleDateString()} a las ${date.toLocaleTimeString()}`)
      })
    }
  }, [cart, error, orderID])

  const confirm = async () => {
    reset();
    setStatus('Procesando compra')
    if (order.length < 1) {
      setError('Carrito Vacio')
      setStatus(null)
      return
    }
    if (!checkCredentials(user)) {
      setError('Debe estar logueado para comprar');
      setStatus(null)
      return
    }
    const { error, resultOrder } = await checkOrderStock(order);
    setOrder(resultOrder)
    if (error) {
      setError('Modifique su compra');
      setStatus(null)
      return
    }
    const updated = await updateOrderStock(resultOrder);
    if (!updated) {
      setError('Hubo un problema con su compra');
      setStatus(null);
      return
    }
    const orderRef = await addOrder(resultOrder, user);
    setOrderID(orderRef.id);
    cartDispatcher({ type: 'EMPTY_CART' });
    setStatus('Orden completada');
  }

  const checkCredentials = (user) => {
    return user.authenticated ? true : false;
  }

  const checkProductStock = async (orderItem) => {
    try {
      const product = await getDocument('products', orderItem.fid);
      if (product.stock < orderItem.quantity) {
        return { ...orderItem, status: 'badStock', stock: product.stock }
      } else {
        return { ...orderItem, status: 'ok', stock: product.stock }
      }
    } catch (error) {
      return { ...orderItem, status: 'error' }
    }
  }

  const checkOrderStock = async (order) => {
    let checkPromises = [];
    let resultOrder = [];
    let error = false;
    for (const product of order) {
      checkPromises.push(checkProductStock(product));
    }
    const responses = await Promise.all(checkPromises);
    for (const resp of responses) {
      if (resp.status !== 'ok') {
        error = true;
      }
      resultOrder.push(resp);
    }
    return { error: error, resultOrder: resultOrder }
  }

  const updateProductStock = async (orderItem) => {
    const newStock = orderItem.stock - orderItem.quantity;
    const data = { stock: newStock}
    try {
      await updateDocument('products', orderItem.fid, data)
      return true
    } catch (error) {
      return error
    }
  }

  const updateOrderStock = async (order) => {
    let updatePromises = [];
    for (const item of order) {
      updatePromises.push(updateProductStock(item));
    }
    const responses = await Promise.all(updatePromises);
    for (const response of responses) {
      if (response !== true) {
        return false
      }
    }
    return true
  }

  const addOrder = async (order, user) => {
    let orderRef;
    const data = {
      buyerID: user.uid,
      email: user.email,
      date: new Date(),
      items: order
    }
    try {
      const ref = await addDocument('orders', data)
      orderRef = ref
    } catch (error) {
      console.log(error)
      //TODO manage error
    }
    return orderRef;
  }

  const reset = () => {
    setError(null);
    setStatus(null)
  }

  return { error, status, confirm, order, orderId }
}

export { useOrder }