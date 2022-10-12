import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const register = (email, password) => {
  return (
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response);
        return {ok:true}
      })
      .catch((error) => {
        const errorMessage = error.message;
        return {ok:false, errorMessage}
      })
  )
}

const login = (email, password) => {
  return (
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user= userCredential.user
        return {ok:true, uid: user.uid, email, displayName: user.displayName}
      })
      .catch(error => {
        return {ok:false, errorMessage: error.message}
      })
  )
}

const authlogout = () => {
  console.log(auth.currentUser);
  signOut(auth)
    .then(resp => {console.log('Logged Out')
    })
    .catch(error => console.log(error))
}


export { register, login, authlogout, auth }
