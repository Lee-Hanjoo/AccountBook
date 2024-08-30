import React, { useContext, useRef, useState } from 'react'
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

  const {data} = useContext(MyContext)

  let totalIn=0, totalOut=0;
  data.forEach((v,i)=>{
    if (v.type === '수입') {
      totalIn += v.amount
    } else if (v.type === '지출') {
      totalOut += v.amount
    }
  })
  let totalAmount = (totalIn - totalOut);

  const yearRef = useRef();
  const monthRef = useRef();

  let formmDate='';
  const handleDate = () => {
    let y = yearRef.current.value;
    let m = monthRef.current.value;
    formmDate = `${y}. ${m}`
  }
  
  return (
    <div className='home'>
      <div>
        <div className='txt-wrap'>
          <p>자산 현황</p>
          <p className='total'>{totalAmount}원</p>
        </div>
        <div className='view-wrap'>
          <div className="select-wrap">
            <select name="year" id="year" defaultValue="2023" ref={yearRef} onChange={()=>{handleDate()}}>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
            </select>
            <select name="month" id="month" defaultValue="1" ref={monthRef} onChange={()=>{handleDate()}}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
            </select>
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
      <List formmDate={formmDate}/>
      <Chart />
      <div className='btn-wrap'>
        <button type='button' className='add-btn' onClick={()=>{setPopup(true)}}>내역 추가</button>
      </div>
      <Insert popup={popup} setPopup={setPopup}/>
    </div>
  )
}
