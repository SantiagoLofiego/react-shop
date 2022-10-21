import { useReducer, useEffect } from "react";
import { authlogout, login, register, auth, updateUser} from "../firebase/firebaseAuth";
import { userInitialState, userReducer } from "../reducers/userReducer";

const useAccount = () => {
  const [userState, userDispatcher] = useReducer(userReducer, userInitialState)

  const loginWithEmailAndPassword = (email, password) => {
    userDispatcher({ type: 'CHECKING', payload: true })
    login(email, password)
      .then(({ ok, uid, displayName, errorMessage, photoURL, phone }) => {
        let newUser = {}
        if (ok) {
          newUser = {
            authenticated: true,
            uid,
            email,
            displayName,
            photoURL,
            phone
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
    userDispatcher({ type: 'LOGOUT' })
    authlogout();
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        const newUser = {
          authenticated: true,
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL:user.photoURL,
          phone: user.phoneNumber
        }
        userDispatcher({ type: 'LOGIN', payload: newUser });
      }
    })
    
  }, [])

  return { userState, loginWithEmailAndPassword, singUp, logout }

}

export { useAccount }