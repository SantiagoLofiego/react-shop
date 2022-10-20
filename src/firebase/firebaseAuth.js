import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

const register = (email, password) => {
  return (
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response);
        return { ok: true }
      })
      .catch((error) => {
        const errorMessage = error.message;
        return { ok: false, errorMessage }
      })
  )
}

const login = (email, password) => {
  return (
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user
        return { ok: true, uid: user.uid, email, displayName: user.displayName }
      })
      .catch(error => {
        return { ok: false, errorMessage: error.message }
      })
  )
}

const authlogout = () => {
  signOut(auth)
    .then(resp => {
      console.log('Logged Out')
    })
    .catch(error => console.log('error'))
}

const updateUser = () => {
  updateProfile(auth.currentUser, { displayName: "Santi", photoURL: "https://example.com/jane-q-user/profile.jpg", alias: 'cuco' })
    .then((resp) => {
      console.log(resp)
    }).catch((error) => {
      console.log(error)
    });
  }

  export { register, login, authlogout, auth, updateUser }
