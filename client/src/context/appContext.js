import React, {useState, useReducer, useContext} from 'react'
import axios from 'axios'
import reducer from '../context/reducers'
import { DISPLAY_ALERT, CLEAR_ALERT, 
    REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, TOGGLE_SIDEBAR, LOGOUT_USER
} from './actions'

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
const initialState = {
    isLoading:false,
    showAlert:false,
    alertText:'',
    alertType:'',
    user:user ? JSON.parse(user) : null,
    token:token,
    showSidebar:false,
}
const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const displayAlert = () => {
        dispatch({type: DISPLAY_ALERT})
        clearAlert()
    }
    const clearAlert = () => {
        setTimeout(() => {
            dispatch({type: CLEAR_ALERT})
        }, 3000)
    }
    const addUserToLocalStorage = ({user, token}) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', JSON.stringify(token))
    }
    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }
    const registerUser = async (currentUser) => {
        dispatch({type:REGISTER_USER_BEGIN})
        try {
            const response = await axios.post('/api/v1/auth/register',currentUser) //currentUSer nay la input tu nguoi dung ben component Register
            console.log(response);
            const { user, token } = response.data // data nay la properties trong response tu server (authController, register request)
            dispatch({
                type:REGISTER_USER_SUCCESS,
                payload:{user, token}
            })
            //local storage later (bearer)
            addUserToLocalStorage({user, token})
        } catch (e) {
            console.log(e.response);
            dispatch({
                type:REGISTER_USER_ERROR, 
                payload: {msg: e.response.data.msg}
            })
        }
        clearAlert()
    }
    const loginUser = async (currentUser) => {
        dispatch({type:LOGIN_USER_BEGIN})
        try {
            const {data} = await axios.post('/api/v1/auth/login',currentUser)
            const { user, token, lastName } = data // data nay la properties trong response tu server (authController, login request)
            dispatch({
                type:LOGIN_USER_SUCCESS,
                payload:{user, token, lastName}
            })
            //local storage later (bearer)
            addUserToLocalStorage({user, token, lastName})
        } catch (e) {
            dispatch({
                type:LOGIN_USER_ERROR, 
                payload: {msg: e.response.data.msg}
            })
        }
        clearAlert()
    }
    const toggleSidebar = () => {
        dispatch({type:TOGGLE_SIDEBAR})
    }
    const logoutUser = () => {
        dispatch({type:LOGOUT_USER})
        removeUserFromLocalStorage() 
    }
    return (
        <AppContext.Provider value={{...state, displayAlert, registerUser, loginUser, toggleSidebar, logoutUser}}>
            {children}
        </AppContext.Provider> )
}
const useAppContext = () => {
    return useContext(AppContext)
}
export {AppProvider, initialState, useAppContext}