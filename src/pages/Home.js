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
  const [sortBtn, setSortBtn] = useState(false);

  const [availableMonths, setAvailableMonths] = useState([]);

  const {data, setDateArr, currentDate, setCurrentDate, type, setType , dataList, setDataList} = useContext(MyContext);

  let totalIn=0, totalOut=0;

  // 년 월 추출
  let dateFilter = {y:[], m:[]};

  const body = document.querySelector("body")
  
  if(popup) {
    body.style.cssText = "overflow:hidden;"
  } else {
    body.style.cssText = "overflow:auto;"
  }

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


  // 데이터 필터링
  const handleDate = (e) => {
    let y = yearRef.current.value;
    let m = monthRef.current.value;

    let ext = data.filter(obj=>obj.date.includes(y) && obj.date.includes(m));

    if(e == '수입' || e == '지출'){
      ext = ext.filter(obj => obj.type === e);
    }

    if(e == '수입') {
      setSortBtn('수입')
    } else if(e == '지출') {
      setSortBtn('지출')
    }

    ext.sort((a, b) => {
      const dateA = new Date(a.date.split('.').join('-'));
      const dateB = new Date(b.date.split('.').join('-'));
      return dateB - dateA;
    });
    
    setCurrentDate(y)
    setDataList(ext); 
  }

  const handleYearChange = (selectedYear) => {
    const filteredData = data.filter(item => item.date.includes(selectedYear));
    const uniqueMonths = [...new Set(filteredData.map(item => item.date.split('.')[1]))].sort((a,b)=>b-a);
    setAvailableMonths(uniqueMonths);
  };
 
  useEffect(()=>{
    handleDate();
    handleYearChange('2024')
  },[])
  

  
  return (
    <div className='home'>
      <div className={`dim ${popup ? 'on' : ''}`}></div>
      <div>
        <div className='txt-wrap'>
          <p>자산 현황</p>
          <p className='total'>{totalAmount}<span>원</span></p>
        </div>
        <div className='view-wrap'>
          <div className="select-wrap">
            <div className='selects'>
              <select name="year" id="year" ref={yearRef} onChange={(e)=>{handleDate(); handleYearChange(e.target.value);}}>
                  {
                    year.map((v,i)=>(
                      <option key={i} value={v}>{v}</option>
                    ))
                  }
              </select>
              <select name="month" id="month" ref={monthRef} onChange={()=>{handleDate()}}>
                {availableMonths.map((v, i) => (
                  <option key={i} value={v}>{v}</option>
                ))}
              </select>
            </div>
            <div className='sort-btn'>
              <button type='button' className={`in-btn ${sortBtn === '수입' ? 'on' : ''}`} onClick={()=>{handleDate('수입')}}>수입</button>
              <button type='button' className={`out-btn ${sortBtn === '지출' ? 'on' : ''}`} onClick={()=>{handleDate('지출')}}>지출</button>
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
      <List dataList={dataList} setDataList={setDataList}/>
      <Chart />
      <div className='btn-wrap'>
        <button type='button' className='add-btn' onClick={()=>{setPopup(true)}}>내역 추가</button>
      </div>
      <Insert popup={popup} setPopup={setPopup} type={type} setType={setType}/>
    </div>
  )
}
