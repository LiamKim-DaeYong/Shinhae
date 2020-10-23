import { post } from '../../../utils/api';
import { Alert, Vibration } from "react-native";

const initialState = {
    isLoading: false,
    error: false,
    scanStatus: false,
    tableHead: ['No', '바코드', '삭제'],
    tableData: [],
    centerPosition : null
};

const INIT_STATE = 'CrdbrPrfrmState/INIT_STATE';
const HTTP_ERROR = 'CrdbrPrfrmState/HTTP_ERROR';

const SET_CENTER_POSITION = 'CrdbrPrfrmState/SET_CENTER_POSITION';
const READY_TO_SCAN = 'CrdbrPrfrmState/READY_TO_SCAN';
const BARCODE_SCANNED = 'CrdbrPrfrmState/BARCODE_SCANNED';
const DELETE_ROW = 'CrdbrPrfrmState/DELETE_ROW';
const STOP_SCANNING = 'CrdbrPrfrmState/STOP_SCANNING';

const START_SUBMIT = 'CrdbrPrfrmState/START_SUBMIT';
const SUBMIT_SUCCESS = 'CrdbrPrfrmState/SUBMIT_SUCCESS';
const SUBMIT_FAILURE = 'CrdbrPrfrmState/SUBMIT_FAILURE';

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

export function initState() {
    return {
        type: INIT_STATE
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
        const newData = getState().crdbrPrfrm.tableData;
        const centerPosition = getState().crdbrPrfrm.centerPosition;

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
        const tableData = getState().crdbrPrfrm.tableData;
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
    const path = '/completeBoxWork';

    return (dispatch, getState) => {
        if(getState().crdbrPrfrm.tableData.length === 0) {
            Alert.alert("바코드를 스캔해 주세요.");
            return false;
        }

        dispatch(startSubmit());

        const body = {
            barcodeList: getState().crdbrPrfrm.tableData,
            userId: getState().login.userId
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

export default function CrdbrPrfrmStateReducer(state = initialState, action = {}) {
    switch (action.type) {
        case INIT_STATE:
            return Object.assign({}, state, {
                isLoading: false,
                scanStatus: false,
                tableData: [],
                wrhousList: []
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
                tableData: []                       
            });
        case SUBMIT_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
            });
        default:
            return state;
    }
}