import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import LgstcShpngViewScreen from './LgstcShpngView';
import { 
    getInfo,
    setCenterPosition,
    readyToScan,
    scanning,
    delRow,
    setBcnc,
    setRcvordNo,
    setLocal,
    submit
} from './LgstcShpngState';

export default compose(
    connect(
        state => ({
            isLoading: state.lgstcShpng.isLoading,
            error: state.lgstcShpng.error,
            scanStatus: state.lgstcShpng.scanStatus,
            tableHead: state.lgstcShpng.tableHead,
            tableData: state.lgstcShpng.tableData,
            bcncList: state.lgstcShpng.bcncList,
            bcncSq: state.lgstcShpng.bcncSq,
            rcvordNoList: state.lgstcShpng.rcvordNoList,
            rcvordNo: state.lgstcShpng.rcvordNo,
            localNm: state.lgstcShpng.localNm
        }),
        dispatch => ({
            getInfo: () => dispatch(getInfo()),
            setCenterPosition: (centerPosition) => dispatch(setCenterPosition(centerPosition)),
            readyToScan: () => dispatch(readyToScan()),
            scanning: (barcode) => dispatch(scanning(barcode)),
            delRow: (index) => dispatch(delRow(index)),
            setBcnc: (bcncSq) => dispatch(setBcnc(bcncSq)),
            setRcvordNo: (rcvordNo) => dispatch(setRcvordNo(rcvordNo)),
            setLocal: (localNm) => dispatch(setLocal(localNm)),
            submit: () => dispatch(submit())
        })
    ),
  
    lifecycle({
        componentDidMount() {
            console.log("LgstcShpng Page");
            this.props.getInfo();
        },
    }),
) (LgstcShpngViewScreen);
