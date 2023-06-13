import { useAppContext } from '../context/appContext'
import { BsFillCaretLeftFill , BsFillCaretRightFill} from 'react-icons/bs'

import Wrapper from '../assets/wrappers/PageBtnContainer'

const PageBtnContainer = () => {
    const { numOfPages, page, changePage } = useAppContext()
    const pages = Array.from({length: numOfPages}, (_,index) => {
        return index + 1
    })
    const nextPage = () => {
        let newPage = page + 1
        if (newPage > numOfPages) {
            newPage = 1
        }
        changePage(newPage)    }
    const prevPage = () => {
        let newPage = page - 1
        if (newPage < 1) {
            newPage = numOfPages
        }
        changePage(newPage)
    }

  return (
    <Wrapper>
        <button className='prev-btn' onClick={prevPage}>
            <BsFillCaretLeftFill />
            trước
        </button>
        <div className="btn-container">
            {pages.map((pageNo) => {
                return (
                    <button 
                        type='button' 
                        key={pageNo} 
                        className={pageNo === page ? 'pageBtn active' : 'pageBtn'}
                        onClick={() => changePage(pageNo)}
                    >
                        {pageNo}
                    </button> 
                )
            })}
        </div>
        <button className='next-btn' onClick={nextPage}>
            sau
            <BsFillCaretRightFill />
        </button>
    </Wrapper>
  )
}

export default PageBtnContainer
