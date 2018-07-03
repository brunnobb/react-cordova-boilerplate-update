import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import CircularProgress from 'material-ui/CircularProgress';
import PropTypes from 'prop-types';


import {
    loginTextFieldStyle, loginBtnStyle, loadingDivStyle, styleBlack
} from '../styles/styles';
import { changeLogin, changePass } from '../actions/mainActions';
import { fetchLogin } from '../actions/fetchActions';
import { redirectConsulta, redirectHome } from '../actions/redirectActions';
import { theme } from './Theme';


class Login extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        loginUserName: PropTypes.string.isRequired,
        loginPassword: PropTypes.string.isRequired,
        loggedUser: PropTypes.string.isRequired,
        loggedUserPass: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired,
        loginErrorMsg: PropTypes.string.isRequired
    };

    static contextTypes = {
        router: PropTypes.shape({
            history: PropTypes.object.isRequired
        })
    };

    componentDidMount() {
        const { loggedUser, loggedUserPass } = this.props;
        const { router } = this.context;
        const { dispatch } = this.props;
        if (loggedUser && loggedUserPass) {
            redirectConsulta(router, '', dispatch);
        }
    }

    componentDidUpdate() {
        const { loggedUser, loggedUserPass } = this.props;
        const { router } = this.context;
        const { dispatch } = this.props;
        if (loggedUser && loggedUserPass) {
            redirectConsulta(router, '', dispatch);
        }
    }

    handleChangeLogin = (loginComponent) => {
        const loginText = loginComponent.target.value;
        this.props.dispatch(changeLogin(loginText));
    };

    redirHome = () => {
        const { router } = this.context;
        const { dispatch } = this.props;
        redirectHome(router, dispatch);
    };

    executeLogin = () => {
        console.log('carai');
        const { loginUserName, loginPassword, dispatch } = this.props;
        dispatch(fetchLogin(loginUserName, loginPassword));
    };

    handleChangePass = (passComponent) => {
        const passText = passComponent.target.value;
        this.props.dispatch(changePass(passText));
    };


    render() {
        const {
            loginUserName, loginPassword, isLoading, loginErrorMsg
        } = this.props;
        let progressDiv;
        if (isLoading) {
            progressDiv = (
                <div className="fill-parent loading-bg vcenter">
                    <div className="loadingDiv">
                        <CircularProgress size={100} thickness={7} color="White" style={loadingDivStyle} />
                    </div>
                </div>
            );
        }


        return (
            <MuiThemeProvider muiTheme={theme}>
                <div className="fill-parent login-bg vcenter">
                    { progressDiv }
                    <div className="logobar" onClick={this.redirHome} />

                    <div className="loginDiv loginSize">
                        <div className="inline half-width">
                            <div className="fill-parent overlay-bg">
                                <div className="width100">
                                    <div>
                                        <TextField
                                            value={loginUserName}
                                            onChange={this.handleChangeLogin}
                                            floatingLabelText="Usuário"
                                            errorText={loginErrorMsg}
                                            style={loginTextFieldStyle}
                                            underlineStyle={styleBlack}
                                            underlineFocusStyle={styleBlack}
                                            floatingLabelStyle={styleBlack}
                                            floatingLabelFocusStyle={styleBlack}
                                            floatingLabelFixed
                                        />

                                    </div>

                                    <div>

                                        <TextField
                                            value={loginPassword}
                                            onChange={this.handleChangePass}
                                            floatingLabelText="Senha"
                                            type="password"
                                            style={loginTextFieldStyle}
                                            underlineStyle={styleBlack}
                                            underlineFocusStyle={styleBlack}
                                            floatingLabelStyle={styleBlack}
                                            floatingLabelFocusStyle={styleBlack}
                                            floatingLabelFixed
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="inline half-width loginBtnDiv ">
                            <RaisedButton
                                fullWidth
                                label="Entrar"
                                primary
                                style={loginBtnStyle}
                                onClick={this.executeLogin}
                            />

                        </div>
                    </div>
                </div>
            </MuiThemeProvider>


        );
    }
}

const mapStateToProps = (state) => {
    const {
        dispatch,
        loginUserName,
        loginPassword,
        isLoading,
        loggedUser,
        loggedUserPass,
        loginErrorMsg
    } = state;

    return {
        dispatch,
        loginUserName,
        loginPassword,
        isLoading,
        loggedUser,
        loggedUserPass,
        loginErrorMsg
    };
};

export default connect(mapStateToProps)(Login);
