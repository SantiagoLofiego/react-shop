import { useReducer } from "react";
import { authlogout, login, register } from "../firebase/firebaseAuth";
import { userInitialState, userReducer } from "../reducers/userReducer";

const useAccount = () => {
  const [userState, userDispatcher] = useReducer(userReducer, userInitialState)

  const loginWithEmailAndPassword = (email, password) => {
    userDispatcher({ type: 'CHECKING', payload: true })
    login(email, password)
      .then(({ ok, uid, displayName, errorMessage }) => {
        let newUser = {}
        if (ok) {
          newUser = {
            authenticated: true,
            uid,
            email,
            displayName,
          }
          userDispatcher({ type: 'LOGIN', payload: newUser });
        } else {
          userDispatcher({ type: 'ERROR', payload: errorMessage })
        }
        userDispatcher({ type: 'CHECKING', payload: false })
      })
  }

  const singUp = (email, passowrd) => {
    userDispatcher({ type: 'CHECKING', payload: true })
    register(email, passowrd)
      .then(({ ok, errorMessage }) => {
        if (ok) {
          loginWithEmailAndPassword(email, passowrd)
        } else {
          userDispatcher({ type: 'LOGOUT' })
          userDispatcher({ type: 'ERROR', payload: errorMessage })
          userDispatcher({ type: 'CHECKING', payload: false })
        }
      })
  }

  const logout = () => {
    authlogout();
    userDispatcher({ type: 'LOGOUT' })
  }


  return { userState, loginWithEmailAndPassword, singUp, logout }

}

export { useAccount }