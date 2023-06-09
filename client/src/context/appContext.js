import React, {useState, useReducer, useContext, useEffect} from 'react'
import axios from 'axios'
import reducer from '../context/reducers'
import { DISPLAY_ALERT, CLEAR_ALERT, 
    REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, TOGGLE_SIDEBAR, LOGOUT_USER,
    UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, 
    HANDLE_CHANGE, CLEAR_VALUES,
    CREATE_ITEM_BEGIN, CREATE_ITEM_SUCCESS, CREATE_ITEM_ERROR, 
    GET_ITEMS_BEGIN, GET_ITEMS_SUCCESS,
    SET_EDIT_ITEM, DELETE_ITEM_BEGIN,
    EDIT_ITEM_BEGIN, EDIT_ITEM_SUCCESS, EDIT_ITEM_ERROR,
    SHOW_STATS_BEGIN, SHOW_STATS_SUCCESS
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
    isEditing:false,
    editItemId:'',
    itemName:'',
    author:'', 
    seller:'',
    genres:'văn học',
    status:'chưa đọc',
    purpose:'tăng kiến thức',
    genresOptions:['văn học','phi hư cấu','kịch','thơ','truyện dân gian' ],
    statusOptions:['chưa đọc','đang đọc','đã đọc'],
    purposeOptions:['tăng kiến thức','giải trí','giáo dục','sưu tầm'],
    items:[],
    numOfItems: 0, 
    numOfPages: 1,
    page:1,
    statStatus:{},
    monthlyApplications:[],
}
const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const authFetch = axios.create({
        baseURL: '/api/v1',
      });    
    // request interceptor
    authFetch.interceptors.request.use(
        (config) => {
            config.headers['Authorization'] = `Bearer ${state.token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    // response interceptor
    authFetch.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log(error.response);
            if (error.response.status === 401) {
                //Kick user out when no token is present
                logoutUser()
            }
            return Promise.reject(error);
        }
    );
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
    const updateUser = async (currentUser) => {
        dispatch({type:UPDATE_USER_BEGIN})
        try {
            const {data} = await authFetch.patch('/auth/updateUser',currentUser,)
            const {user, token, lastName} = data
            dispatch({
                type:UPDATE_USER_SUCCESS,
                payload:{user, token, lastName}
            })
            //local storage later (bearer)
            addUserToLocalStorage({user, token, lastName})
        } catch (e) {
            if(e.response.status !== 401) {
                dispatch({
                    type:UPDATE_USER_ERROR, 
                    payload: {msg: e.response.data.msg}
                })
            } 
        }   
        clearAlert()
    }
    const handleChange = ({name,value}) => {
        dispatch({type:HANDLE_CHANGE, payload: {name, value}})
    }
    const clearValues = () => {
        dispatch({type:CLEAR_VALUES})
    }
    const createItem = async () => {
        dispatch({type:CREATE_ITEM_BEGIN})
        try {
            const {itemName, author, seller, genres, status, purpose} = state
            await authFetch.post('/items', {
                itemName, author, seller, genres, status, purpose
            })
            dispatch({type:CREATE_ITEM_SUCCESS})
            dispatch({type:CLEAR_VALUES})
        } catch (e) {
            if(e.response.status === 401) return
            else {
                dispatch({
                type:CREATE_ITEM_ERROR, 
                payload: {msg: e.response.data.msg}
            })
            } 
        }
        clearAlert()
    }
    const getItems = async () => {    
        let url = '/items'
        dispatch({ type: GET_ITEMS_BEGIN });
        try {
          const { data } = await authFetch.get('/items');
          const { items, numOfItems, numOfPages } = data;
          dispatch({
            type: GET_ITEMS_SUCCESS,
            payload: {items, numOfItems, numOfPages},
          });
          console.log(data);
        } catch (e) {
          console.log(e.response);
          //logout the user
        }
        clearAlert();
    };
    const setEditItem = (id) => {
        dispatch({ type:SET_EDIT_ITEM, payload: {id} })
        console.log(`setEditItem ${id}`);
    }
    const editItem = async () => {
        dispatch({ type:EDIT_ITEM_BEGIN})
        try {
            const {itemName, author, seller, genres, status, purpose} = state
            await authFetch.patch(`/items/${state.editItemId}`, {
                itemName, author, seller, genres, status, purpose
            })
            dispatch({ type:EDIT_ITEM_SUCCESS})
            dispatch({ type:CLEAR_VALUES})
        } catch (e) {
            if(e.response.status !== 401) {
                dispatch({
                    type:EDIT_ITEM_ERROR, 
                    payload: {msg: e.response.data.msg}
                })
            }}
        clearAlert()
    }
    const deleteItem = async (itemId) => {
        dispatch({ type:DELETE_ITEM_BEGIN})
        try {
            await authFetch.delete(`/items/${itemId}`)
            getItems()
        } catch (e) {
            console.log(e.response);
            //logout the user  
        }
    }
    const showStats = async () => {
        dispatch({ type:SHOW_STATS_BEGIN})
        try {
            const {data} = await authFetch.get('/items/stats')
            dispatch({ 
                type:SHOW_STATS_SUCCESS, 
                payload: {
                statStatus: data.defaultStatStatus,
                monthlyApplications: data.monthlyApplications,
                }
            })
        } catch (e) {
            console.log(e.response);
            //logout the user  
        }
        clearAlert()
    }
     
    return (
        <AppContext.Provider value={{...state, displayAlert, registerUser, loginUser, toggleSidebar, logoutUser, updateUser, handleChange, clearValues, createItem, getItems, setEditItem, deleteItem, editItem, showStats}}>
            {children}
        </AppContext.Provider> )
}
const useAppContext = () => {
    return useContext(AppContext)
}
export {AppProvider, initialState, useAppContext}