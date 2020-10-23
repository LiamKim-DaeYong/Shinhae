import { post } from '../../../utils/api'
import { Alert, Vibration } from 'react-native';

const initialState = {
    isLoading: false,
    error: false,
    scanStatus: false,
    barcode: null,
    centerPosition : null
};

const HTTP_ERROR = 'MtrlsRcvngState/HTTP_ERROR';

const INIT_PAGE = 'MtrlsRcvngState/INIT_PAGE';
const SET_CENTER_POSITION = 'wrhsMoveState/SET_CENTER_POSITION';
const READY_TO_SCAN = 'MtrlsRcvngState/READY_TO_SCAN';
const BARCODE_SCANNED = 'MtrlsRcvngState/BARCODE_SCANNED';

const START_SUBMIT = 'MtrlsRcvngState/START_SUBMIT';
const SUBMIT_SUCCESS = 'MtrlsRcvngState/SUBMIT_SUCCESS';
const SUBMIT_FAILURE = 'MtrlsRcvngState/SUBMIT_FAILURE';


function httpError() {
    Alert.alert("네트워크 장애, 잠시 후에 다시 시도해 주세요.");
    return {
        type: HTTP_ERROR
    }
}

function barcodeScanned(barcode) {
    return {
        type: BARCODE_SCANNED,
        barcode
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

export function initPage() {
    return {
        type: INIT_PAGE
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
        const centerPosition = getState().mtrlsRcvng.centerPosition;

        barcode.barcodes.map((result, index) => {        
            const barcodePosition = {
                'x': (result.bounds.origin.x + result.bounds.size.width) / 2,
                'y': (result.bounds.origin.y + result.bounds.size.height) / 2
            }

            if(result.type==="EMAIL" &&                
                (centerPosition.y-5 >= barcodePosition.y && centerPosition.y-10 <= barcodePosition.y)) {
                Vibration.vibrate();
                dispatch(barcodeScanned(result.data));
            }
        })
    }
}

export function setBarcode(barcode) {
    return {
        type: SET_BARCODE,
        barcode
    }    
}

export function submit() {
    const path = '/addWrhousng';

    return (dispatch, getState) => {
        if(getState().mtrlsRcvng.barcode === null) {
            Alert.alert("바코드를 스캔해 주세요.");
            return false;
        }

        dispatch(startSubmit());

        const body = {
            barcode: getState().mtrlsRcvng.barcode,
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

export default function mtrlsRcvngStateReducer(state = initialState, action = {}) {
    switch (action.type) {
        case INIT_PAGE:
            return state=initialState;
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
                barcode:null
            });
        case BARCODE_SCANNED:
            return Object.assign({}, state, {
                barcode: action.barcode,
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
                barcode: null      
            });
        case SUBMIT_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
                error: true,
                barcode: null
            });
        default:
            return state;
    }    
}