import React, { useContext } from 'react'
import { MyContext } from '../MyContext';
import axios from 'axios';

const Insert = ({popup, setPopup }) => {

  const {data, dispatch } = useContext(MyContext);

  let info = (e) => {
    console.log("data", data);
    dispatch({init:data})
  }

  return (
    <div className={`insert ${popup ? 'on' : ''}`}>
      <h2>내역추가</h2>
      <ul>
        <li className='date'>
          <label for="date">날짜</label>
          <input type='text' id='date' placeholder='연도. 월. 일' />
        </li>
        <li className='amount'>
          <label for="amount">금액</label>
          <input type='text' id='amount' placeholder='금액' />
        </li>
        <li className='memo'>
          <label for="memo">메모</label>
          <input type='text' id='memo' placeholder='메모' />
        </li>
        <li className='radio-wrap'>
          <input type="radio" name="in-or-out" className='radio' id="in" />
          <label for="in"><i></i>수입</label>
          <input type="radio" name="in-or-out" className='radio' id="out" />
          <label for="out"><i></i>지출</label>
        </li>
      </ul>
      <div className='btn-wrap'>
        <button type='button' className='add-info' onClick={(e)=>{info(e)}}>등록</button>
        <button type='button' className='close' onClick={()=>{setPopup(false)}}>취소</button>
      </div>
    </div>
  )
}

export default Insert