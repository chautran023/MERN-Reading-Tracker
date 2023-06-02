import Wrapper from "../assets/wrappers/ErrorPage"
import { Link } from "react-router-dom"
import img from "../assets/images/404.png"
const Error = () => {
  return (
    <Wrapper className='full-page'>
        <div>
            <img src={img} alt='not found' />
            <h3>Úiii! Không tìm thấy trang</h3>
            <p>Có vẻ chúng tôi không tìm thấy trang bạn đang tìm kiếm</p>
            <Link to='/'>Quay về Trang chủ</Link>
        </div>
    </Wrapper>
  )
}

export default Error
