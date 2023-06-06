import moment from 'moment';
import { FaCalendarAlt, FaRegHandPointRight} from 'react-icons/fa'
import {FiEdit, FiDelete} from 'react-icons/fi'
import {AiFillFolderOpen} from 'react-icons/ai'
import {MdSell} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Item.js'
import ItemInfo from './ItemInfo.js'

const Item = ({_id, itemName, author, seller, genres, status, purpose, createdAt}) => {
  const {setEditItem, deleteItem} = useAppContext()
  let date = moment(createdAt)
  date = date.format('Do MMM, YYYY')
  
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{itemName.charAt(0)}</div>
        <div className="info">
          <h5>{itemName}</h5>
          <p>{author}</p>
        </div>
        <footer>
          <div className="actions">
            <Link to='/add-item' className='btn edit-btn'  onClick={() => setEditItem(_id)}><FiEdit /></Link>
            <button type="button" className="btn delete-btn" onClick={() => deleteItem(_id)}><FiDelete/></button>
          </div>
        </footer>
      </header>
      <div className="content">
        <div className="content-center">
          <ItemInfo icon={<AiFillFolderOpen />} text={genres}></ItemInfo>
          <ItemInfo icon={<FaRegHandPointRight />} text={purpose}></ItemInfo>
          <ItemInfo icon={<MdSell />}text={seller}></ItemInfo>
          <ItemInfo icon={<FaCalendarAlt />} text={date}></ItemInfo>
          
            {(status === 'chưa đọc') &&
              <div className='status pending'>{status}</div>}
            
            {(status === 'đang đọc') &&
              <div className='status reading'>{status}</div>}
            
            {(status === 'đã đọc') &&
              <div className='status completed'>{status}</div>}
          
        </div>
      </div>
    </Wrapper>
  );
};

export default Item;