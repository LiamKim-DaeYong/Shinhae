import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import MtrlsRcvngScreen from './MtrlsRcvngView';
import { 
    initPage, 
    setCenterPosition,
    readyToScan,
    scanning,
    submit
} from './MtrlsRcvngState';

export default compose(
    connect(
        state => ({
            isLoading: state.mtrlsRcvng.isLoading,
            scanStatus: state.mtrlsRcvng.scanStatus,
            barcode: state.mtrlsRcvng.barcode
        }),
        dispatch => ({
            initPage: () => dispatch(initPage()),
            setCenterPosition: (centerPosition) => dispatch(setCenterPosition(centerPosition)),
            readyToScan: () => dispatch(readyToScan()),
            scanning: (barcode) => dispatch(scanning(barcode)),
            submit: () => dispatch(submit()),
        })
    ),
  
    lifecycle({
        componentDidMount() {
            console.log("MtrlsRcvng Page");
            this.props.initPage();
        },
    }),
) (MtrlsRcvngScreen);
