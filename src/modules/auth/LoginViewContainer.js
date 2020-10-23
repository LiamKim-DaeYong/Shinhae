import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import LoginScreen from './LoginView';
import { 
    setId, 
    setPassword,
    setCheckBox,
    login,
    checkLogin
} from './LoginState';

export default compose(
    connect(
        state => ({
            isLoading: state.login.isLoading,
            isLogined: state.login.isLogined,
            userId: state.login.userId,
            password: state.login.password,
            checkBox: state.login.checkBox,
        }),
        dispatch => ({
            setId: (userId) => dispatch(setId(userId)),
            setPassword: (password) => dispatch(setPassword(password)),
            setCheckBox: () => dispatch(setCheckBox()),
            login: (navigation) => dispatch(login(navigation)),
            checkLogin: (navigation) => dispatch(checkLogin(navigation)),
        })
    ),
  
    lifecycle({
        componentDidMount() {
            console.log("Login Page");
            this.props.checkLogin(this.props.navigation);
        },
    }),
) (LoginScreen);
