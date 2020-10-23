import { post } from '../../../utils/api';
import { Alert, Vibration } from 'react-native';

const initialState = {
    error: false,
    scanStatus: false,
    tableHead: ['No', '바코드', '삭제'],
    tableData: [],
    centerPosition : null
};

const INIT_STATE = 'LgsprPrfrmState/INIT_STATE';
const HTTP_ERROR = 'LgsprPrfrmState/HTTP_ERROR';

const SET_CENTER_POSITION = 'LgsprPrfrmState/SET_CENTER_POSITION';
const READY_TO_SCAN = 'LgsprPrfrmState/READY_TO_SCAN';
const BARCODE_SCANNED = 'LgsprPrfrmState/BARCODE_SCANNED';
const DELETE_ROW = 'LgsprPrfrmState/DELETE_ROW';
const STOP_SCANNING = 'LgsprPrfrmState/STOP_SCANNING';

const START_SUBMIT = 'LgsprPrfrmState/START_SUBMIT';
const SUBMIT_SUCCESS = 'LgsprPrfrmState/SUBMIT_SUCCESS';
const SUBMIT_FAILURE = 'LgsprPrfrmState/SUBMIT_FAILURE';

function httpError() {
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
        const newData = getState().lgsprPrfrm.tableData;
        const centerPosition = getState().lgsprPrfrm.centerPosition;

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
        const tableData = getState().lgsprPrfrm.tableData;
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
    const path = '/completeWork';

    return (dispatch, getState) => {
        if(getState().lgsprPrfrm.tableData.length === 0) {
            Alert.alert("바코드를 스캔해 주세요.");
            return false;
        }

        dispatch(startSubmit());

        const body = {
            barcodeList: getState().lgsprPrfrm.tableData,
            userId: getState().login.userId
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

export default function LgsprPrfrmStateReducer(state = initialState, action = {}) {
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
        case SUBMIT_SUCCESS:            
            return Object.assign({}, state, {
                isLoading: false,
                isLogined: true,
                tableData: []                       
            });
        case SUBMIT_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
                isLogined: false
            });  
        default:
            return state;
    }    
}