import Wrapper from '../../assets/wrappers/SharedLayout'
import { Outlet, Link } from 'react-router-dom'
const SharedLayout = () => {
  return (
    <Wrapper>
      <nav>
        <Link to='stats'>Stats</Link>
        <Link to='all-items'>All</Link>
        <Link to='add-item'>Add</Link>
        <Link to='profile'>Profile</Link>
        <h1>Shared Layout</h1>
      </nav>
      <Outlet />
    </Wrapper>
  )
}

export default SharedLayout