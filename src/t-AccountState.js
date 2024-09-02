import { createContext, useEffect, useReducer, useState } from "react";
import axios from 'axios'
const Store = createContext();
const reducer = (state,action)=>{
    switch(action.t){
        case "post" : return [...state, action.addData]
        default: return action.init;
    }
}

const AccountState = ({children}) => {

  const [data, dispatch] = useReducer(reducer,[])
  const [currentDate,setCurrentDate] = useState(new Date().getUTCFullYear().toString());

  useEffect(()=>{
    axios.get("http://localhost:3030/list")
    .then(res=>{
        dispatch({init:res.data})
    })
  },[])

  if(!data.length) return <>로딩중...</>;

  let aaa = {
    data,dispatch,currentDate,setCurrentDate
  }

  return (
    <Store.Provider value={aaa}>
        {children}
    </Store.Provider>
  )
}

export {AccountState,Store}