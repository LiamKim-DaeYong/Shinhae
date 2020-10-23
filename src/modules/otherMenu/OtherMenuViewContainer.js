import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { logout } from '../auth/LoginState';
import OtherMenuScreen from './OtherMenuView';

export default compose(
    connect(
        state => ({
        }),
        dispatch => ({
            logout: () => dispatch(logout())
        })
    ),
  
    lifecycle({
        componentDidMount() {
            console.log("OtherMenu Page");
        },
    }),
) (OtherMenuScreen);
