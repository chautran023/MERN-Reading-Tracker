import { StatsContainer, Loading, ChartsContainer } from '../../components'
import { useAppContext } from '../../context/appContext.js'
import { useEffect } from 'react'
const Stats = () => {
  const { isLoading, showStats, monthlyApplications} = useAppContext()
  useEffect(() => {
    showStats()
    // eslint-disable-next-line
  },[])
  if (isLoading) {
    return <Loading center/>
  }
  return (
    <div>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
      
    </div>
  )
}

export default Stats
