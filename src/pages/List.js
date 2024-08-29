import React, { useContext } from 'react'
import { MyContext } from '../MyContext'

const List = () => {
  
  const {data} = useContext(MyContext)

  // 데이터가 들어오지도 않았는데 부르려고하니 안나옴.
  // data.length가 있을때만 실행해라~
  const listItem = data.map((item, i) => {
    return item.items.length && item.items.map((subItem, j) => (
      <li key={subItem.id}>
        <div className='date-wrap'>
          <p className='date'>{item.year}. {subItem.date}</p>
          <p className='memo'>{subItem.memo}</p>
        </div>
        <p className={`amount ${subItem.type === '수입' ? "in" : "out"}`}>
          {subItem.type === '수입' ? "+" : "-"}{subItem.amount}
        </p>
      </li>
    ));
  });
  
  return (
    <div className='list'>
      <h2>연간내역</h2>
      <div className='list-wrap'>
        <ul>
          {listItem}
        </ul>
      </div>
    </div>
  )
}

export default List