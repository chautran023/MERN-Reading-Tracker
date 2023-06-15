import React from 'react'
import main from '../assets/images/main.png'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import {Link, Navigate} from 'react-router-dom'
import { useAppContext } from '../context/appContext'

const Landing = () => {
  const {user} = useAppContext()
  return (
    <>
    {user && <Navigate to='/' />}
    <Wrapper>
        <nav>
            <Logo />
        </nav>
        <div className='container page'>
            <div className='info'>
                <h1>reading <span> tracking</span> app</h1>
                <p>Bạn đang tìm cách theo dõi tất cả những cuốn sách bạn đã đọc, cải thiện tốc độ đọc và phát triển thói quen đọc lâu dài? Nếu vậy, bạn sẽ thích ứng dụng này. Nó giúp theo dõi việc đọc giúp bạn đạt được mục tiêu đọc của mình một cách dễ dàng; ghi lại tiến trình mua sách mới và quá trình đọc của bạn, đồng thời tạo thống kê và biểu đồ thông tin tuyệt vời. Đây sẽ là ứng dụng duy nhất dành cho những người yêu sách muốn đọc nhiều hơn và tận hưởng niềm vui khi làm việc đó. Trải nghiệm ngay hôm nay và khám phá niềm vui đọc sách!</p>
                {/* <p>Looking to keep track of all the books you've read, improve your reading speed, and develop lasting reading habits? If so, you will love this app. It helps you reach your reading goals easily; by recording your new book purchases and reading progress, and creates amazing statistics and infographics. This will be the only app for book lovers who want to read more and have fun doing it. Try it today and discover the joy of reading!</p> */}
                <Link to='/register' className='btn btn-hero'>Đăng nhập/Đăng ký</Link>
            </div>
            <img src={main} alt='job hunt' className='img main-img' />
        </div>
    </Wrapper>
    </>
  )
}

export default Landing


