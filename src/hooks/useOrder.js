import { useEffect, useState } from "react";
import { getDocument, updateDocument, addDocument } from "../firebase/firestore";

const useOrder = (cart, user, cartDispatcher, orderID) => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [order, setOrder] = useState([]);
  const [orderId, setOrderID] = useState(orderID);

  useEffect(() => { setError(null) }, [cart])

  useEffect(() => {
    /* const testCart = [{ title: 'Gafas Ray-Ban', fid: '5XMvyBtVfnF8Ziurnkim', quantity: 19,price:9800, image:"https://images.ray-ban.com/is/image/RayBan/805289126577_shad_fr.png?impolicy=SEO_1x1" },
    { title: 'Nutella', fid: 'QNRDmikwgKWG59aomaa6', quantity: 5, price: 490, image:"https://www.bigbasket.com/media/uploads/p/xxl/40102776-2_2-nutella-hazelnut-spread-with-cocoa.jpg" },
    { title: 'coca', fid: 'l7dD6TqekaNSiUZ2HVtJx', quantity: 6, price: 250, image:"https://carrefourar.vtexassets.com/arquivos/ids/220177/7790895000997_02.jpg?v=637704294205400000"  }] */
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

  async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


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
    await timeout(2000);
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