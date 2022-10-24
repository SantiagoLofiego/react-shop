import { useReducer, useEffect } from "react";
import { authlogout, login, register, auth, updateAuth } from "../firebase/firebaseAuth";
import { addDocument, getDocument, updateDocument } from "../firebase/firestore";
import { userInitialState, userReducer } from "../reducers/userReducer";

const useAccount = () => {
  const [userState, userDispatcher] = useReducer(userReducer, userInitialState)

  const loginWithEmailAndPassword = (email, password) => {
    userDispatcher({ type: 'CHECKING', payload: true });
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
          userDispatcher({ type: 'ERROR', payload: errorMessage });
        }
        userDispatcher({ type: 'CHECKING', payload: false });
      })
  }

  const singUp = (email, passowrd) => {
    userDispatcher({ type: 'CHECKING', payload: true })
    register(email, passowrd)
      .then(({ ok, errorMessage, uid }) => {
        if (ok) {
          addDocument('users', { uid, email }, uid)
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

  const updateUser = (data) => {
    userDispatcher({ type: 'CHECKING', payload: true });
    updateAuth({ data }).then(
      updateDocument('users', auth.currentUser.uid, data)
        .then(() => {
          userDispatcher({ type: 'UPDATE', payload: data});
          userDispatcher({ type: 'CHECKING', payload: false });
        })

    )
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const newUser = {
          authenticated: true,
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          phone: user.phoneNumber
        }
        getDocument('users', user.uid)
          .then(userData => {
            const completeUser = { ...newUser, ...userData }
            userDispatcher({ type: 'LOGIN', payload: completeUser });
          })
      }
    })

  }, [])

  return { userState, loginWithEmailAndPassword, singUp, logout, updateUser }

}

export { useAccount }