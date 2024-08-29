import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

const Chart = () => {
  const chartData = [
    {
      "id": "1월",
      "in": 8000,
      "out": 2000
    },
    {
      "id": "2월",
      "in": 4000,
      "out": 1000
    },
    {
      "id": "3월",
      "in": 2000,
      "out": 6000
    },
    {
      "id": "4월",
      "in": 1100,
      "out": 200
    },
    {
      "id": "5월",
      "in": 4000,
      "out": 1000
    },
    {
      "id": "6월",
      "in": 4000,
      "out": 1000
    },
    {
      "id": "7월",
      "in": 4000,
      "out": 1000
    },
    {
      "id": "8월",
      "in": 4000,
      "out": 1000
    },
    {
      "id": "9월",
      "in": 4000,
      "out": 1000
    },
    {
      "id": "10월",
      "in": 4000,
      "out": 1000
    },
    {
      "id": "11월",
      "in": 4000,
      "out": 1000
    },
    {
      "id": "12월",
      "in": 4000,
      "out": 1000
    }
  ]


  return (
    <div className='chart'>
      <h2>월별지출차트</h2>
      <ResponsiveBar
        data={chartData}
        keys={["in", "out"]}
        indexBy="id"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
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
            legend: 'month',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'amount',
            legendPosition: 'middle',
            legendOffset: -40,
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
  )
}

export default Chart