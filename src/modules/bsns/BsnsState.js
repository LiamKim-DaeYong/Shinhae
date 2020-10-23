import { post } from '../../utils/api';
import { Alert } from 'react-native';

const initialState = {
    isLoading: false,
    error: false,
    bsnsList: [],
    filterVisible: false,
    dstrbFilterList: [],
    dstrbFilter: '',
    dateFilterList: ['전체', '납기일', '출하계획일'],
    dateFilter: 0,
    startDate: '',
    endDate: '',
    searchKeyword: '',
    pageIndex: 1,
    dlvrySq: null
};

const INIT_PAGE = 'BsnsState/INIT_PAGE';
const START_LIST_LOADING = 'BsnsState/START_LIST_LOADING';
const LIST_LOADED = 'BsnsState/LIST_LOADED';
const CLEAR_LIST = 'BsnsState/CLEAR_LIST';
const HTTP_ERROR = 'BsnsState/HTTP_ERROR';

const FILTER_OPEN = 'BsnsState/FILTER_OPEN';
const SELECT_DSTRB_FILTER = 'BsnsState/SELECT_DSTRB_FILTER';
const SELECT_DATE_FILTER = 'BsnsState/SELECT_DATE_FILTER';
const SET_STARTDATE = 'BsnsState/SET_STARTDATE';
const SET_ENDDATE = 'BsnsState/SET_ENDDATE';
const SET_SEARCHKEYWORD = 'BsnsState/SET_SEARCHKEYWORD';
const SEARCH = 'BsnsState/SEARCH';

const SET_DLVRYSQ = 'BsnsState/SET_DLVRYSQ';

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
    };
}

export function selectDstrbFilter(key) {
    return {
        type: SELECT_DSTRB_FILTER,
        key     
    };
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

export function setDlvrySq(dlvrySq) {
    return {
        type: SET_DLVRYSQ,
        dlvrySq
    }
}

function loadList() {
    const path = '/selectDlvryList';

    return (dispatch, getState) => {
        const body = {
            searchFilter: getState().bsns.dstrbFilter,
            searchCondition: getState().bsns.dateFilter,
            startDate: getState().bsns.startDate,
            endDate: getState().bsns.endDate,
            searchKeyword: getState().bsns.searchKeyword,
            pageIndex: getState().bsns.pageIndex,
        };

        post(path, body, getState().login.token)
            .then((response) => {
                console.log(response)
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
        if(getState().bsns.dateFilter!==0) {
            if(getState().bsns.startDate==='' && getState().bsns.endDate==='') {
                Alert.alert("시작일을 선택해 주세요.");
                return false;
            } else if(getState().bsns.startDate==='' && getState().bsns.endDate!=='') {
                Alert.alert("시작일을 선택해 주세요.");
                return false;
            } else if(getState().bsns.startDate!=='' && getState().bsns.endDate==='') {
                Alert.alert("종료일을 선택해 주세요.");
                return false;
            }
        }

        dispatch(startListLoading());
        dispatch(search());
        dispatch(loadList());
    }
}

export default function BsnsStateReducer(state = initialState, action = {}) {
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
                dstrbFilterList: action.response.filterList,
                bsnsList: state.bsnsList.concat(action.response.resultList),
                pageIndex: action.response.resultList.length===0?state.pageIndex: state.pageIndex + 1
            });
        case CLEAR_LIST:
            return Object.assign({}, state, {
                bsnsList: [],
                filterVisible: false,
                dstrbFilter: '',
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
        case SELECT_DSTRB_FILTER:
            return Object.assign({}, state, {
                dstrbFilter: action.key
            });
        case SELECT_DATE_FILTER:
            return Object.assign({}, state, {
                dateFilter: action.key
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
                bsnsList: [],
                pageIndex: 1
            });
        case SET_DLVRYSQ:
            return Object.assign({}, state, {
                dlvrySq: action.dlvrySq
            });
        default:
            return state;
    }    
}