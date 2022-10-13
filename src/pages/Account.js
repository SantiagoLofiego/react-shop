import React, { useContext } from "react";
import { ProductList } from "../containers/ProductList";
import { AppContext } from "../context/AppContext";
import { useOrder } from "../hooks/useOrder";
import { useProducts } from "../hooks/useProducts";
const Account = () => {
  const [products, loading] = useProducts();
  const { userState, loginWithEmailAndPassword, singUp, logout, cartState, cartDispatcher } = useContext(AppContext)
  const { error, status, checkout } = useOrder();
  const formData = {
    email: 'pepito@gmail.com',
    password: '123456'
  }
  let total = 0;
  cartState.cart.forEach((item)=>total+= (item.quantity * item.price))
  const handleChekout = () => {
    checkout(cartState.cart, userState.user)
  }
  const add = (product) =>{
    cartDispatcher({type:'ADD_TO_CART', payload: product})
  }
  const remove = (product) =>{
    cartDispatcher({ type: 'REMOVE_FROM_CART', payload: product })
  }

  return (
    <React.Fragment>
      <button onClick={() => singUp(formData.email, formData.password)}>Registrarse</button>
      <button onClick={() => loginWithEmailAndPassword(formData.email, formData.password)}>Login</button>
      <button onClick={logout}>Logout</button>
      <br />
      <ol>
        {cartState.cart.map(item => {
          return <li key={item.fid}>
            {item.title} cantidad: <button onClick={()=>remove(item)}>-</button>{item.quantity}<button onClick={()=>add(item)}>+</button> precio ${item.price}
            <h5>subtotal $ {item.price * item.quantity}</h5>
          </li>
        })}
      </ol>
      <h3>TOTAL: ${total}</h3>
      <br />
      {status? <h3>{status}</h3>: ''}
      {error? <h3>{error}</h3> : ''}
      <br />
      <button onClick={handleChekout}>Comprar</button>
      {userState.checking ? <h3>Verificando</h3> : null}
      {userState.user.email}
      {userState.error}
      <ProductList products={products} />
    </React.Fragment>
  )
}

export { Account }