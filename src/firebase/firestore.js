import { collection, getDocs, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

async function getAllDocuments(collectionName) {
  let documents = [];
  try {
    const ref = collection(db, collectionName);
    const data = await getDocs(ref);
    data.forEach((doc) => {
      const newDocument = { ...doc.data(), fid: doc.id };
      documents.push(newDocument);
    })
    return documents
  } catch (error) {
    throw new Error(error.message)
  }
}

async function addDocument(collectionName, data) {
  try {
    const ref = collection(db, collectionName);
    const response = await addDoc(ref, data);
    return response
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getDocument(collectionName, docID) {
  try {
    const ref = doc(db, collectionName, docID);
    const document = await getDoc(ref, docID);
    return document
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateDocument(collectionName, docID, data){
  try {
    const ref = doc(db,collectionName,docID);
    await updateDoc(ref,data);
    return `Document ${docID} updated`
  } catch (error) {
    throw new Error(error.message);
  }
}

export { getAllDocuments, getDocument, addDocument, updateDocument }