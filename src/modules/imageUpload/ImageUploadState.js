import RNFetchBlob from 'rn-fetch-blob';
import { Alert } from 'react-native';
import { post } from '../../utils/api';

const initialState = {
    isLoading: false,
    error: false,
    images: [],
    carKind: '',
    carNo: '',
    dlvryNm: '',
    dlvryNum: '',
    realNo: '',
    containerNo: '',
    etc: '',
    note: '',
}

const INIT_PAGE = 'ImageUploadState/INIT_PAGE';
const START_LOADING = 'ImageUploadState/START_LOADING';
const LOADED = 'ImageUploadState/LOADED';
const HTTP_ERROR = 'ImageUploadState/HTTP_ERROR';

const SET_IMAGES = 'ImageUploadState/SET_IMAGES';

const SET_CARKIND = 'ImageUploadState/SET_CARKIND';
const SET_CARNO = 'ImageUploadState/SET_CARNO';
const SET_DLVRYNM = 'ImageUploadState/SET_DLVRYNM';
const SET_DLVRYNUM = 'ImageUploadState/SET_DLVRYNUM';
const SET_REALNO = 'ImageUploadState/SET_REALNO';
const SET_CONTAINERNO = 'ImageUploadState/SET_CONTAINERNO';
const SET_ETC = 'ImageUploadState/SET_ETC';
const SET_NOTE = 'ImageUploadState/SET_NOTE';

function httpError() {
    return {
        type: HTTP_ERROR
    }
}

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

function loadInfo() {
    const path = '/getDlvryDetailList';

    return (dispatch, getState) => {
        const body = {
            dlvrySq: parseInt(getState().bsns.dlvrySq)
        };
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
                console.log(error)
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

export function setImages(images) {
    return {
        type: SET_IMAGES,
        images
    }
}

export function setcarKind(carKind) {
    return {
        type: SET_CARKIND,
        carKind
    }
}

export function setcarNo(carNo) {
    return {
        type: SET_CARNO,
        carNo
    }
}

export function setDlvryNm(dlvryNm) {
    return {
        type: SET_DLVRYNM,
        dlvryNm
    }
}

export function setDlvryNum(dlvryNum) {
    return {
        type: SET_DLVRYNUM,
        dlvryNum
    }
}

export function setRealNo(realNo) {
    return {
        type: SET_REALNO,
        realNo
    }
}

export function setContainerNo(containerNo) {
    return {
        type: SET_CONTAINERNO,
        containerNo
    }
}

export function setEtc(etc) {
    return {
        type: SET_ETC,
        etc
    }
}

export function setNote(note) {
    return {
        type: SET_NOTE,
        note
    }
}

export function upload() {
    const path = '/addDlvryImg';
    const body = [];
    
    return (dispatch, getState) => {
        if(getState().imageUpload.images.length===0) {
            Alert.alert("이미지를 선택해 주세요.");
            return false;
        }

        if(getState().imageUpload.carKind===null) {
            Alert.alert("차종을 입력해 주세요.");
            return false;
        }

        if(getState().imageUpload.carNo===null) {
            Alert.alert("차량번호를 입력해 주세요.");
            return false;
        }

        if(getState().imageUpload.dlvryNm===null) {
            Alert.alert("기사성명을 입력해 주세요.");
            return false;
        }

        body.push({
            name: 'dlvrySq',
            data: JSON.stringify(getState().bsns.dlvrySq),
            type: 'application/json',
        });

        body.push({
            name: 'userId',
            data: getState().login.userId,
            type: 'application/json',
        });

        body.push({
            name: 'carKind',
            data: getState().imageUpload.carKind,
            type: 'application/json',
        });

        body.push({
            name: 'carNo',
            data: getState().imageUpload.carNo,
            type: 'application/json',
        });

        body.push({
            name: 'dlvryNm',
            data: getState().imageUpload.dlvryNm,
            type: 'application/json',
        });

        body.push({
            name: 'dlvryNum',
            data: getState().imageUpload.dlvryNum,
            type: 'application/json',
        });

        body.push({
            name: 'realNo',
            data: getState().imageUpload.realNo,
            type: 'application/json',
        });
        
        body.push({
            name: 'containerNo',
            data: getState().imageUpload.containerNo,
            type: 'application/json',
        });

        body.push({
            name: 'etc',
            data: getState().imageUpload.etc,
            type: 'application/json',
        });
        
        body.push({
            name: 'note',
            data: getState().imageUpload.note,
            type: 'application/json',
        });

        body.push({
            name: 'image',
            data: "false",
            type: 'application/json',
        });


        getState().imageUpload.images.map(image => {
            body.push({
                name: 'imgList',
                fieldName: 'imgList',
                data: RNFetchBlob.wrap(image.path),
                type: image.mime,            
                filename: image.path.substring(image.path.lastIndexOf('/') + 1, image.path.length)
           })
        });

        return new Promise((resolve, reject) => {        
            // RNFetchBlob.fetch('POST', 'http://211.224.128.103:9009/m/addDlvryImg', {    
                RNFetchBlob.fetch('POST', 'http://192.168.0.123:8080/m/addDlvryImg', {    
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: getState().login.token,
            }, body
            ).then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if(responseJson.data.result===true) {
                    Alert.alert("이미지 업로드 완료");
                    resolve(true);
                } else {
                    Alert.alert("잠시후 다시 시도해 주세요.");
                    reject();
                }
            })
            .catch((error) => {
                dispatch(httpError());
                reject();
            })
        })
    }
}

export default function ImageUploadStateReducer(state = initialState, action = {}) {
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
                images: action.response.images,
                carKind: action.response.carKind,
                carNo: action.response.carNo,
                dlvryNm: action.response.dlvryNm,
                dlvryNum: action.response.dlvryNum,
                realNo: action.response.realNo,
                containerNo: action.response.containerNo,
                etc: action.response.etc,
                note: action.response.note
            });
        case HTTP_ERROR:
            return Object.assign({}, state, {
                isLoading: false,
                error: true
            });
        case SET_IMAGES:
            return Object.assign({}, state, {
                images: action.images
            });
        case SET_CARKIND:
            return Object.assign({}, state, {
                carKind: action.carKind
            });
        case SET_CARNO:
            return Object.assign({}, state, {
                carNo: action.carNo
            });
        case SET_DLVRYNM:
            return Object.assign({}, state, {
                dlvryNm: action.dlvryNm
            });
        case SET_DLVRYNUM:
            return Object.assign({}, state, {
                dlvryNum: action.dlvryNum
            });
        case SET_REALNO:
            return Object.assign({}, state, {
                realNo: action.realNo
            });
        case SET_CONTAINERNO:
            return Object.assign({}, state, {
                containerNo: action.containerNo
            });
        case SET_ETC:
            return Object.assign({}, state, {
                etc: action.etc
            });
        case SET_NOTE:
            return Object.assign({}, state, {
                note: action.note
            });
        default:
            return state;
    }    
}