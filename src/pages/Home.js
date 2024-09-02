import React, { useContext, useEffect, useRef, useState } from 'react'
import Chart from './Chart'
import List from './List'
import Insert from './Insert'
import { MyContext } from '../MyContext'


// 내역추가에 금액 +10만원 +1만원 +5천원 버튼
// 리스트에 메세지 검색해서 내역 뽑기?
// 입금만 보기, 출금만보기
// 입금 건수, 출금 건수


export const Home = () => {
  const [popup, setPopup] = useState(false);

  const {data, setDateArr, setCurrentDate, type, setType , dataList, setDataList} = useContext(MyContext);

  let totalIn=0, totalOut=0;

  // 년 월 추출
  let dateFilter = {y:[], m:[]};

  data.forEach((v,i)=>{
    if (v.type === '수입') {
      totalIn += v.amount
    } else if (v.type === '지출') {
      totalOut += v.amount
    }

    let dateArr = v.date.split('.');
    dateFilter.y.push(dateArr[0]);
    dateFilter.m.push(dateArr[1]);
  })
  // 연도 sort 
  // 이슈: 2024년엔 02데이터가 없는데 어떻ㄱ ㅔ뿌려줘야하는지..??
  let year = [...new Set(dateFilter.y)].sort((a,b)=>b-a)
  let month = [...new Set(dateFilter.m)].sort((a,b)=>b-a)
  let totalAmount = (totalIn - totalOut);


  const yearRef = useRef();
  const monthRef = useRef();

  let formmDate='';

  // 데이터 필터링
  const handleDate = (e) => {
    let y = yearRef.current.value;
    let m = monthRef.current.value;
    formmDate = `${y}. ${m}`;

    let ext = data.filter(obj=>obj.date.includes(y) && obj.date.includes(m));

    if(e == '수입' || e == '지출'){
      ext = ext.filter(obj => obj.type === e);
    }
    
    setCurrentDate(y)
    setDataList(ext); 
    console.log(data);
  }
 
  useEffect(()=>{
    handleDate();
  },[])
  

  
  return (
    <div className='home'>
      <div>
        <div className='txt-wrap'>
          <p>자산 현황</p>
          <p className='total'>{totalAmount}원</p>
        </div>
        <div className='view-wrap'>
          <div className="select-wrap">
            <div className='selects'>
              <select name="year" id="year" defaultValue="2023" ref={yearRef} onChange={()=>{handleDate()}}>
                  {
                    year.map((v,i)=>(
                      <option key={i}>{v}</option>
                    ))
                  }
              </select>
              <select name="month" id="month" defaultValue="1" ref={monthRef} onChange={()=>{handleDate()}}>
                  {
                    month.map((v,i)=>(
                      <option key={i}>{v}</option>
                    ))
                  }
              </select>
            </div>
            <div className='sort-btn'>
              <button type='button' className='in-btn' onClick={()=>{handleDate('수입')}}>수입</button>
              <button type='button' className='out-btn' onClick={()=>{handleDate('지출')}}>지출</button>
            </div>
          </div>
          <div className='in-out-wrap'>
            <ul>
              <li className='in'>
                <p>수입</p>
                <p><span className='total'>{totalIn}</span>원</p>
              </li>
              <li className='out'>
                <p>지출</p>
                <p><span className='total'>{totalOut}</span>원</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <List formmDate={formmDate} dataList={dataList} setDataList={setDataList}/>
      <Chart />
      <div className='btn-wrap'>
        <button type='button' className='add-btn' onClick={()=>{setPopup(true)}}>내역 추가</button>
      </div>
      <Insert popup={popup} setPopup={setPopup} type={type} setType={setType}/>
    </div>
  )
}
