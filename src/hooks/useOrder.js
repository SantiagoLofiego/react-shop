import { useEffect, useState } from "react";
import { getDocument } from "../firebase/firestore";

const useOrder = (cart, user) => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [order, setOrder] = useState([]);
  
  useEffect(() => {
    const testCart = [{ title: 'Gafas Ray-Ban', fid: '5XMvyBtVfnF8Ziurnkim', quantity: 19,price:9800, image:"https://images.ray-ban.com/is/image/RayBan/805289126577_shad_fr.png?impolicy=SEO_1x1" },
    { title: 'Nutella', fid: 'QNRDmikwgKWG59aomaa6', quantity: 5, price: 490, image:"https://www.bigbasket.com/media/uploads/p/xxl/40102776-2_2-nutella-hazelnut-spread-with-cocoa.jpg" },
    { title: 'coca', fid: 'l7dD6TqekaNSiUZ2HVtJx', quantity: 6, price: 250, image:"https://carrefourar.vtexassets.com/arquivos/ids/220177/7790895000997_02.jpg?v=637704294205400000"  }]
    let newOrder = [];
    for (const product of testCart) {
      const orderProd = { ...product, status: 'unchecked', actualStock: null }
      newOrder.push(orderProd);
    }
    setOrder(newOrder);
    console.log(newOrder);
  }, [cart])

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
    const { error, resultOrder } = await checkCartStock(order);
    setOrder(resultOrder)
    if(error){
      setError('Modifique su compra');
      setStatus(null)
      return
    }

    
    setStatus('Order completed')
  }

  const checkCredentials = (user) => {
    return user.authenticated ? true : false;
  }

  const checkProductStock = async (orderItem) => {
    try {
      const product = await getDocument('products', orderItem.fid);
      if (product.stock < orderItem.quantity) {
        return {...orderItem, status: 'badStock', actualStock: product.stock}
      } else {
        return {...orderItem, status: 'ok', actualStock: product.stock }
      }
    } catch (error) {
      return { ...orderItem, status: 'error'}
    }
  }

  const checkCartStock = async (order) => {
    let checkPromises = [];
    let resultOrder=[];
    let error = false;
    for (const product of order) {
      checkPromises.push(checkProductStock(product));
    }
    const responses = await Promise.all(checkPromises);
    for (const resp of responses) {
      if(resp.status !== 'ok'){
        error = true;
      }
      resultOrder.push(resp);
    }
    return { error: error, resultOrder: resultOrder}
  }

  const reset = () => {
    setError(null);
    setStatus(null)
  }

  return { error, status, confirm, order }
}

export { useOrder }