import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {
  ProtectedRoute,
  Error,
  Landing, 
  Register} from './pages'
import { AllItems, Profile, SharedLayout, Stats, AddItem } from './pages/dashboard/index'

function App() {
  return (
    <BrowserRouter>
    {/* <nav>
      <Link to='/'>Dashboard</Link>
      <Link to='/register'>Register</Link>
      <Link to='/landing'>Landing</Link>
    </nav> */}
      <Routes>
        <Route path='/' element={<ProtectedRoute><SharedLayout /></ProtectedRoute>}>
          <Route path='stats' element={<Stats />}/>
          <Route index='all-items' element={<AllItems />}/>
          <Route path='add-item' element={<AddItem />}/>
          <Route path='profile' element={<Profile />}/>
        </Route>
        <Route path='/register'element={<Register />}/>
        <Route path='/landing'element={<Landing />}/>
        <Route path='*'element={<Error />}/>
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
