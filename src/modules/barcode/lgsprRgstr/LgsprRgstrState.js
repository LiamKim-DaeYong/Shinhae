import { post } from '../../../utils/api';
import { Alert, Vibration } from 'react-native';

const initialState = {
    isLoading: false,
    error: false,
    scanStatus: false,
    prductCd: null,
    rackCd: null,
    qntty: null,
    centerPosition : null
};

const INIT_PAGE = 'LgsprRgstrState/INIT_PAGE';
const HTTP_ERROR = 'LgsprRgstrState/HTTP_ERROR';

const SET_CENTER_POSITION = 'LgsprRgstrState/SET_CENTER_POSITION';
const READY_TO_SCAN = 'LgsprRgstrState/READY_TO_SCAN';
const STOP_SCANNING = 'LgsprRgstrState/STOP_SCANNING';

const SET_PRDUCTCD = 'LgsprRgstrState/SET_PRDUCTCD';
const SET_RACKCD = 'LgsprRgstrState/SET_RACKCD';

const DEL_PRDUCTCD = 'LgsprRgstrState/DEL_PRDUCTCD';
const DEL_RACKCD = 'LgsprRgstrState/DEL_RACKCD';

const SET_QNTTY = 'LgsprRgstrState/SET_QNTTY';

const START_SUBMIT = 'LgsprRgstrState/START_SUBMIT';
const SUBMIT_SUCCESS = 'LgsprRgstrState/SUBMIT_SUCCESS';
const SUBMIT_FAILURE = 'LgsprRgstrState/SUBMIT_FAILURE';

function httpError() {
    Alert.alert("네트워크 장애, 잠시 후에 다시 시도해 주세요.");
    return {
        type: HTTP_ERROR
    }
}

function setPrductCd(barcode) {
    return {
        type: SET_PRDUCTCD,
        barcode
    }
}

function setRackCd(barcode) {
    return {
        type: SET_RACKCD,
        barcode
    }
}

function stopScanning() {
    Alert.alert("바코드 스캔이 완료되었습니다.");
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
        const centerPosition = getState().lgsprRgstr.centerPosition;

        barcode.barcodes.map((result, index) => {
            const barcodePosition = {
                'x': (result.bounds.origin.x + result.bounds.size.width) / 2,
                'y': (result.bounds.origin.y + result.bounds.size.height) / 2
            }

            if(result.type==="EMAIL" &&                
                (centerPosition.y-5 >= barcodePosition.y && centerPosition.y-10 <= barcodePosition.y)) {
                Vibration.vibrate();

                if(getState().lgsprRgstr.prductCd === null) {
                    dispatch(setPrductCd(result));
                } else if(getState().lgsprRgstr.rackCd === null) {
                    dispatch(setRackCd(result));
                } else {
                    dispatch(stopScanning());
                }
            } else {
                return false;
            }
        })
        
    }    
}

export function delPrductCd() {
    return {
        type: DEL_PRDUCTCD
    }
}

export function delRackCd() {
    return {
        type: DEL_RACKCD
    }
}

export function setQntty(qntty) {
    return {
        type: SET_QNTTY,
        qntty
    }
}

export function submit() {
    const path = '/workProcess';

    return (dispatch, getState) => {
        dispatch(startSubmit());
        
        if(getState().lgsprRgstr.prductCd===null || getState().lgsprRgstr.rackCd===null) {
            Alert.alert("바코드를 스캔해 주세요.");
            return false;
        }

        if(getState().lgsprRgstr.qntty===null || getState().lgsprRgstr.qntty==='0' || getState().lgsprRgstr.qntty==='') {
            Alert.alert("수량을 입력해 주세요.");
            return false;
        }

        const body = {
            barcode: getState().lgsprRgstr.prductCd,
            userId: getState().login.userId,
            rackCode: getState().lgsprRgstr.rackCd,
            quantity: getState().lgsprRgstr.qntty
        };

        post(path, body, getState().login.token)
            .then((response) => {
                if(response.data===true) {
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

export default function LgsprRgstrStateReducer(state = initialState, action = {}) {
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
                error: true
            });
        case SET_PRDUCTCD:
            return Object.assign({}, state, {
                prductCd: action.barcode.data,
                scanStatus: false
            });
        case SET_RACKCD:
            return Object.assign({}, state, {
                rackCd: action.barcode.data,
                scanStatus: false
            });  
        case DEL_PRDUCTCD:
            return Object.assign({}, state, {
                prductCd: null,
                scanStatus: false
            });
        case DEL_RACKCD:
            return Object.assign({}, state, {
                rackCd: null,
                scanStatus: false
            });  
        case SET_QNTTY:
            return Object.assign({}, state, {
                qntty: action.qntty,
                scanStatus: false
            });            
        case STOP_SCANNING:
            return Object.assign({}, state, {
                scanStatus: false
            });
        case START_SUBMIT:
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