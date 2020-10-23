import { post } from '../../../utils/api';
import { Alert, Vibration } from 'react-native';

const initialState = {
    isLoading: false,
    error: false,
    scanStatus: false,
    tableHead: ['No', '바코드', '수량', '삭제'],
    tableData: [],
    bcncList: [],
    bcncSq: null,
    partList: [],
    lotSq: null,
    centerPosition : null
};

const INIT_PAGE = 'LgstcRcptState/INIT_PAGE';
const START_LOADING = 'LgstcRcptState/START_LOADING';
const LOADED = 'LgstcRcptState/LOADED';
const HTTP_ERROR = 'LgstcRcptState/HTTP_ERROR';

const SET_BCNC = 'LgstcRcptState/SET_BCNC';
const SET_LOT = 'LgstcRcptState/SET_LOT';
const SET_QNTTY = 'LgstcRcptState/SET_QNTTY';

const SET_CENTER_POSITION = 'LgstcRcptState/SET_CENTER_POSITION';
const READY_TO_SCAN = 'LgstcRcptState/READY_TO_SCAN';
const BARCODE_SCANNED = 'LgstcRcptState/BARCODE_SCANNED';
const DELETE_ROW = 'LgstcRcptState/DELETE_ROW';
const STOP_SCANNING = 'LgstcRcptState/STOP_SCANNING';

const START_SUBMIT = 'LgstcRcptState/START_SUBMIT';
const SUBMIT_SUCCESS = 'LgstcRcptState/SUBMIT_SUCCESS';
const SUBMIT_FAILURE = 'LgstcRcptState/SUBMIT_FAILURE';

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

function initScan() {
    return {
        type: READY_TO_SCAN
    }
}

export function loadInfo() {
    const path = '/selectLotWrhousng';

    return (dispatch, getState) => {
        const body = {};

        post(path, body, getState().login.token)
            .then((response) => {
                console.log(response);
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
    return (dispatch, getState) => {
        if(getState().lgstcRcpt.bcncSq===null) {
            Alert.alert("거래처를 선택해 주세요.");
            return false;
        }

        if(getState().lgstcRcpt.lotSq===null) {
            Alert.alert("부품명을 선택해 주세요.");
            return false;
        }

        dispatch(initScan());
    }
}

export function setBcnc(bcncSq) {
    return {
        type: SET_BCNC,
        bcncSq
    }
}

export function setLot(lotSq) {
    return {
        type: SET_LOT,
        lotSq
    }
}

export function scanning(barcode) {
    return (dispatch, getState) => {
        const newData = getState().lgstcRcpt.tableData;
        const centerPosition = getState().lgstcRcpt.centerPosition;

        barcode.barcodes.map((result, index) => {
            const barcodePosition = {
                'x': (result.bounds.origin.x + result.bounds.size.width) / 2,
                'y': (result.bounds.origin.y + result.bounds.size.height) / 2
            }

            if(result.type==="EMAIL" &&                
                (centerPosition.y-5 >= barcodePosition.y && centerPosition.y-10 <= barcodePosition.y)) {
                Vibration.vibrate();

                if(newData.filter(item => { return item.barcode === result.data }).length === 0) {
                    newData.push({
                        barcode: result.data, 
                        qntty: getState().lgstcRcpt.partList.filter(item => {
                            return item.value === getState().lgstcRcpt.lotSq                       
                            })[0].qntty
                    });
            
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

export function setQntty(index, qntty) {
    return {
        type: SET_QNTTY,
        index,
        qntty
    }
}

export function delRow(index) {
    return (dispatch, getState) => {
        const tableData = getState().lgstcRcpt.tableData;
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
    const path = '/regLotWrhousng';

    return (dispatch, getState) => {
        if(getState().lgstcRcpt.bcncSq===null) {
            Alert.alert("거래처를 선택해 주세요.");
            return false;
        }

        if(getState().lgstcRcpt.lotSq===null) {
            Alert.alert("부품명을 선택해 주세요.");
            return false;
        }

        if(getState().lgstcRcpt.tableData.length === 0) {
            Alert.alert("바코드를 스캔해 주세요.");
            return false;
        }        

        if(getState().lgstcRcpt.tableData.filter(item => { return (item.qntty===null || item.qntty===0 || item.qntty==='')}).length !== 0) {
            Alert.alert("수량을 입력해 주세요.");
            return false;
        }

        dispatch(startSubmit());

        const body = {
            barcodeMapList: getState().lgstcRcpt.tableData,
            userId: getState().login.userId,
            lotSq: getState().lgstcRcpt.lotSq,
            bcncSq: getState().lgstcRcpt.bcncSq
        };

        post(path, body, getState().login.token)
            .then((response) => {
                console.log(response)
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

export default function LgstcRcptStateReducer(state = initialState, action = {}) {
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
                partList: action.response.partList
            });
        case SET_BCNC:
            return Object.assign({}, state, {
                bcncSq: action.bcncSq.value
            });
        case SET_LOT:
            return Object.assign({}, state, {
                lotSq: action.lotSq.value
            });
        case SET_QNTTY:
            return Object.assign({}, state, {
                tableData: state.tableData.map((item, index) => ({
                    ...item,
                    qntty: action.index!==index? item.qntty : action.qntty===''?'':parseInt(action.qntty)
                }))
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
        case START_SUBMIT:
            return Object.assign({}, state, {
                isLoading: true,
                error: false
            });
        case SUBMIT_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                error: false,
                tableData: [],
                bcncSq: null,
                lotSq: null
            });
        case SUBMIT_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
            });
        default:
            return state;
    }    
}