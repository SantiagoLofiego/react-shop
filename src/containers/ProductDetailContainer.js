import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import ProductDetail from '../components/ProductDetail';
import { doc, getFirestore, getDoc} from 'firebase/firestore/lite';

const ProductDetailContainer = () => {
    const [prod, setProd] = useState([]);
    const {id} = useParams();
  
    useEffect(() => {

      async function getElementById(){

        try {
          const db = getFirestore();
          const item = doc(db, 'products', id);
      
          const response = await getDoc(item);
          setProd({id: response.id, ...response.data()});
        
        } catch (error) {
          
        }
        
      }

      getElementById();
    }, [id])
  return (
    <div>
        <ProductDetail className="bg-product" item={prod}/>
    </div>
  )
}

export default ProductDetailContainer