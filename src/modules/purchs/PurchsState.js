import { post } from '../../utils/api';
import { Alert } from 'react-native';

const initialState = {
    isLoading: false,
    error: false,
    purchsList: [],
    filterVisible: false,
    dateFilterList: ['전체', '발주일', '납기일', '입고일'],
    dateFilter: 0,
    startDate: '',
    endDate: '',
    searchKeyword: '',
    pageIndex: 1
};

const INIT_PAGE = 'PurchsState/INIT_PAGE';
const START_LIST_LOADING = 'PurchsState/START_LIST_LOADING';
const LIST_LOADED = 'PurchsState/LIST_LOADED';
const CLEAR_LIST = 'PurchsState/CLEAR_LIST';
const HTTP_ERROR = 'PurchsState/HTTP_ERROR';

const FILTER_OPEN = 'PurchsState/FILTER_OPEN'
const SELECT_DATE_FILTER = 'PurchsState/SELECT_DATE_FILTER';
const SET_STARTDATE = 'PurchsState/SET_STARTDATE';
const SET_ENDDATE = 'PurchsState/SET_ENDDATE';
const SET_SEARCHKEYWORD = 'PurchsState/SET_SEARCHKEYWORD';

const SEARCH = 'PurchsState/SEARCH';

function initPage() {
    return {
        type: INIT_PAGE
    }
}

function startListLoading() {
    return {
        type: START_LIST_LOADING
    }
}

function listLoaded(response) {
    return {
        type: LIST_LOADED,
        response
    };
}

function clearList() {
    return { 
        type: CLEAR_LIST
    };
}

function httpError() {
    return {
        type: HTTP_ERROR
    }
}

function search() {
    return {
        type: SEARCH
    }
}

export function filterOpen() {
    return {
        type: FILTER_OPEN,
    }
}

export function selectDateFilter(key) {
    return {
        type: SELECT_DATE_FILTER,
        key     
    };
}

export function changeStartDate(date) {
    return {
        type: SET_STARTDATE,
        date
    }
}

export function changeEndDate(date) {
    return {
        type: SET_ENDDATE,
        date
    }
}

export function changeSearchKeyword(keyword) {
    return {
        type: SET_SEARCHKEYWORD,
        keyword
    }
}

function loadList() {
    const path = '/selectWrhousngList';

    return (dispatch, getState) => {
        dispatch(startListLoading());

        const body = {
            searchCondition: getState().purchs.dateFilter,
            startDate: getState().purchs.startDate,
            endDate: getState().purchs.endDate,
            searchKeyword: getState().purchs.searchKeyword,
            pageIndex: getState().purchs.pageIndex,
        };

        post(path, body, getState().login.token)
            .then((response) => {
                if(response.data.result === true) {
                    dispatch(listLoaded(response.data));
                } else {
                    dispatch(httpError());
                }
            })
            .catch((error) => {
                dispatch(httpError());
            })
    }
}

export function getList() {
    return dispatch => {
        dispatch(initPage());
        dispatch(startListLoading());
        dispatch(loadList());
    }
}

export function refreshList() {
    return dispatch => {
      dispatch(startListLoading());
      dispatch(clearList());
      dispatch(loadList());
    };
}

export function loadMoreList() {
    return dispatch => {
        dispatch(startListLoading());
        dispatch(loadList());
    };
}

export function searchList() {
    return (dispatch, getState) => {
        if(getState().purchs.dateFilter!==0) {
            if(getState().purchs.startDate==='' && getState().purchs.endDate==='') {
                Alert.alert("시작일을 선택해 주세요.");
                return false;
            } else if(getState().purchs.startDate==='' && getState().purchs.endDate!=='') {
                Alert.alert("시작일을 선택해 주세요.");
                return false;
            } else if(getState().purchs.startDate!=='' && getState().purchs.endDate==='') {
                Alert.alert("종료일을 선택해 주세요.");
                return false;
            }
        }

        dispatch(startListLoading());
        dispatch(search());
        dispatch(loadList());
    }
}

export default function PurchsStateReducer(state = initialState, action = {}) {
    switch (action.type) {
        case INIT_PAGE:
            return state=initialState;
        case START_LIST_LOADING:
            return Object.assign({}, state, {
                isLoading: true,
                error: false
            });
        case LIST_LOADED:
            return Object.assign({}, state, {
                isLoading: false,
                purchsList: state.purchsList.concat(action.response.resultList),
                pageIndex: action.response.resultList.length===0?state.pageIndex: state.pageIndex + 1
            });
        case CLEAR_LIST:
            return Object.assign({}, state, {
                purchsList: [],
                filterVisible: false,
                dateFilter: 0,
                startDate: '',
                endDate: '',
                searchKeyword: '',
                pageIndex: 1
            });
        case HTTP_ERROR:
            return Object.assign({}, state, {
                isLoading: false,
                error: true
            });
        case FILTER_OPEN:
            return Object.assign({}, state, {
                filterVisible: !state.filterVisible
            });
        case SELECT_DATE_FILTER:
            return Object.assign({}, state, {
                dateFilter: action.key,                
            });
        case SET_STARTDATE:
            return Object.assign({}, state, {
                startDate: action.date
            });
        case SET_ENDDATE:
            return Object.assign({}, state, {
                endDate: action.date
            });
        case SET_SEARCHKEYWORD:
            return Object.assign({}, state, {
                searchKeyword: action.keyword
            });
        case SEARCH:
            return Object.assign({}, state, {
                purchsList: [],
                pageIndex: 1
            });
        default:
            return state;
    }    
}