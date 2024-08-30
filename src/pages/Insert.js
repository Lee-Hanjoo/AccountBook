import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../MyContext';
import axios from 'axios';

const Insert = ({popup, setPopup }) => {

  const {data, dispatch } = useContext(MyContext);
  
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState();
  const [memo, setMemo] = useState('');
  const [type, setType] = useState('');
  
  const [newdata, setNewdata] = useState();
  
  let info = (e) => {
    setNewdata({id:Date.now(), date, amount, memo, type})
  }
  
  useEffect(()=>{
    // newdata에 값이 없으면 밑에꺼 실행하지마! 좋지않은 방법임..ㅠ
    if(!newdata) return;
    //                                     ,추가할놈
    axios.post("http://localhost:3030/list",newdata)
    // dispatch를 이용해서 data를 업데이트 해주고있음.
    .then(res=>dispatch({type: 'post', data:newdata}))
//   최초실행 막기.
  },[newdata])

  return (
    <div className={`insert ${popup ? 'on' : ''}`}>
      <h2>내역추가</h2>
      <ul>
        <li className='date'>
          <label for="date">날짜</label>
          <input type='text' id='date' placeholder='연도. 월. 일' onChange={(e)=>{setDate(e.target.value)}} />
        </li>
        <li className='amount'>
          <label for="amount">금액</label>
          <input type='text' id='amount' placeholder='금액' onChange={(e)=>{setAmount(parseInt(e.target.value))}} />
        </li>
        <li className='memo'>
          <label for="memo">메모</label>
          <input type='text' id='memo' placeholder='메모' onChange={(e)=>{setMemo(e.target.value)}}/>
        </li>
        <li className='radio-wrap'>
          <input type="radio" name="in-or-out" className='radio' id="in" onChange={(e)=>{setType('수입')}} />
          <label for="in"><i></i>수입</label>
          <input type="radio" name="in-or-out" className='radio' id="out" onChange={(e)=>{setType('지출')}} />
          <label for="out"><i></i>지출</label>
        </li>
      </ul>
      <div className='btn-wrap'>
        <button type='button' className='add-info' onClick={(e)=>{info(e); setPopup(false)}}>등록</button>
        <button type='button' className='close' onClick={()=>{setPopup(false)}}>취소</button>
      </div>
    </div>
  )
}

export default Insert