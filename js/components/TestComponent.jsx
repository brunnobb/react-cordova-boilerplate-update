/* eslint jsx-a11y/no-static-element-interactions: 0 */ // --> OFF
/* eslint jsx-a11y/href-no-hash: 0 */ // --> OFF
/* eslint max-len: 0 */ // --> OFF
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { loginTextFieldStyle, loginBtnStyle, styleBlack } from '../styles/styles';
import { redirectConsulta, redirectHome } from '../actions/redirectActions';
import { changeContactName, changeContactContact, changeContactSubject, changeContactMessage } from '../actions/mainActions';
import { fetchMessage } from '../actions/fetchActions';
import { theme } from './Theme';


class MyCustomInput extends Component {
    render() {
        const { input: { value, onChange } } = this.props;
        return (
            <TextField
                value={value}
                onChange={onChange}
                floatingLabelText="Nome"
                style={loginTextFieldStyle}
                underlineStyle={styleBlack}
                underlineFocusStyle={styleBlack}
                floatingLabelStyle={styleBlack}
                floatingLabelFocusStyle={styleBlack}
                floatingLabelFixed
            />
        );
    }
}


export default MyCustomInput;
