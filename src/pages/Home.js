import React, { useContext, useState } from 'react'
import Chart from './Chart'
import List from './List'
import Insert from './Insert'
import { MyContext } from '../MyContext'

export const Home = () => {
  const [popup, setPopup] = useState(false);

  const {data} = useContext(MyContext)

  return (
    <div className='home'>
      <div>
        <div className='txt-wrap'>
          <p>24년 자산 현황</p>
          <p className='total'>200,000원</p>
        </div>
        <div className='view-wrap'>
          <div class="select-wrap">
            <select name="select-year" id="year" defaultvalue="2024">
                <option value="2024">2024</option>
                <option value="2023">2023</option>
            </select>
            <select name="select-month" id="month" defaultvalue="1">
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
                <p className='total'>0원</p>
              </li>
              <li className='out'>
                <p>지출</p>
                <p className='total'>200원</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <List />
      <Chart />
      <div className='btn-wrap'>
        <button type='button' className='add-btn' onClick={()=>{setPopup(true)}}>내역 추가</button>
      </div>
      <Insert popup={popup} setPopup={setPopup}/>
    </div>
  )
}
