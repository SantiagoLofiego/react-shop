import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

const register = async (email, password) => {
  try {
    const response = await (await createUserWithEmailAndPassword(auth, email, password));
    const uid = response.user.uid;
    return { ok: true, uid }
  } catch (error) {
    return { ok: false, error:error.message }
  }
}

const login = async (email, password) => {
  try {
    const response = signInWithEmailAndPassword(auth, email, password);
    const user = (await response).user;
    return { ok: true, uid: user.uid, email, displayName: user.displayName, photoURL: user.photoURL, phone: user.phoneNumber }
  } catch (error) {
    return { ok: false, errorMessage: error.message }
  }
}

const authlogout = () => {
  signOut(auth)
    .then(resp => {
      console.log('Logged Out')
    })
    .catch(error => console.log(error))
}

const updateAuth = async (data) => {
  try {
    await updateProfile(auth.currentUser,data);
    return true
  } catch (error) {
    throw new Error(error);
  }
}

export { register, login, authlogout, auth, updateAuth }
