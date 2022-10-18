import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductList } from "../containers/ProductList";
import { AppContext } from "../context/AppContext";
import { useProducts } from "../hooks/useProducts";

const Account = () => {
  const [products] = useProducts();
  const { userState, cartState, cartDispatcher } = useContext(AppContext)
  const navigate = useNavigate();

  let total = 0;
  cartState.cart.forEach((item) => total += (item.quantity * item.price))
  const handleChekout = () => {
    navigate("/checkout")
  }
  const add = (product) => {
    cartDispatcher({ type: 'ADD_TO_CART', payload: product })
  }
  const remove = (product) => {
    cartDispatcher({ type: 'REMOVE_FROM_CART', payload: product })
  }
  const emptyCart = () => {
    cartDispatcher({ type: 'EMPTY_CART' })
  }

  return (
    <React.Fragment>
      <br />
      <ol>
        {cartState.cart.map(item => {
          return <li key={item.fid}>
            {item.title} cantidad: 
            <button className="btn btn-primary ml-2" onClick={() => remove(item)}> - </button>
            {item.quantity}
            <button className="btn btn-primary ml-2" onClick={() => add(item)}> + </button> precio ${item.price}
            <h5>subtotal $ {item.price * item.quantity}</h5>
          </li>
        })}
      </ol>
      {cartState.cart.length > 0 ? <button className="btn btn-danger m-2" onClick={emptyCart}>Vaciar </button> : ''}
      <h3>TOTAL: ${total}</h3>
      <br />
      <button className="btn btn-success m-2" onClick={handleChekout}>Comprar</button>
      {userState.checking ? <h3>Verificando</h3> : null}
      <ProductList products={products} />
    </React.Fragment>
  )
}

export { Account }