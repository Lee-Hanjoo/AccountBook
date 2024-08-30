import React, { useContext } from 'react'
import { MyContext } from '../MyContext'

const List = () => {
  
  const {data} = useContext(MyContext)

  // 데이터가 들어오지도 않았는데 부르려고하니 안나옴.
  // data.length가 있을때만 실행해라~
  const listItem = data.length && data.map((item)=>{
    return <li>
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
      <div className='list-wrap'>
        <ul>
          {listItem}
        </ul>
      </div>
    </div>
  )
}

export default List