// MyContext.js
import axios from 'axios';
import React,{createContext, useEffect, useReducer, useState} from 'react'

const MyContext = createContext();

const reducer = (state, action) => {
  switch(action.type){
    case 'post': return [...state, action.data];
    default: return action.init;
  }
}

// 내역추가에 금액 +10만원 +1만원 +5천원 버튼
// 리스트에 메세지 검색해서 내역 뽑기?

let Context = ({children}) => {

  const [state, setState] = useState(false)
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(()=>{
    axios.get("http://localhost:3030/list")
    // dispatch를 이용해서 data를 업데이트 해주고있음.
    .then(res=>dispatch({init:res.data}))
  },[])

  // if가 실행되면 return꺼 실행되고 아래 return은 진행하지않음..
  if(!data.length) {return <div>데이터가 없습니다.</div>}
  
  let valueNames = {
    data, dispatch, state, setState
  }

  return(
    <MyContext.Provider value={valueNames}>
      {children}
    </MyContext.Provider>
  )
}

export {Context, MyContext}