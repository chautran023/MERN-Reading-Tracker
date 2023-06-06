import { useState } from 'react'
import {FormRow, Alert} from '../../components/index.js'
import { useAppContext } from '../../context/appContext.js'
import Wrapper from '../../assets/wrappers/DashboardFormPage.js'
const Profile = () => {
  const {user, showAlert, displayAlert, updateUser, isLoading} = useAppContext()
  const [name, setName] = useState(user && user.name)
  const [email, setEmail] = useState(user && user.email)
  const [lastName, setLastName] = useState(user && user.lastName)
  const handleSubmit = (e) => {
    e.preventDefault() 
    //Prevent error 400 from frontend. Instead delete this part & updateUser() it will work just fine.
    if(!email || !name || !lastName) {
      displayAlert()    
      return 
    } else {
      updateUser({name, email, lastName}) 
    }
  }

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Hồ sơ của bạn</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* Name input */}
          <FormRow 
            type='text'
            name='name'
            value={name}
            labelText='tên' 
            handleChange={(e) => setName(e.target.value)}
          /> 
          {/* Lastname input */}
          <FormRow 
            type='text'
            name='lastname'
            value={lastName}
            labelText='họ' 
            handleChange={(e) => setLastName(e.target.value)}
          /> 
          {/* Email input */}
          <FormRow 
            type='text'
            name='email'
            value={email}
            labelText='email' 
            handleChange={(e) => setEmail(e.target.value)}
          /> 
          <button type='submit' className="btn btn-block" disabled={isLoading}>
            {isLoading ? 'Đang lưu thông tin...' : 'Lưu thông tin'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile
