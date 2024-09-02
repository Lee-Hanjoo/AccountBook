// MyContext.js
import axios from 'axios';
import React,{createContext, useEffect, useReducer, useState} from 'react'

const MyContext = createContext();

/* countReducer = (oldCount, action) {
  if(action === 'up') {
    return oldCount + 1;
  } else if ()......
} */
const reducer = (state, action) => {
  switch(action.type){
    case 'post': return [...state, action.data];
    default: return action.init;
  }
}

let Context = ({children}) => {

  const [state, setState] = useState(false)
  const [currentDate,setCurrentDate] = useState(new Date().getUTCFullYear().toString());

  const [dataList,setDataList] = useState([]);
  const [type, setType] = useState('');
  // ** [count, countDispatch] = useReducer(countReducer, 0)
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(()=>{
    axios.get("http://localhost:3030/list")
    // dispatch를 이용해서 data를 업데이트 해주고있음.
    .then(res=>dispatch({init:res.data}))
  },[])

  // if가 실행되면 return꺼 실행되고 아래 return은 진행하지않음..
  if(!data.length) {return <div>데이터가 없습니다.</div>}
  
  let valueNames = {
    data, dispatch, state, setState, currentDate, setCurrentDate, dataList, setDataList, type, setType
  }

  


  return(
    <MyContext.Provider value={valueNames}>
      {children}
    </MyContext.Provider>
  )
}

export {Context, MyContext}