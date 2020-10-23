import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import HomeScreen from './HomeView';

export default compose(
    connect(
        state => ({
        }),
        dispatch => ({
        })
    ),
  
    lifecycle({
        componentDidMount() {
            console.log("Home Page");
        },
    }),
) (HomeScreen);
