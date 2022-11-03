import { useEffect, useState } from "react"

export const useMountAnimation = (startClass, endClass, dependecy=null) => {
  const [animate, setAnimate] = useState(startClass)
  useEffect(()=>{
    setTimeout(()=>{setAnimate(endClass)},50)
    
  },[dependecy, endClass])
  return animate
}