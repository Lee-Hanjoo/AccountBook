import React, { useContext, useEffect } from 'react'
import { MyContext } from '../MyContext'

const List = () => {
  
  const {data, dataList } = useContext(MyContext)

  
  // 데이터가 들어오지도 않았는데 부르려고하니 안나옴.
  // data.length가 있을때만 실행해라~

  const listItem = dataList.map((item)=>{
      return <li key={item.id}>
                <div className='date-wrap'>
                  <p className='date'>{item.date}</p>
                  <p className='memo'>{item.memo}</p>
                </div>
                <p className={`amount ${item.type === '수입' ? "in" : "out"}`}>
                  {item.type === '수입' ? "+" : "-"}{item.amount}
                </p>
              </li>
    })

    return (
    <div className='list'>
      <h2>월간내역</h2>
      <div className={`list-wrap ${!dataList.length && 'no-data-box'}`}>
        {
          dataList.length ? (
            <ul>
              {listItem}
            </ul>
          ) : (
            <div className='no-data'>데이터가 없습니다.</div>
          )
        }
        
      </div>
    </div>
  )
}

export default List