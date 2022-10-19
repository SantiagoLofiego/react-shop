import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import ProductDetail from '../components/ProductDetail';
import { getDocument } from '../firebase/firestore';

const ProductDetailContainer = () => {
    const [prod, setProd] = useState({});
    const {id} = useParams();
  
    useEffect(() => {

      async function getElementById(){

        try {
          const response = await getDocument('products', id);
          setProd(response); 
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