import { post } from '../../utils/api';

const initialState = {
    isLoading: false,
    error: false,
    mtrlsList: [],
    filterVisible: false,
    dstrbFilterList: [],
    dstrbFilter: '',
    invntryFilterList: [],
    invntryFilter: '',
    searchKeyword: '',
    pageIndex: 1
};

const INIT_PAGE = 'InvntryState/INIT_PAGE';
const START_LIST_LOADING = 'InvntryState/START_LIST_LOADING';
const LIST_LOADED = 'InvntryState/LIST_LOADED';
const CLEAR_LIST = 'InvntryState/CLEAR_LIST';
const HTTP_ERROR = 'InvntryState/HTTP_ERROR';

const FILTER_OPEN = 'InvntryState/FILTER_OPEN'
const SELECT_DSTRB_FILTER = 'InvntryState/SELECT_DSTRB_FILTER';
const SELECT_INVNTRY_FILTER = 'InvntryState/SELECT_INVNTRY_FILTER';
const SET_SEARCHKEYWORD = 'InvntryState/SET_SEARCHKEYWORD';

const SEARCH = 'InvntryState/SEARCH';

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

export function selectDstrbFilter(key) {
    return {
        type: SELECT_DSTRB_FILTER,
        key     
    };
}

export function selectInvntryFilter(key) {
    return {
        type: SELECT_INVNTRY_FILTER,
        key     
    };
}

export function changeSearchKeyword(keyword) {
    return {
        type: SET_SEARCHKEYWORD,
        keyword
    }
}

function loadList() {
    const path = '/selectInvntryList';

    return (dispatch, getState) => {
        const body = {
            searchCondition: getState().invntry.dstrbFilter,
            searchFilter: getState().invntry.invntryFilter,
            searchKeyword: getState().invntry.searchKeyword,
            pageIndex: getState().invntry.pageIndex,
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
    return dispatch => {
        dispatch(startListLoading());
        dispatch(search());
        dispatch(loadList());
    }
}

export default function InvntryStateReducer(state = initialState, action = {}) {
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
                dstrbFilterList: action.response.itemList,
                invntryFilterList: action.response.wrhousngList,
                mtrlsList: state.mtrlsList.concat(action.response.resultList),
                pageIndex: action.response.resultList.length===0?state.pageIndex: state.pageIndex + 1         
            });
        case CLEAR_LIST:
            return Object.assign({}, state, {
                mtrlsList: [],
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
        case SELECT_DSTRB_FILTER:
            return Object.assign({}, state, {
                dstrbFilter: action.key
            });
        case SELECT_INVNTRY_FILTER:
            return Object.assign({}, state, {
                invntryFilter: action.key
            });
        case SET_SEARCHKEYWORD:
            return Object.assign({}, state, {
                searchKeyword: action.keyword
            });
        case SEARCH:
            return Object.assign({}, state, {
                mtrlsList: [],
                pageIndex: 1
            });
        default:
            return state;
    }    
}