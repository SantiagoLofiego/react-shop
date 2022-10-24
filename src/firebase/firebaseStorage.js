import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

const uploadFile = async (fileName, file, user) =>{
  const storageRef = ref(storage, `/${user.uid}/${fileName}`);
  try {
    const response = await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return {response, url}
  } catch (error) {
    return (error)
  }
}


export { uploadFile }