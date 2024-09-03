import React, { useContext, useEffect } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { MyContext } from '../MyContext'

const Chart = () => {
  const {data, state, currentDate, setState } = useContext(MyContext)

    // 년도 데이터 추출
  let dataExt = data.filter(obj=>obj.date.includes(currentDate));

  //합산할 장소만들기
  const defaultValue = { in: 0, out: 0 };
  let total = new Array(13).fill().map(() => ({ ...defaultValue }));
  
  //수입 지출 합산
  dataExt.forEach((obj,a)=>{
      let dateArray = obj.date.split('.');
      for(let i=1; i<=12; i++){
          if(dateArray[1] == i){
              if(obj.type == "수입"){
                  total[i].in += obj.amount;
              }else{
                  total[i].out += obj.amount;
              }                
          }
      };
  });
  
  
  // 차트데이터 생성
  const chartData = total.slice(1).map((obj,i)=>{
    return {
            "id": (i + 1) + "월",      
            "in": obj.in,
            "out": obj.out,
           }
  })

  useEffect(()=>{
    setState(true);
    // setState(true); 밑에꺼랑 같은 말임...
    // setState((state)=>{return !state})
    
  },[])

  return (
    <>
      { state && 
        <div className='chart'>
          <h2>연간차트</h2>
          <ResponsiveBar
            data={chartData}
            keys={["in", "out"]}
            indexBy="id"
            margin={{ top: 40, right: 100, bottom: 80, left: 96 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'month',
                legendPosition: 'middle',
                legendOffset: 40,
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'amount',
                legendPosition: 'middle',
                legendOffset: -60,
                truncateTickAt: 0
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
          />
        </div>
      }
    </>
  )
}

export default Chart