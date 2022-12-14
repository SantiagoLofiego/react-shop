import { collection, getDocs, addDoc, doc, updateDoc, getDoc, query, where, orderBy, setDoc } from "firebase/firestore";
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

async function addDocument(collectionName, data, id) {
  try {
    let response;
    if(!id){
      const ref = collection(db, collectionName);
      response = await addDoc(ref, data);
    }else{
      response = await setDoc(doc(db, collectionName, id), data)
    }
    return response
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getDocument(collectionName, docID) {
  try {
    const ref = doc(db, collectionName, docID);
    const document = await getDoc(ref, docID);
    return document.data();
  } catch (error) {
    throw new Error(error);
  }
}

async function updateDocument(collectionName, docID, data){
  try {
    const ref = doc(db,collectionName,docID);
    await updateDoc(ref,data);
    return `Document ${'docID'} updated`
  } catch (error) {
    throw new Error(error.message);
  }
}

async function simpleQuery(collectionName, param1, operator, param2, orderby){
  let documents =[];
  try {
    const collectionRef = collection(db,collectionName);
    const q = query(collectionRef, where(param1,operator,param2),orderBy(orderby,'desc'));
    const data = await getDocs(q);
    data.forEach((doc) => {
      const newDocument = { ...doc.data(), fid: doc.id };
      documents.push(newDocument);
    })
    return documents
  } catch (error) {
    throw new Error(error);
  }
}

export { getAllDocuments, getDocument, addDocument, updateDocument, simpleQuery }