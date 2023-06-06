import React from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import { GrTextAlignLeft } from 'react-icons/gr'
import { FaUserAlt} from 'react-icons/fa'
import { BsFillCaretDownFill } from 'react-icons/bs'
import { useAppContext } from '../context/appContext'
import { useState } from 'react'
import Logo from './Logo'
const Navbar = () => {
    const {toggleSidebar, logoutUser, user} = useAppContext()
    const [showLogout, setShowLogout] = useState(false)
    return (
        <Wrapper>
            <div className='nav-center'>
                <button type='button' className='toggle-btn' onClick={toggleSidebar}>
                    <GrTextAlignLeft />
                </button>
                <div>
                    <Logo />
                    <h3 className='logo-text'>dashboard</h3>
                </div>
                <div className='btn-container'>
                    <button type='button' className='btn' onClick={() => setShowLogout(!showLogout)}>
                        <FaUserAlt />
                        Chào, {user && user.name}
                        <BsFillCaretDownFill />
                    </button>
                    <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                        <button type='button' className='dropdown-btn' onClick={logoutUser}>
                            Logout
                        </button>
                    </div>
                </div> 
            </div>
        </Wrapper>
    )
}

export default Navbar
