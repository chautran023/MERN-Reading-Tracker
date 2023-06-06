import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import Logo from './Logo'
import NavLinks from './NavLinks'
import { useAppContext } from '../context/appContext'

const BigSidebar = () => {
    const {showSidebar} = useAppContext()
    return (
        <Wrapper> 
            <div className={showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"}> {/* showSidebar by default is false >>> lam nguoc lai ben SmallSidebar */}
                <div className="content">
                    <header>
                        <Logo />
                    </header>
                    <NavLinks />
                </div>
            </div>
        </Wrapper>
    )
}

export default BigSidebar
