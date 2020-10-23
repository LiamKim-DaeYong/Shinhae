import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import LgsprRgstrViewScreen from './LgsprRgstrView';
import {
    initPage,
    setCenterPosition,
    readyToScan,
    scanning,
    delPrductCd,
    delRackCd,
    setQntty,
    submit
} from './LgsprRgstrState';

export default compose(
    connect(
        state => ({
            isLoading: state.lgsprRgstr.isLoading,
            scanStatus: state.lgsprRgstr.scanStatus,
            prductCd: state.lgsprRgstr.prductCd,
            rackCd: state.lgsprRgstr.rackCd,
            qntty: state.lgsprRgstr.qntty,
        }),
        dispatch => ({
            initPage: () => dispatch(initPage()),
            setCenterPosition: (centerPosition) => dispatch(setCenterPosition(centerPosition)),
            readyToScan: () => dispatch(readyToScan()),            
            scanning: (barcode) => dispatch(scanning(barcode)),
            delPrductCd: () => dispatch(delPrductCd()),
            delRackCd: () => dispatch(delRackCd()),
            setQntty: (qntty) => dispatch(setQntty(qntty)),
            submit: () => dispatch(submit()),
        })
    ),

    lifecycle({
        componentDidMount() {
            console.log("LgsprRgstr Page");
            this.props.initPage();
        },
    }),
) (LgsprRgstrViewScreen);
