import { post } from '../../../utils/api';
import { Alert, Vibration } from 'react-native';

const initialState = {
    isLoading: false,
    error: false,
    scanStatus: false,
    tableHead: ['No', '바코드', '삭제'],
    tableData: [],
    wrhousngList: [],
    wrhousngCd: null,
    centerPosition : null
};

const INIT_PAGE = 'wrhsMoveState/INIT_PAGE';
const START_LOADING = 'wrhsMoveState/START_LOADING';
const LOADED = 'wrhsMoveState/LOADED';
const HTTP_ERROR = 'wrhsMoveState/HTTP_ERROR';

const SET_CENTER_POSITION = 'wrhsMoveState/SET_CENTER_POSITION';
const READY_TO_SCAN = 'wrhsMoveState/READY_TO_SCAN';
const BARCODE_SCANNED = 'wrhsMoveState/BARCODE_SCANNED';
const DELETE_ROW = 'wrhsMoveState/DELETE_ROW';
const STOP_SCANNING = 'wrhsMoveState/STOP_SCANNING';

const SET_WRHOUSNG = 'wrhsMoveState/SET_WRHOUSNG';

const START_SUBMIT = 'wrhsMoveState/START_SUBMIT';
const SUBMIT_SUCCESS = 'wrhsMoveState/SUBMIT_SUCCESS';
const SUBMIT_FAILURE = 'wrhsMoveState/SUBMIT_FAILURE';

function initPage() {
    return {
        type: INIT_PAGE
    }
}

function startLoading() {
    return {
        type: START_LOADING
    }
}

function loaded(response) {
    return {
        type: LOADED,
        response
    };
}

function httpError() {
    Alert.alert("네트워크 장애, 잠시 후에 다시 시도해 주세요.");
    return {
        type: HTTP_ERROR
    }
}

function barcodeScanned(tableData) {
    return {
        type: BARCODE_SCANNED,
        tableData
    };
}

function deletedRow(tableData) {
    return {
        type: DELETE_ROW,
        tableData
    };
}

function stopScanning() {
    return {
        type: STOP_SCANNING
    };
}

function startSubmit() {
    return {
        type: START_SUBMIT
    }
}

function submitSuccess() {
    Alert.alert("업로드 완료");
    return {
        type: SUBMIT_SUCCESS,
    }
}

function submitFailure(error) {
    Alert.alert("" + error);
    return {
        type: SUBMIT_FAILURE
    }
}

function loadInfo() {
    const path = '/selectWrhousng';

    return (dispatch, getState) => {
        const body = {};

        post(path, body, getState().login.token)
            .then((response) => {
                if(response.data.result === true) {
                    dispatch(loaded(response.data));
                } else {
                    dispatch(httpError());
                }
            })
            .catch((error) => {
                dispatch(httpError());
            })
    }
}

export function getInfo() {
    return dispatch => {
        dispatch(initPage());
        dispatch(startLoading());
        dispatch(loadInfo());
    }
}

export function setCenterPosition(centerPosition) {
    return {
        type: SET_CENTER_POSITION,
        centerPosition
    }
}

export function readyToScan() {
    return {
        type: READY_TO_SCAN
    }
}

export function setWrhousng(wrhousng) {
    return {
        type: SET_WRHOUSNG,
        wrhousng
    }
}

export function scanning(barcode) {
    return (dispatch, getState) => {        
        const newData = getState().wrhsMove.tableData;
        const centerPosition = getState().wrhsMove.centerPosition;

        barcode.barcodes.map((result, index) => {            
            const barcodePosition = {
                'x': (result.bounds.origin.x + result.bounds.size.width) / 2,
                'y': (result.bounds.origin.y + result.bounds.size.height) / 2
            }

            if(result.type==="EMAIL" &&                
                (centerPosition.y-5 >= barcodePosition.y && centerPosition.y-10 <= barcodePosition.y)) {
                Vibration.vibrate();
                
                if(newData.indexOf(result.data) === -1)  {                    
                    dispatch(stopScanning());

                    newData.push(result.data);
                    dispatch(barcodeScanned(newData));
                } else {     
                    dispatch(stopScanning());
                    return Alert.alert("이미 처리된 바코드 입니다.");
                }
            } else {
                return false;
            }
        })
    }    
}

export function delRow(index) {
    return (dispatch, getState) => {
        const tableData = getState().wrhsMove.tableData;
        const newData = []

        for(let i=0; i<tableData.length; i++) {
            if(i !== index) {
                newData.push(tableData[i]);
            }
        }

        dispatch(deletedRow(newData));
    }
}

export function submit() {
    const path = '/wrhousngLocation';

    return (dispatch, getState) => {
        if(getState().wrhsMove.wrhousngCd === null) {
            Alert.alert("창고를 선택해 주세요.");
            return false;
        }

        if(getState().wrhsMove.tableData.length === 0) {
            Alert.alert("바코드를 스캔해 주세요.");
            return false;
        }

        dispatch(startSubmit());

        const body = {
            barcodeList: getState().wrhsMove.tableData,
            userId: getState().login.userId,
            locationCd: getState().wrhsMove.wrhousngCd,
            barcodeList: getState().wrhsMove.tableData
        };

        post(path, body, getState().login.token)
            .then((response) => {
                if(response.data === true) {
                    dispatch(submitSuccess());
                } else {
                    dispatch(submitFailure(response.errors));
                }
            })
            .catch((error) => {
                dispatch(httpError());
            })
    }
}

export default function WrhsWrhsStateReducer(state = initialState, action = {}) {
    switch (action.type) {
        case INIT_PAGE:
            return state=initialState;
        case START_LOADING:
            return Object.assign({}, state, {
                isLoading: true,
                error: false
            });
        case LOADED:
            return Object.assign({}, state, {
                isLoading: false,
                scanStatus: false,
                tableData: [],
                wrhousngList: action.response.wrhousngList
            });
        case SET_CENTER_POSITION:
            return Object.assign({}, state, {
                centerPosition: action.centerPosition
            });
        case READY_TO_SCAN:
            return Object.assign({}, state, {
                scanStatus: !state.scanStatus
            });
        case HTTP_ERROR:
            return Object.assign({}, state, {
                isLoading: false,
                error: true,
                tableData: []
            });
        case BARCODE_SCANNED:
        case DELETE_ROW:
            return Object.assign({}, state, {
                tableData: action.tableData,
                scanStatus: false
            });
        case STOP_SCANNING:
            return Object.assign({}, state, {
                scanStatus: false
            });
        case SET_WRHOUSNG:
            return Object.assign({}, state, {
                wrhousngCd: action.wrhousng.value
            });
        case START_SUBMIT:
            return Object.assign({}, state, {
                isLoading: true,
                error: false
            });
        case SUBMIT_SUCCESS:            
            return Object.assign({}, state, {
                isLoading: false,
                error: false,
                tableData: []
            });
        case SUBMIT_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
                tableData: []
            });
        default:
            return state;
    }    
}