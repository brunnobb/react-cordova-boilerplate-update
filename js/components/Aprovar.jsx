import React from 'react';
import { connect } from 'react-redux';

import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import UndoIcon from 'material-ui/svg-icons/content/undo';
import DoneIcon from 'material-ui/svg-icons/action/done';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import PropTypes from 'prop-types';

import { appSecondaryColor } from './Theme';
import {
    bottomNavParentStyle,
    bottomNavStyle,
    descriptionFieldStyle,
    sidePaddedDivStyle,
    leftListFieldStyle,
    rightListFieldStyle,
    listFieldStyle
} from '../styles/styles';

import { redirectConsulta } from '../actions/redirectActions';
import { fetchApproveSolicitacao } from '../actions/fetchActions';
import { closeMessageAprovar } from '../actions/mainActions';

class Aprovar extends React.Component {
    static contextTypes = {
        router: PropTypes.shape({
            history: PropTypes.object.isRequired
        })
    };

    static propTypes = {

        params: PropTypes.shape({
            filter: PropTypes.string.isRequired
        }).isRequired,
        solicitacaoList: PropTypes.arrayOf(PropTypes.shape({
            COD_SOCO: PropTypes.number.isRequired
        })).isRequired,
        dispatch: PropTypes.func.isRequired,
        loggedUser: PropTypes.string.isRequired,
        loggedUserPass: PropTypes.string.isRequired,
        showAprovarMessage: PropTypes.bool.isRequired,
        resultAprovar: PropTypes.string.isRequired
    };

    state = {
        selectedIndex: 0,
        open: false,
        proposedIndex: 0
    };

