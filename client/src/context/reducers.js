import {DISPLAY_ALERT, CLEAR_ALERT, 
    REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, TOGGLE_SIDEBAR, LOGOUT_USER,
    UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR,
    HANDLE_CHANGE, CLEAR_VALUES,
    CREATE_ITEM_BEGIN, CREATE_ITEM_SUCCESS, CREATE_ITEM_ERROR, 
    GET_ITEMS_BEGIN, GET_ITEMS_SUCCESS,
    SET_EDIT_ITEM, DELETE_ITEM_BEGIN,
    EDIT_ITEM_BEGIN, EDIT_ITEM_SUCCESS, EDIT_ITEM_ERROR
} from './actions'
import { initialState } from './appContext'
const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {...state, 
            showAlert:true,
            alertType:'danger',
            alertText:'Vui lòng nhập tất cả trường thông tin!'
        }
    }
    if (action.type === CLEAR_ALERT) {
        return {...state, 
            showAlert:false,
            alertType:'',
            alertText:''
        }
    }
    //register
    if (action.type === REGISTER_USER_BEGIN) {
        return {...state, 
            isLoading:true,
        }
    }
    if (action.type === REGISTER_USER_SUCCESS) {
        return {...state, 
            isLoading:false,
            user:action.payload.user,
            token: action.payload.token,
            showAlert:true,
            alertType:'success',
            alertText:'Tài khoản người dùng tạo thành công! Đang chuyển trang...'
        }
    }
    if (action.type === REGISTER_USER_ERROR) {
        return {...state, 
            isLoading:false,
            showAlert:true,
            alertType:'danger',
            alertText:action.payload.msg,
        }
    }
    //login
    if (action.type === LOGIN_USER_BEGIN) {
        return {...state, 
            isLoading:true,
        }
    }
    if (action.type === LOGIN_USER_SUCCESS) {
        return {...state, 
            isLoading:false,
            user:action.payload.user,
            token: action.payload.token,
            showAlert:true,
            alertType:'success',
            alertText:'Đăng nhập thành công! Đang chuyển trang...'
        }
    }
    if (action.type === LOGIN_USER_ERROR) {
        return {...state, 
            isLoading:false,
            showAlert:true,
            alertType:'danger',
            alertText:action.payload.msg,
        }
    }
    if (action.type === TOGGLE_SIDEBAR) { 
        return {...state, 
            showSidebar:!state.showSidebar, 
        }
    }
    if (action.type === LOGOUT_USER) { 
        return {...initialState, 
            user:null,
            token:null,
        }
    }
    //update user
    if (action.type === UPDATE_USER_BEGIN) {
        return {...state, 
            isLoading:true,
        }
    }
    if (action.type === UPDATE_USER_SUCCESS) {
        return {...state, 
            isLoading:false,
            user:action.payload.user,
            token: action.payload.token,
            showAlert:true,
            alertType:'success',
            alertText:'Lưu thông tin thành công!'
        }
    }
    if (action.type === UPDATE_USER_ERROR) {
        return {...state, 
            isLoading:false,
            showAlert:true,
            alertType:'danger',
            alertText:action.payload.msg,
        }
    }
    //handle change
    if (action.type === HANDLE_CHANGE) {
        return {...state, 
            [action.payload.name]:action.payload.value
        }
    }
    //clear values
    if (action.type === CLEAR_VALUES) {
        const initialState = {
            isEditing:false,
            editItemId:'',
            itemName:'',
            author:'', 
            seller:'',
            genres:'văn học',
            status:'chưa đọc',
            purpose:'kiến thức',
        }
        return {...state, ...initialState }
    }
    //create item
    if (action.type === CREATE_ITEM_BEGIN) {
        return {...state, 
            isLoading:true,
        }
    }
    if (action.type === CREATE_ITEM_SUCCESS) {
        return {...state, 
            isLoading:false,
            showAlert:true,
            alertType:'success',
            alertText:'Thêm thành công'
        }
    }
    if (action.type === CREATE_ITEM_ERROR) {
        return {...state, 
            isLoading:false,
            showAlert:true,
            alertType:'danger',
            alertText:action.payload.msg,
        }
    }
    //get items
    if (action.type === GET_ITEMS_BEGIN) {
        return {...state, 
            isLoading:true,  
            showAlert:false,          
        }
    }
    if (action.type === GET_ITEMS_SUCCESS) {
        return {...state, 
            isLoading:false,
            items:action.payload.items,
            numOfItems:action.payload.numOfItems,
            numOfPages:action.payload.numOfPages,
        }
    }
    //SET_EDIT_ITEM
    if (action.type === SET_EDIT_ITEM) {
        const item = state.items.find((item) => item._id === action.payload.id)
        const {_id, itemName, author, seller, genres, status, purpose} = item
        return {...state, 
            isEditing:true,
            editItemId:_id,
            itemName, author, seller, genres, status, purpose
        }
    }
    //DELETE_ITEM_BEGIN
    if (action.type === DELETE_ITEM_BEGIN) {
        return {...state, 
            isLoading:true,
        }
    }
    //EDIT_ITEM
    if (action.type === EDIT_ITEM_BEGIN) {
        return {...state, 
            isLoading:true,
        }
    }
    if (action.type === EDIT_ITEM_SUCCESS) {
        return {...state, 
            isLoading:false,
            showAlert:true,
            alertType:'success',
            alertText:'Lưu thông tin thành công!'
        }
    }
    if (action.type === EDIT_ITEM_ERROR) {
        return {...state, 
            isLoading:false,
            showAlert:true,
            alertType:'danger',
            alertText:action.payload.msg,
        }
    }
    
    
 throw new Error(`no such action: ${action.type}`)
}

export default reducer
