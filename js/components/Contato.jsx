import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import { loginTextFieldStyle, loginBtnStyle, styleBlack } from '../styles/styles';
import { redirectConsulta, redirectHome } from '../actions/redirectActions';
import { changeContactName, changeContactContact, changeContactSubject,
    changeContactMessage } from '../actions/mainActions';
import { fetchMessage } from '../actions/fetchActions';
import { theme } from './Theme';

class ContactForm extends React.Component {
    static contextTypes = {
        router: PropTypes.shape({
            history: PropTypes.object.isRequired
        })
    };


    static propTypes = {
        loggedUser: PropTypes.string.isRequired,
        loggedUserPass: PropTypes.string.isRequired,
        router: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,
        contactName: PropTypes.string.isRequired,
        contactContact: PropTypes.string.isRequired,
        contactSubject: PropTypes.string.isRequired,
        contactMessage: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    state = {
        open: false
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

    redirHome = () => {
        const { router } = this.context;
        const { dispatch } = this.props;
        redirectHome(router, dispatch);
    };

    sendDatas = () => {
        this.setState({ open: true });

        const {
            contactName,
            contactContact,
            contactSubject,
            contactMessage
        } = this.props;

        this.props.dispatch(fetchMessage(contactName, contactContact, contactSubject, contactMessage));
    };

    handleCloseMessageAprovar = () => {
        const { router } = this.context;
        const { dispatch } = this.props;
        redirectHome(router, dispatch);
    };

    handleChangeName = (component) => {
        const text = component.target.value;
        this.props.dispatch(changeContactName(text));
    };


    handleChangeContact = (component) => {
        const text = component.target.value;
        this.props.dispatch(changeContactContact(text));
    };


    handleChangeSubject = (component) => {
        const text = component.target.value;
        this.props.dispatch(changeContactSubject(text));
    };


    handleChangeMessage = (component) => {
        const text = component.target.value;
        this.props.dispatch(changeContactMessage(text));
    };


    render() {
        const {
            contactName, contactContact, contactSubject, contactMessage
        } = this.props;

        const actionsAprovar = [
            <FlatButton
                label="Fechar"
                primary
                onTouchTap={this.handleCloseMessageAprovar}
            />
        ];


        return (
            <MuiThemeProvider muiTheme={theme}>
                <div className="fill-parent login-bg vcenter" >

                    <Dialog
                        title="Obrigado"
                        actions={actionsAprovar}
                        modal
                        open={this.state.open || false}
                    >
                        Mensagem enviada com sucesso
                    </Dialog>


                    <div className="logobar" onClick={this.redirHome} />


                    <div className="contato">

                        <TextField
                            value={contactName}
                            floatingLabelText="Nome"
                            onChange={this.handleChangeName}
                            style={loginTextFieldStyle}
                            underlineStyle={styleBlack}
                            underlineFocusStyle={styleBlack}
                            floatingLabelStyle={styleBlack}
                            floatingLabelFocusStyle={styleBlack}
                            floatingLabelFixed
                        />

                        <TextField
                            value={contactContact}
                            onChange={this.handleChangeContact}
                            floatingLabelText="Contato"
                            style={loginTextFieldStyle}
                            underlineStyle={styleBlack}
                            underlineFocusStyle={styleBlack}
                            floatingLabelStyle={styleBlack}
                            floatingLabelFocusStyle={styleBlack}
                            floatingLabelFixed
                        />


                        <TextField
                            value={contactSubject}
                            onChange={this.handleChangeSubject}
                            floatingLabelText="Assunto"
                            style={loginTextFieldStyle}
                            underlineStyle={styleBlack}
                            underlineFocusStyle={styleBlack}
                            floatingLabelStyle={styleBlack}
                            floatingLabelFocusStyle={styleBlack}
                            floatingLabelFixed
                        />


                        <TextField
                            value={contactMessage}
                            onChange={this.handleChangeMessage}
                            floatingLabelText="Mensagem"
                            multiLine
                            style={loginTextFieldStyle}
                            underlineStyle={styleBlack}
                            underlineFocusStyle={styleBlack}
                            floatingLabelStyle={styleBlack}
                            floatingLabelFocusStyle={styleBlack}
                            floatingLabelFixed
                        />

                        <RaisedButton
                            fullWidth
                            label="Enviar"
                            primary
                            style={loginBtnStyle}
                            onTouchTap={this.sendDatas}
                        />
                    </div>
                    <div className="volt">

                        <RaisedButton
                            fullWidth
                            label="Voltar"
                            primary
                            style={loginBtnStyle}
                            onTouchTap={this.redirHome}
                        />
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
        loginErrorMsg,
        contactName,
        contactContact,
        contactSubject,
        contactMessage
    } = state;

    return {
        dispatch,
        loginUserName,
        loginPassword,
        isLoading,
        loggedUser,
        loggedUserPass,
        loginErrorMsg,
        contactName,
        contactContact,
        contactSubject,
        contactMessage,
        initialValues: {
            contactName
        }
    };
};

/*
// First decorate your component with reduxForm
ContactForm = reduxForm({
    form: 'ContactForm'
})(ContactForm);
*/
export default connect(mapStateToProps)(ContactForm);

