import {
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    ComposedChart,
    Tooltip,
    Legend,
    Line
  } from 'recharts';
const BarChartComponent = ({data}) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
        <ComposedChart data={data} margin={{ top: 50, right: 5 }}>
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" allowDecimals={false}/>
            <YAxis yAxisId="right" orientation="right" allowDecimals={false} />

            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray='3 3' />

            <Bar yAxisId="left" dataKey="count" fill='#2dba30' barSize={75} />
            <Line yAxisId="right"  type="monotone" dataKey="total" stroke="#ff7300" />

        </ComposedChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent