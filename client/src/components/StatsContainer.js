import React from 'react'
import StatItem from './StatItem'
import { useAppContext } from '../context/appContext';
import { FcReading } from 'react-icons/fc';
import { LuBookOpenCheck, LuBookOpen } from 'react-icons/lu';


import Wrapper from '../assets/wrappers/StatsContainer';

const StatsContainer = () => {
const { statStatus } = useAppContext();

const defaultStatStatus = [
    {
      title: 'đang đọc',
      count: statStatus['đang đọc'] || 0,
      icon: <FcReading />,
     
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'chưa đọc',
      count: statStatus['chưa đọc'] || 0,
      icon: <LuBookOpen />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'đã đọc',
      count: statStatus['đã đọc'] || 0,
      icon: <LuBookOpenCheck />,
      color: '#06aa03',
      bcg: '#8df3ad', //see color and background corlor in Item Wrapper
    },
  ];
  return (
    <Wrapper>
        {defaultStatStatus.map((item,index) => {
            return (
                <StatItem key={index} {...item}/>
            )
        })}
    </Wrapper>
  )
}

export default StatsContainer