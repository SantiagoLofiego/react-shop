import { useState, useEffect } from "react";
import { getFirsoreDocs } from "../firebase/firestore";


export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getFirsoreDocs('products')
      .then(documents => setProducts(documents))
      .then(()=>setLoading(false))
      .catch( error => console.log(error));
  }, [])

  return [products, loading];
}