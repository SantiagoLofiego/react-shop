import React from "react";
import { ProductList } from "../containers/ProductList";
import { AppContext } from "../context/AppContext";
import { useProducts } from "../hooks/useProducts";
const Account = () => {
  const [products, loading] = useProducts();
  const {userState, loginWithEmailAndPassword, singUp, logout} = React.useContext(AppContext)
  const formData = {
    email: 'pepito@gmail.com',
    password: '123456'
  }


  return (
    <React.Fragment>
      <button onClick={()=>singUp(formData.email,formData.password)}>Registrarse</button>
      <button onClick={()=>loginWithEmailAndPassword(formData.email,formData.password)}>Login</button>
      <button onClick={logout}>Logout</button>
      {userState.checking? <h3>Verificando</h3>: null}
      {userState.user.email}
      {userState.error}
      {loading?<h2>Cargando ...</h2>:''}
      <ProductList products={products} />
    </React.Fragment>
  )
}

export {Account}