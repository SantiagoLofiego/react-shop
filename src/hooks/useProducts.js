import { useState, useEffect } from "react";
import { getAllDocuments } from "../firebase/firestore";


export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllDocuments('products')
      .then(documents => setProducts(documents))
      .then(()=>setLoading(false))
      .catch( error => console.log(error));
  }, [])

  return {products, loading};
}