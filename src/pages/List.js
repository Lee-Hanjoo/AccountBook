import React, { useContext } from 'react'
import { MyContext } from '../MyContext'

const List = () => {
  
  const {data} = useContext(MyContext)

  console.log(data);
  return (
    <div>
      <h2>연간내역</h2>
      <div className='list-wrap'>
        <ul>
          <li>
            <div className='date-wrap'>
              <p className='date'>2024. 08. 27</p>
              <p className='memo'>서브웨이 강남점</p>
            </div>
            <p className='amount in'>+ 1,000</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default List