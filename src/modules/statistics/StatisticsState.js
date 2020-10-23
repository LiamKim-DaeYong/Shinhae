import { post } from '../../utils/api';

const initialState = {
    isLoading: false,
    error: false,
    categories: [],
    prductData: [],
    boxData: []
};

const INIT_PAGE = 'StatisticsState/INIT_PAGE';
const START_LIST_LOADING = 'StatisticsState/START_LIST_LOADING';
const LIST_LOADED = 'StatisticsState/LIST_LOADED';
const HTTP_ERROR = 'StatisticsState/HTTP_ERROR';

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

function httpError() {
    return {
        type: HTTP_ERROR
    }
}

function loadList() {
    const path = '/pckng-and-box-state';

    return (dispatch, getState) => {
        dispatch(startListLoading());

        const body = {
            byUnit: 'day',
            startDate: 'today-1week',
            endDate: 'today'
        };

        post(path, body, getState().login.token)
            .then((response) => {
                if(response.result === true) {
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

export default function StatisticsStateReducer(state = initialState, action = {}) {
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
                categories: action.response.categories,
                prductData: action.response.series.filter(item => {
                    return item.name==='물류'
                })[0].data,
                boxData: action.response.series.filter(item => {
                    return item.name==='골판지'
                })[0].data
            });
        case HTTP_ERROR:
            return Object.assign({}, state, {
                isLoading: false,
                error: true
            });
        default:
            return state;
    }    
}