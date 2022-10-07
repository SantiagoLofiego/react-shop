import React, { useReducer } from "react";
import { useAccount } from "../hooks/useAccount";
import { cartInitialState, cartReducer } from "../reducers/cartReducer";

const AppContext = React.createContext();

const ContextProvider = ({ children }) => {

  const [cart, cartDispatcher] = useReducer(cartReducer, cartInitialState);
  const { userState, loginWithEmailAndPassword, singUp, logout } = useAccount();


  return (
    <AppContext.Provider value={{ cart, cartDispatcher, userState, loginWithEmailAndPassword, singUp, logout }}>
      {children}
    </AppContext.Provider>
  )
}


export { AppContext, ContextProvider }