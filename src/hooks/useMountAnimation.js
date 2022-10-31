import { useEffect, useState } from "react"

export const useMountAnimation = (startClass, endClass, dependecy=null) => {
  const [animate, setAnimate] = useState(startClass)
  useEffect(()=>{
    setAnimate(endClass)
  },[dependecy, endClass])
  return animate
}