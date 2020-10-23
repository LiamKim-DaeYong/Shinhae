import { post } from '../../../utils/api';
import { Alert, Vibration } from 'react-native';

const initialState = {
    isLoading: false,
    error: false,
    scanStatus: false,
    tableHead: ['No', '바코드', '삭제'],
    tableData: [],
    bcncList: [],
    bcncSq: null,
    rcvordNoList: [],
    rcvordNo: null,
    localNm: null,
    centerPosition : null
};

const INIT_PAGE = 'LgstcShpngState/INIT_PAGE';
const START_LOADING = 'LgstcShpngState/START_LOADING';
const LOADED = 'LgstcShpngState/LOADED';
const HTTP_ERROR = 'LgstcShpngState/HTTP_ERROR';

const SET_CENTER_POSITION = 'LgstcShpngState/SET_CENTER_POSITION';
const READY_TO_SCAN = 'LgstcShpngState/READY_TO_SCAN';
const BARCODE_SCANNED = 'LgstcShpngState/BARCODE_SCANNED';
const DELETE_ROW = 'LgstcShpngState/DELETE_ROW';
const STOP_SCANNING = 'LgstcShpngState/STOP_SCANNING';

const SET_BCNC = 'LgstcShpngState/SET_BCNC';
const SET_RCVORDNO = 'LgstcShpngState/SET_RCVORDNO';
const SET_LOCAL = 'LgstcShpngState/SET_LOCAL';

const START_SUBMIT = 'LgstcShpngState/START_SUBMIT';
const SUBMIT_SUCCESS = 'LgstcShpngState/SUBMIT_SUCCESS';
const SUBMIT_FAILURE = 'LgstcShpngState/SUBMIT_FAILURE';

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

function submitFailure() {
    Alert.alert("업로드 실패, 다시 시도하여 주십시요.");
    return {
        type: SUBMIT_FAILURE
    }
}

function loadInfo() {
    const path = '/getAddDlvryParam';
    
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

export function setBcnc(bcncSq) {
    return {
        type: SET_BCNC,
        bcncSq
    }
}

export function setRcvordNo(rcvordNo) {
    return {
        type: SET_RCVORDNO,
        rcvordNo
    }
}

export function setLocal(localNm) {
    return {
        type: SET_LOCAL,
        localNm
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

export function scanning(barcode) {
    return (dispatch, getState) => {
        const newData = getState().lgstcShpng.tableData;
        const centerPosition = getState().lgstcShpng.centerPosition;

        barcode.barcodes.map((result, index) => {
            const barcodePosition = {
                'x': (result.bounds.origin.x + result.bounds.size.width) / 2,
                'y': (result.bounds.origin.y + result.bounds.size.height) / 2
            }

            if(result.type==="EMAIL" &&                
                (centerPosition.y-5 >= barcodePosition.y && centerPosition.y-10 <= barcodePosition.y)) {
                Vibration.vibrate();

                if(newData.indexOf(result.data) === -1) {
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
        const tableData = getState().lgstcShpng.tableData;
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
    const path = '/addDlvryList';

    return (dispatch, getState) => {
        dispatch(startSubmit());

        if(getState().lgstcShpng.bcncSq === null) {
            Alert.alert("거래처를 선택해 주세요.");
            return false;
        }

        if(getState().lgstcShpng.rcvordNo === null && getState().lgstcShpng.localNm === null) {
            Alert.alert("수주번호 혹은 납품처를 작성해 주세요.");
            return false;
        }

        if(getState().lgstcShpng.tableData.length === 0) {
            Alert.alert("바코드를 스캔해 주세요.");
            return false;
        }

        const body = {
            barcodeList: getState().lgstcShpng.tableData,
            userId: getState().login.userId,
            bcncSq: getState().lgstcShpng.bcncSq,
            rcvordNo: getState().lgstcShpng.rcvordNo,
            localNm: getState().lgstcShpng.localNm
        };

        post(path, body, getState().login.token)
            .then((response) => {
                console.log(response);
                if(response.data.result === true) {
                    dispatch(submitSuccess());
                } else {
                    dispatch(submitFailure());
                }
            })
            .catch((error) => {
                dispatch(httpError());
            })
    }
}

export default function LgstcShpngStateReducer(state = initialState, action = {}) {
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
                bcncList: action.response.bcncList,
                rcvordNoList: action.response.rcvordNoList
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
                error: true
            });
        case BARCODE_SCANNED:
        case DELETE_ROW:
            return Object.assign({}, state, {
                tableData: action.tableData,
                scanStatus: false
            });
        case SET_BCNC:
            return Object.assign({}, state, {
                bcncSq: action.bcncSq.value,
                rcvordNo: null
            });
        case SET_RCVORDNO:
            return Object.assign({}, state, {
                rcvordNo: action.rcvordNo.label,
                localNm: null
            });
        case SET_LOCAL:
            return Object.assign({}, state, {
                localNm: action.localNm,
            });
        case STOP_SCANNING:
            return Object.assign({}, state, {
                scanStatus: false
            });
        case SUBMIT_SUCCESS:            
            return Object.assign({}, state, {
                isLoading: false,
                tableData: [],
            });
        case SUBMIT_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
            });
        default:
            return state;
    }    
}