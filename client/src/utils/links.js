import { IoStatsChartSharp } from 'react-icons/io5'
import { ImBook } from 'react-icons/im'
import { AiFillFileAdd } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'

const links = [
    {
        id:1,
        text:'Tủ sách',
        path:'/', //index path inside dashboard
        icon:<ImBook />
    },
    {
        id:2,
        text:'Thêm sách',
        path:'/add-item', 
        icon:<AiFillFileAdd />
    },
    {
        id:3,
        text:'Thống kê',
        path:'/stats', 
        icon:<IoStatsChartSharp />
    },
    {
        id:4,
        text:'profile',
        path:'/profile', 
        icon:<FaUserAlt />
    }
]
export default links