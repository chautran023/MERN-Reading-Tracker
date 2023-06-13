import React from 'react'
import {
  ResponsiveContainer,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ComposedChart,
  Legend
} from 'recharts';
const AreaChartComponent = ({data}) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
        <ComposedChart data={data} margin={{ top: 50, right: 5 }}>
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" allowDecimals={false}/>
            <YAxis yAxisId="right" orientation="right" allowDecimals={false} />

            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray='3 3' />

            <Area yAxisId="left" type="monotone" dataKey="total" fill='#faae16'  stroke="#ff7300" />
            <Area yAxisId="right"  type="monotone" dataKey="count" fill='#2dba30' stroke="#1db302" />

        </ComposedChart>

    </ResponsiveContainer>

  )
}

export default AreaChartComponent