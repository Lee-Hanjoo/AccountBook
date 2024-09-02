import { ResponsiveBar } from '@nivo/bar'
import { useContext, useEffect } from 'react';
import { Store } from '../t-AccountState';

function Chart() {
    let {data,currentDate} = useContext(Store);

    // 년도 데이터 추출
    let dataExt = data.filter(obj=>obj.date.includes(currentDate));

    //합산할 장소만들기
    const defaultValue = { income: 0, expense: 0 };
    let total = new Array(12).fill().map(() => ({ ...defaultValue }));
    
    //수입 지출 합산
    dataExt.forEach((obj,a)=>{
        let dateArray = obj.date.split('-');
        for(let i=1; i<=12; i++){
            if(dateArray[1] == i){                
                if(obj.type == "수입"){
                    total[i].income += Number(obj.money);
                }else{
                    total[i].expense += Number(obj.money);
                }                
            }
        };
    });

    // 차트데이터 생성
    let chartData = total.map((obj,i)=>{
        return {
                    "id": i+"월",      
                    "income": obj.income,
                    "expense": obj.expense,
               }
    })
   


  return (
    <>
        <h3 className='bg-slate-100 text-center p-2'>월별차트</h3>
        <div className='mx-auto  w-2/4 h-96'>
    
        <ResponsiveBar
            data={chartData}
            keys={['income','expense']}
            indexBy="id"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={["#99f","#fbb"]}

            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'fries'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'sandwich'
                    },
                    id: 'lines'
                }
            ]}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '월별 그래프',
                legendPosition: 'middle',
                legendOffset: 32,
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'start',
                legendOffset: -50,
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
            motionConfig="stiff"

            role="application"
            ariaLabel="Nivo bar chart demo"
            
        />
    
        </div>  
    </>  
   
  );
}

export default Chart;
