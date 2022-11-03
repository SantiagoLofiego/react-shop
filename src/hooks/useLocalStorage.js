import { useEffect } from "react"

export const useSessionStorage = (key, state, updateCallBack ) => {
  const localStorage = window.sessionStorage;
  useEffect(()=>{
    const storageState = localStorage.getItem(key);
    if(storageState){
      updateCallBack(JSON.parse(storageState));
    }
  },[])
  useEffect(() =>{
    localStorage.setItem(key,JSON.stringify(state))
  },[state])
}