    select = (index) => {
        const { router } = this.context;
        this.setState({ proposedIndex: index });
        const { dispatch } = this.props;
        if (index === 0) {
            redirectConsulta(router, '', dispatch);
        } else {
            this.handleOpen();
        }
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleConfirmClose = () => {
        const { dispatch, solicitacaoList, loggedUser, loggedUserPass } = this.props;
        const { router } = this.context;

        const item = solicitacaoList.find(val => (val.COD_SOCO === parseInt(this.props.params.filter, 10)));

        this.setState({
            open: false,
            selectedIndex: this.state.proposedIndex
        });

        const approvalObj = {
            p_COD_EMPR: item.COD_EMPR,
            p_COD_FILI: item.COD_FILI,
            p_COD_SOCO: item.COD_SOCO,
            p_SEQ: item.SEQ,
            p_AF_AUTO: item.AF_AUTOMATICA,
            p_MENSAGEM: ''
        };

        console.log(approvalObj);

        dispatch(fetchApproveSolicitacao(router, loggedUser, loggedUserPass, approvalObj));
    };

    handleCloseMessageAprovar = () => {
        const { dispatch } = this.props;
        dispatch(closeMessageAprovar());
    }

    render() {
        const {
            solicitacaoList, showAprovarMessage, resultAprovar
        } = this.props;


        const item = solicitacaoList.find(val => (val.COD_SOCO === parseInt(this.props.params.filter, 10)));
        if (!item) { return null; }
        console.log(item);

        const actions = [
            <FlatButton
                label="Não"
                primary
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Sim"
                primary
                onTouchTap={this.handleConfirmClose}
            />
        ];

        const actionsAprovar = [
            <FlatButton
                label="Fechar"
                primary
                onTouchTap={this.handleCloseMessageAprovar}
            />
        ];

        let objProjeto = null;
        if (item.COD_PROJ) {
            objProjeto = (<TextField
                disabled
                multiLine
                style={listFieldStyle}
                floatingLabelText="Projeto"
                floatingLabelStyle={descriptionFieldStyle}
                floatingLabelFocusStyle={descriptionFieldStyle}
                value={item.COD_PROJ.toFixed(0)}
                fullWidth
            />);
        }

        return (
            <div style={bottomNavParentStyle}>
                <Dialog
                    title="Confirmação"
                    actions={actions}
                    modal
                    open={this.state.open}
                >
                    Deseja Aprovar a solicitação?
                </Dialog>

                <Dialog
                    title="Aprovação"
                    actions={actionsAprovar}
                    modal
                    open={showAprovarMessage}
                >
                    { resultAprovar }
                </Dialog>

                <div style={sidePaddedDivStyle}>
                    <TextField
                        disabled
                        multiLine
                        style={leftListFieldStyle}
                        floatingLabelText="Número da SC"
                        floatingLabelStyle={descriptionFieldStyle}
                        floatingLabelFocusStyle={descriptionFieldStyle}
                        value={item.COD_SOCO.toFixed(0)}
                    />
                    <TextField
                        disabled
                        multiLine
                        style={rightListFieldStyle}
                        floatingLabelText="Filial"
                        floatingLabelStyle={descriptionFieldStyle}
                        floatingLabelFocusStyle={descriptionFieldStyle}
                        value={`${item.COD_FILI} - ${item.NOME_FILIAL}`}
                    />

                    {objProjeto}

                    <TextField
                        disabled
                        multiLine
                        style={listFieldStyle}
                        floatingLabelText="Solicitante"
                        floatingLabelStyle={descriptionFieldStyle}
                        floatingLabelFocusStyle={descriptionFieldStyle}
                        value={item.NOME_SOLICITANTE}
                        fullWidth
                    />
                    <TextField
                        disabled
                        multiLine
                        style={listFieldStyle}
                        floatingLabelText="Centro de Custo"
                        floatingLabelStyle={descriptionFieldStyle}
                        floatingLabelFocusStyle={descriptionFieldStyle}
                        value={`${item.APLICA_CEFI} - ${item.DESC_CENTRO_CUSTO}`}
                        fullWidth
                    />
                    <TextField
                        disabled
                        multiLine
                        style={listFieldStyle}
                        floatingLabelText="Verba"
                        floatingLabelStyle={descriptionFieldStyle}
                        floatingLabelFocusStyle={descriptionFieldStyle}
                        value={`${item.COD_VERB} - ${item.DESC_VERBA}`}
                        fullWidth
                    />
                    <TextField
                        disabled
                        multiLine
                        style={listFieldStyle}
                        floatingLabelText="Ordem de Serviço"
                        floatingLabelStyle={descriptionFieldStyle}
                        floatingLabelFocusStyle={descriptionFieldStyle}
                        value={`${item.COD_ORSE} - ${item.DESC_ORDEM_SERVICO}`}
                        fullWidth
                    />
                    <TextField
                        disabled
                        multiLine
                        style={leftListFieldStyle}
                        floatingLabelText="Valor Unitário"
                        floatingLabelStyle={descriptionFieldStyle}
                        floatingLabelFocusStyle={descriptionFieldStyle}
                        value={`R$ ${item.VLR_ESTIMADO.toFixed(2)}`}
                        fullWidth
                    />
                    <TextField
                        disabled
                        multiLine
                        style={rightListFieldStyle}
                        floatingLabelText="Quantidade"
                        floatingLabelStyle={descriptionFieldStyle}
                        floatingLabelFocusStyle={descriptionFieldStyle}
                        value={`${item.QTD_SOLIC.toFixed(2)}`}
                        fullWidth
                    />
                    <TextField
                        disabled
                        style={leftListFieldStyle}
                        floatingLabelText="Total"
                        floatingLabelStyle={descriptionFieldStyle}
                        floatingLabelFocusStyle={descriptionFieldStyle}
                        value={`R$ ${item.VLR_TOTAL.toFixed(2)}`}
                        fullWidth
                    />
                    <TextField
                        disabled
                        multiLine
                        style={listFieldStyle}
                        floatingLabelText="Descrição"
                        floatingLabelStyle={descriptionFieldStyle}
                        floatingLabelFocusStyle={descriptionFieldStyle}
                        value={item.DESC_COMPL}
                        fullWidth
                    />

                    <TextField
                        disabled
                        multiLine
                        style={listFieldStyle}
                        floatingLabelText="Complemento da Descrição"
                        floatingLabelStyle={descriptionFieldStyle}
                        floatingLabelFocusStyle={descriptionFieldStyle}
                        value={item.OBSERVACAO}
                        fullWidth
                    />

                    <TextField
                        disabled
                        multiLine
                        style={listFieldStyle}
                        floatingLabelText="Motivo da Compra"
                        floatingLabelStyle={descriptionFieldStyle}
                        floatingLabelFocusStyle={descriptionFieldStyle}
                        value={item.MOTIVO}
                        fullWidth
                    />


                </div>
                <Paper zDepth={1} style={bottomNavStyle}>
                    <BottomNavigation selectedIndex={this.state.selectedIndex}>
                        <BottomNavigationItem
                            label="Retornar"
                            icon={<UndoIcon color={appSecondaryColor} />}
                            onTouchTap={() => this.select(0)}
                        />
                        <BottomNavigationItem
                            label="Aprovar"
                            icon={<DoneIcon color={appSecondaryColor} />}
                            onTouchTap={() => this.select(1)}
                        />
                    </BottomNavigation>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        loggedUser,
        loggedUserPass,
        isLoading,
        solicitacaoList,
        showAprovarMessage,
        resultAprovar
    } = state;

    return {
        loggedUser,
        loggedUserPass,
        isLoading,
        solicitacaoList,
        showAprovarMessage,
        resultAprovar
    };
};

export default connect(mapStateToProps)(Aprovar);
