import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { BsCartPlus} from 'react-icons/bs';

const AddToCartIcon = ({setAddIcon, addIcon}) => {
  const [animate, setAnimate] = useState('anim-addToCartIcon-start')

  const handleTransition = ()=> {
    if(addIcon){
      setAddIcon(false)
    }
  }

  useEffect(()=>{
    setTimeout(()=>{setAnimate('anim-addToCartIcon-end')}, 10)
    return (setAnimate('anim-addToCartIcon-start'))
  }, [])
  return (
    <div className={`addToCartIcon ${animate}`} onTransitionEnd={handleTransition}>
      <BsCartPlus />
    </div>
  );
}

export default AddToCartIcon;
