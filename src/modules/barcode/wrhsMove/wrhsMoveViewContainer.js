import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import WrhsWrhsViewScreen from './wrhsMoveView';
import {
    getInfo,
    setCenterPosition,
    readyToScan,
    scanning,
    delRow,
    setWrhousng,
    submit
} from './wrhsMoveState';

export default compose(
    connect(
        state => ({
            isLoading: state.wrhsMove.isLoading,
            error: state.wrhsMove.error,
            scanStatus: state.wrhsMove.scanStatus,
            tableHead: state.wrhsMove.tableHead,
            tableData: state.wrhsMove.tableData,
            wrhousngList: state.wrhsMove.wrhousngList
        }),
        dispatch => ({
            getInfo: () => dispatch(getInfo()),
            setCenterPosition: (centerPosition) => dispatch(setCenterPosition(centerPosition)),
            readyToScan: () => dispatch(readyToScan()),
            scanning: (barcode) => dispatch(scanning(barcode)),
            delRow: (index) => dispatch(delRow(index)),
            setWrhousng: (wrhousng) => dispatch(setWrhousng(wrhousng)),
            submit: () => dispatch(submit())
        })
    ),

    lifecycle({
        componentDidMount() {
            console.log("wrhsMove Page");
            this.props.getInfo();
        },
    }),
) (WrhsWrhsViewScreen);
