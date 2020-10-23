import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import CrdbrPrfrmViewScreen from './CrdbrPrfrmView';
import { 
    initState,
    setCenterPosition,
    readyToScan,
    scanning,
    delRow,
    submit
} from './CrdbrPrfrmState';

export default compose(
    connect(
        state => ({
            isLoading: state.crdbrPrfrm.isLoading,
            scanStatus: state.crdbrPrfrm.scanStatus,
            tableHead: state.crdbrPrfrm.tableHead,
            tableData: state.crdbrPrfrm.tableData
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
            console.log("CrdbrPrfrm Page");
            this.props.initState();
        },
    }),
) (CrdbrPrfrmViewScreen);
