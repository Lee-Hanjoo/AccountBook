import React, { useContext, useEffect, useRef, useState } from 'react'
import { Store } from '../t-AccountState';

const AccountList = () => {
  const yearRef = useRef(), monthRef = useRef();

  const {data,setCurrentDate} = useContext(Store);
  const [dataList,setDataList] = useState([]);

  //년월 추출
  let dateExtract = {y:[], m:[]};
  data.forEach((obj)=>{
    let dateArray = obj.date.split('-');
    dateExtract.y.push(dateArray[0])
    dateExtract.m.push(dateArray[1])
  })
  let year =  [...new Set(dateExtract.y)].sort((a,b)=>b-a);
  let month = [...new Set(dateExtract.m)];



  //데이터 필터링
  let dataFilter = function(t){

    const y=yearRef.current.value, 
          m=monthRef.current.value;
    
    let ext = data.filter(obj=>obj.date.includes(y) && obj.date.includes(m));

    if(t=='수입' || t=='지출'){
      ext = data.filter(obj=>obj.type.includes(t) && obj.date.includes(y));
    }
    
    setCurrentDate(y)
    setDataList(ext); 
  }



  
  useEffect(()=>{
    dataFilter();
  },[])
  

  return (
    <>
        <select ref={yearRef} onChange={dataFilter}>
            {
                year.map((obj,i)=>
                    <option key={i}>{obj}</option>
                )
            }
        </select>
        <select ref={monthRef} onChange={dataFilter}>
            {
                month.map((obj,i)=>
                    <option key={i}>{obj}</option>
                )
            }
        </select>
        <button onClick={()=>dataFilter('수입')}>수입 리스트</button>
        <button onClick={()=>dataFilter('지출')}>지출 리스트</button>

        {
            dataList.map((obj,i)=>
                <div key={i}>{obj.type}) {obj.money}원 - {obj.date}</div>
            )
        }
    </>

  )
}

export default AccountList