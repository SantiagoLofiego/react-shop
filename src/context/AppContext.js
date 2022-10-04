import React, { useState } from "react";

const AppContext = React.createContext();

const ContextProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const productToAdd = {
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      quantity: 1,
    }
    const index = cart.findIndex(prod => prod.id === product.id);
    if (index > -1) {
      let newCart = [...cart];
      newCart[index].quantity++;
      setCart(newCart);
    } else {
      setCart([...cart, productToAdd]);
    }
  }


  return (
    <AppContext.Provider value={{ cart, addToCart }}>
      {children}
    </AppContext.Provider>
  )
}


export { AppContext, ContextProvider }