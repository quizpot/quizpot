import React, { useId } from 'react'
import FancyCard from '../ui/fancy-card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

const StatCountChart = ({ 
  title, 
  data,
  chartConfig,
}: { 
  title: string, 
  data: { timestamp: Date, value: number }[],
  chartConfig: ChartConfig
}) => {
  const generatedId = useId().replace(/:/g, "")
  const gradientId = `fill-${generatedId}`

  return (
    <FancyCard className='flex flex-col gap-4 p-4'>
      <h1 className='text-2xl font-semibold'>{ title }</h1>
      <ChartContainer config={ chartConfig }>
        <AreaChart
          accessibilityLayer
          data={ data }
          margin={{
            left: 12,
            right: 12,
            top: 12,
            bottom: 12,
          }}
        >
          <CartesianGrid vertical={ false } />
          <XAxis
            dataKey="timestamp"
            tickLine={ false }
            axisLine={ false }
            tickMargin={ 8 }
            tickFormatter={(value) => value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          />
          <ChartTooltip
            cursor={ false }
            content={ <ChartTooltipContent indicator="line" /> }
          />
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <Area
            dataKey="value"
            type="monotone"
            fill={`url(#${gradientId})`}
            stroke="var(--color-value)"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </FancyCard>
  )
}

export default StatCountChart