import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import StatisticsScreen from './StatisticsView';
import { getList } from './StatisticsState';

export default compose(
    connect(
        state => ({
            isLoading: state.statistics.isLoading,
            error: state.statistics.error,
            categories: state.statistics.categories,
            prductData: state.statistics.prductData,
            boxData: state.statistics.boxData
        }),
        dispatch => ({
            getList: () => dispatch(getList())
        })
    ),
  
    lifecycle({
        componentDidMount() {
            console.log("Statistics Page");
            this.props.getList();
        },
    }),
) (StatisticsScreen);
