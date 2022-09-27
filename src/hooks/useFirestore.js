import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useFirebese } from "./useFirebase";

export const useFirestore = (dbCollection) => {
  const app= useFirebese();
  const db = getFirestore(app);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let data = [];
      setLoading(true);
      const response = await getDocs(collection(db, dbCollection));
      console.log(response.docs);
      response.forEach((doc) => {
        data.push(doc.data());
      })
      setDocuments(data);
      setLoading(false);
    }
    fetchData();
  },[dbCollection,db])

  return [documents, loading];
}