import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import LgstcRcptViewScreen from './LgstcRcptView';
import {  
    getInfo,
    setCenterPosition,
    readyToScan,
    setBcnc,
    setLot,
    scanning,
    setQntty,
    delRow,
    submit
} from './LgstcRcptState';

export default compose(
    connect(
        state => ({
            isLoading: state.lgstcRcpt.isLoading,
            scanStatus: state.lgstcRcpt.scanStatus,
            tableHead: state.lgstcRcpt.tableHead,
            tableData: state.lgstcRcpt.tableData,
            bcncList: state.lgstcRcpt.bcncList,
            qnttyList: state.lgstcRcpt.qnttyList,
            bcncSq: state.lgstcRcpt.bcncSq,
            partList: state.lgstcRcpt.partList,
        }),
        dispatch => ({
            getInfo: () => dispatch(getInfo()),
            setCenterPosition: (centerPosition) => dispatch(setCenterPosition(centerPosition)),
            readyToScan: () => dispatch(readyToScan()),
            setBcnc: (bcncSq) => dispatch(setBcnc(bcncSq)),
            setLot: (lotSq) => dispatch(setLot(lotSq)),
            scanning: (barcode) => dispatch(scanning(barcode)),
            setQntty: (index, qntty) => dispatch(setQntty(index, qntty)),
            delRow: (index) => dispatch(delRow(index)),
            submit: () => dispatch(submit())
        })
    ),
  
    lifecycle({
        componentDidMount() {
            console.log("LgstcRcpt Page");
            this.props.getInfo();
        },
    }),
) (LgstcRcptViewScreen);
