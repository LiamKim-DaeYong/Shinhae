import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import BsnsScreen from './ImageUploadView';
import { 
    getInfo,
    setImages, 
    setcarKind,
    setcarNo,
    setDlvryNm,
    setDlvryNum,
    setRealNo,
    setContainerNo,
    setEtc,
    setNote,
    upload 
} from './ImageUploadState';

export default compose(
    connect(
        state => ({
            isLoading: state.imageUpload.isLoading,
            error: state.imageUpload.error,
            images: state.imageUpload.images,
            carKind: state.imageUpload.carKind,
            carNo: state.imageUpload.carNo,
            dlvryNm: state.imageUpload.dlvryNm,
            dlvryNum: state.imageUpload.dlvryNum,
            realNo: state.imageUpload.realNo,
            containerNo: state.imageUpload.containerNo,
            etc: state.imageUpload.etc,
            note: state.imageUpload.note
        }),
        dispatch => ({
            getInfo: () => dispatch(getInfo()),
            setImages: (images) => dispatch(setImages(images)),
            setcarKind: (carKind) => dispatch(setcarKind(carKind)),
            setcarNo: (carNo) => dispatch(setcarNo(carNo)),
            setDlvryNm: (dlvryNm) => dispatch(setDlvryNm(dlvryNm)),
            setDlvryNum: (dlvryNum) => dispatch(setDlvryNum(dlvryNum)),
            setRealNo: (realNo) => dispatch(setRealNo(realNo)),
            setContainerNo: (containerNo) => dispatch(setContainerNo(containerNo)),
            setEtc: (etc) => dispatch(setEtc(etc)),
            setNote: (note) => dispatch(setNote(note)),
            upload: () => dispatch(upload())
        }),        
    ),
  
    lifecycle({
        componentDidMount() {            
            console.log("ImageUpload Page");
            this.props.getInfo();
        }
    }),
) (BsnsScreen);