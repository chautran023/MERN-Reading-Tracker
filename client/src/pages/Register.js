import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import React from 'react';
import { Logo, FormRow, Alert} from '../components'
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';
const initialState = {
    name:'',
    email:'',
    password:'',
    isMember: true,
}

const Register = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState(initialState)
    // goi useAppContext() ra {tat ca state trong initialState va cac function dong goi gui di global}
    const {user, isLoading, showAlert, displayAlert, registerUser, loginUser} = useAppContext()
    const toggleMember = () => {
        setValues({...values, isMember:!values.isMember}) //viet ! de no tu switch giua true va false
    }
    const handleChange = (e) => {
        setValues({...values, [e.target.name]:e.target.value})
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const {name, email, password, isMember} = values
        if(!email || !password || (!isMember && !name)) {
            displayAlert()
            return
        }
        console.log(values) //se ra tat ca user input
        const currentUser = {name, email, password}
        if(isMember) {
            loginUser(currentUser) //loginUser(currentUser) from appContext
        } else {
            registerUser(currentUser)
        }
    }
    useEffect(() => {
        if(user) {
            setTimeout(() => { //ko can thiet setTimeout
                navigate('/')
            }, 3000)
        }
    }, [user, navigate])
    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmit}>
                <Logo />
                <h3>{values.isMember ? 'Đăng nhập' : 'Đăng ký'}</h3>
                {showAlert && <Alert />}
                {/* Name input */}
                {!values.isMember && (
                <FormRow 
                    type='text'
                    name='name'
                    value={values.name}
                    labelText='tên' 
                    handleChange={handleChange}
                />
                )}
                {/* Email input */}
                <FormRow 
                    type='email'
                    name='email'
                    value={values.email}
                    labelText='email' 
                    handleChange={handleChange}
                />
                {/* Password input */}
                <FormRow 
                    type='password'
                    name='password'
                    value={values.password}
                    labelText='mật khẩu' 
                    handleChange={handleChange}
                />
                {/* Submit button */}
                <button 
                    type='submit'
                    className='btn btn-block'
                    disabled={isLoading}>
                    gửi
                </button>
                {/* Test User button */}
                <button 
                    type='button'
                    className='btn btn-block btn-hipster'
                    disabled={isLoading}
                    onClick={() => loginUser({email:'testUser@test.com', password:'secret',})}
                    >
                    {isLoading ? 'Đang tải...' : 'Xem bản Demo'}
                </button>
                <p>
                    {values.isMember ? 'Bạn chưa đăng ký thành viên?' : 'Bạn là thành viên?'}
                    <button type='button' onClick={toggleMember} className='member-btn'>
                        {values.isMember ? 'Đăng ký' : 'Đăng nhập'}
                    </button>
                </p>
            </form>
        </Wrapper>
    )
}

export default Register
