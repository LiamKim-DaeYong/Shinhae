import { post } from '../../utils/api';
import { Alert } from 'react-native';

const initialState = {
    isLoading: false,
    isLogined: false,
    userId: null,
    password: null,
    uniqId: null,
    token: null,
    userName: null,
    checkBox: false
};


const INIT_PAGE = 'LoginState/INIT_PAGE';

const SET_ID = 'LoginState/SET_ID';
const SET_PASSWORD = 'LoginState/SET_PASSWORD';
const SET_CHECKBOX = 'LoginState/SET_CHECKBOX';

const START_LOGIN = 'LoginState/START_LOGIN';
const LOGIN_SUCCESS = 'LoginState/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LoginState/LOGIN_FAILURE';
const HTTP_ERROR = 'LoginState/HTTP_ERROR';

const LOGOUT = 'LoginState/LOGOUT';

let navi = null;

function initPage() {
    return {
        type: INIT_PAGE
    }
}

function loginSuccess(data) {
    return {
        type: LOGIN_SUCCESS,
        data
    }
}

function loginFailure() {
    Alert.alert("아이디 및 패스워드를 확인해 주세요");
    return {
        type: LOGIN_FAILURE
    }
}

function httpError() {
    Alert.alert("네트워크 장애, 잠시 후에 다시 시도해 주세요.");
    return {
        type: HTTP_ERROR
    }
}

export function checkLogin(navigation) {    
    navi = navigation;

    return (dispatch, getState) => {
        if(getState().login.checkBox===true) {
            if(getState().login.userId!==null && getState().login.password!==null && getState().login.token!==null) {
                dispatch(login());
            } else {
                dispatch(initPage());
            }
        } else {
            dispatch(initPage());
        }
    }
}

export function setId(userId) {
    return { 
        type: SET_ID,
        userId
    };
}

export function setPassword(password) {
    return { 
        type: SET_PASSWORD,
        password
    };
}

export function setCheckBox() {
    return { 
        type: SET_CHECKBOX,        
    };
}

function startLogin() {
    return {
        type: START_LOGIN
    };
}

function submit() {
    const path = '/signin';    
    
    return (dispatch, getState) => {
        const body = {
            userId: getState().login.userId,
            password: getState().login.password,
        };
            
        post(path, body)
            .then((response) => {
                if(response.data.result===true) {
                    dispatch(loginSuccess(response.data));

                    navi.navigate("Tab");
                        
                    navi.reset({
                        index: 0,
                        routes: [{ name: 'Tab' }],
                    });
                } else {
                    dispatch(loginFailure())
                }
            })
            .catch((error) => {
                dispatch(httpError());
            })
    }
}

export function login() {
    return (dispatch, getState) => {
        if(getState().login.userId===null) {
            Alert.alert("아이디를 입력해 주세요.");
            return false;
        }
        
        if(getState().login.password===null) {
            Alert.alert("패스워드를 입력해 주세요.");
            return false;
        }
        
        dispatch(startLogin());
        dispatch(submit());
    }
}

export function logout() {
    return { 
        type: LOGOUT
    };
}

export default function LoginStateReducer(state = initialState, action = {}) {
    switch (action.type) {
        case INIT_PAGE:
            return state=initialState;
        case SET_ID:
            return Object.assign({}, state, {
                userId: action.userId,
            });
        case SET_PASSWORD:
            return Object.assign({}, state, {
                password: action.password,
            });
        case SET_CHECKBOX:
            return Object.assign({}, state, {
                checkBox: !state.checkBox,
            });
        case START_LOGIN:
            return Object.assign({}, state, {
                isLoading: true
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                isLogined: true,
                userId: action.data.userId,
                token: 'Bearer ' + action.data.token,
                userName: action.data.userName
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
                isLogined: false
            });
        case HTTP_ERROR:
            return Object.assign({}, state, {
                isLoading: false,
                error: true,
                password: null
            });
        case LOGOUT:
            return Object.assign({}, state, {
                isLogined: false,
                userId: null,
                password: null,
                userName: null,
                token: null,
                checkBox: false
            });
        default:
            return state;
    }    
}