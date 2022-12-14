import React, { useReducer } from "react";
import { useAccount } from "../hooks/useAccount";
import { cartInitialState, cartReducer } from "../reducers/cartReducer";

const AppContext = React.createContext();

const ContextProvider = ({ children }) => {

  const [cartState, cartDispatcher] = useReducer(cartReducer, cartInitialState);
  const { userState, loginWithEmailAndPassword, singUp, logout, updateUser } = useAccount();


  return (
    <AppContext.Provider value={{ cartState, cartDispatcher, userState, loginWithEmailAndPassword, singUp, logout, updateUser }}>
      {children}
    </AppContext.Provider>
  )
}


export { AppContext, ContextProvider }