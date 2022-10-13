import { useState } from "react";
import { getDocument, addDocument, updateDocument } from "../firebase/firestore";

const useOrder = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const testCart= [{title:'gafas', fid:'5XMvyBtVfnF8Ziurnkimx', quantity:10},{title:'nutella',fid:'QNRDmikwgKWG59aomaa6', quantity:5},{title:'coca',fid:'l7dD6TqekaNSiUZ2HVtJ', quantity:6}]


  const checkout = async (cart, user) => {
    setStatus('Processing')
    reset();
    if (cart.length < 1) {
      setError('Cart is empty')
      setStatus(null)
      return
    }
    if (!checkCredentials(user)) {
      setError('You must be logged in to checkout');
      setStatus(null)
      return
    }
    const stockStatus = await checkCartStock(cart);
    if(stockStatus==='error'){
      setStatus('Error');
      setError('Error en alguno de los items del carrito')
      return
    }else if(!stockStatus){
      setStatus('Error');
      setError('Alguno de los items no tiene suficiente stock')
      return
    }
    setStatus('Order completed')
  }

  const checkCredentials = (user) => {
    return user.authenticated ? true : false;
  }

  const checkProductStock = async (pordID, ammount) => {
    try {
      const product = await getDocument('products', pordID);
      if (product.stock < ammount) {
        return false
      } else {
        return true
      }
    } catch (error) {
      console.log('invlaid fID')
      return 'error'
    }
  }

  const checkCartStock = async (cart)=>{
    let checkPromises=[];
    let error=null;
    let result=true;
    for (const product of cart) {
      checkPromises.push(checkProductStock(product.fid,product.quantity));
    }
    const responses = await Promise.all(checkPromises);
    console.log(responses)
    for (const resp of responses) {
      if(resp ==='error'){
        error = resp
      }else if(!resp){
        result= false;
      }
    }

    if(error){
      return error
    }
    return result
  }

  const reset = () => {
    setError(null);
    setStatus(null)
  }

  return { error, status, checkout }
}

export { useOrder }