import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

async function getFirsoreDocs (collectionName){
  let documents=[];
  const data = await getDocs(collection(db, collectionName));
  data.forEach((doc) => {
    documents.push(doc.data());
  })
  return documents
}


export {getFirsoreDocs}