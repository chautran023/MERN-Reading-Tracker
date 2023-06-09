import BarChartComponent from './BarChart'
import AreaChart from './AreaChart'
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/ChartsContainer.js';
import { useState } from 'react';
const ChartsContainer = () => {
    const {monthlyApplications:data} = useAppContext()
    const [barChart, setBarChart] = useState(true)
    console.log(data)
  return (
    <Wrapper>
        <h4>Sách mua hàng tháng</h4>
        <button type='button'onClick={() => setBarChart(!barChart)}>
            {barChart ? 'Hiển thị Biểu đồ vùng' : 'Hiển thị Biểu đồ cột'}
        </button>
        {barChart ? <BarChartComponent data={data}/> : <AreaChart data={data}/>}
    </Wrapper>
  )
}

export default ChartsContainer
