// MyContext.js
import axios from 'axios';
import React,{createContext, useEffect, useReducer} from 'react'

const MyContext = createContext();

const reducer = (state, action) => {
  switch(action.type){
    case 'post': return [...state, action.data];
    default: return action.data;
  }
}

// 내역추가에 금액 +10만원 +1만원 +5천원 버튼
// 리스트에 메세지 검색해서 내역 뽑기?

let Context = ({children}) => {

  const [data, dispatch] = useReducer(reducer, []);

  useEffect(()=>{
    axios.get("http://localhost:3031/list")
    .then(res=>dispatch({data:res.data}))
  },[])
  
  return(
    <MyContext.Provider value={{data,dispatch}}>
      {children}
    </MyContext.Provider>
  )
}

export {Context, MyContext}