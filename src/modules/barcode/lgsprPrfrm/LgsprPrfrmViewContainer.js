import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import LgsprPrfrmViewScreen from './LgsprPrfrmView';
import { 
    initState,
    setCenterPosition,
    readyToScan,
    scanning,
    delRow,
    submit
} from './LgsprPrfrmState';

export default compose(
    connect(
        state => ({
            scanStatus: state.lgsprPrfrm.scanStatus,
            tableHead: state.lgsprPrfrm.tableHead,
            tableData: state.lgsprPrfrm.tableData
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
            console.log("LgsprPrfrm Page");
            this.props.initState();
        },
    }),
) (LgsprPrfrmViewScreen);
