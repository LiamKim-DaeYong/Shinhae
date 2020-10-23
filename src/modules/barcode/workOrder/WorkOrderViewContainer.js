import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import WorkOrderViewScreen from './WorkOrderView';
import { 
    initState,
    setCenterPosition,
    readyToScan,
    scanning,
    delRow,
    submit
} from './WorkOrderState';

export default compose(
    connect(
        state => ({
            scanStatus: state.workOrder.scanStatus,
            tableHead: state.workOrder.tableHead,
            tableData: state.workOrder.tableData
        }),
        dispatch => ({
            initState: () => dispatch(initState()),
            setCenterPosition: (centerPosition) => dispatch(setCenterPosition(centerPosition)),
            readyToScan: () => dispatch(readyToScan()),
            scanning: (barcode) => dispatch(scanning(barcode)),
            delRow: (index) => dispatch(delRow(index)),
            submit: () => dispatch(submit())
        })
    ),
  
    lifecycle({
        componentDidMount() {
            console.log("WorkOrder Page");
            this.props.initState();
        },
    }),
) (WorkOrderViewScreen);
