import React from 'react';
import { connect } from 'react-redux';
import {
    Table, TableBody, TableHeader,
    TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import ListIcon from 'material-ui/svg-icons/action/list';
import DoneIcon from 'material-ui/svg-icons/action/done';
import CachedIcon from 'material-ui/svg-icons/action/cached';
import SearchIcon from 'material-ui/svg-icons/action/search';
import CopyIcon from 'material-ui/svg-icons/content/content-copy';
import BackPageIcon from 'material-ui/svg-icons/navigation/chevron-left';
import NextPageIcon from 'material-ui/svg-icons/navigation/chevron-right';
import FirstPageIcon from 'material-ui/svg-icons/navigation/first-page';
import LastPageIcon from 'material-ui/svg-icons/navigation/last-page';

import ExpandLessIcon from 'material-ui/svg-icons/navigation/expand-less';
import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';

import { appSecondaryColor, grayDisabledColor } from './Theme';
import {
    listButtonStyle,
    tableRowStyle,
    updateToolbarStyle,
    updateToolbarButtonStylePortrait,
    searchTextStyle,
    searchToolbarStyle,
    searchButtonStyle,
    bottomNavStyle,
    bottomNavParentStyle,
    listButtonHeaderStyle,
    tableRowStyleIcon,
    tableRowStyleVal,
    tableRowStyleCod
} from '../styles/styles';

import {
    callChangePage,
    callChangeOrder,
    callChangePageFilter,
    callChangeOrderType,
    resetFetchSolicitacaoList,
    callChangePageFilterActive,
    closeMessageAprovar
} from '../actions/mainActions';
import { redirectDetalhes } from '../actions/redirectActions';
import { fetchApproveSolicitacao, fetchSolicitacaoList } from '../actions/fetchActions';

class SolicitacaoList extends React.Component {
    static contextTypes = {
        router: PropTypes.shape({
            history: PropTypes.object.isRequired
        })
    };


    static propTypes = {

        dispatch: PropTypes.func.isRequired,
        hasToFetchSolicitacao: PropTypes.bool.isRequired,
        loggedUser: PropTypes.string.isRequired,
        loggedUserPass: PropTypes.string.isRequired,
        solicitacaoList: PropTypes.arrayOf(PropTypes.shape({
            COD_SOCO: PropTypes.number.isRequired
        })).isRequired,
        listPageNo: PropTypes.number.isRequired,
        listFilter: PropTypes.string.isRequired,
        listFilterActive: PropTypes.string.isRequired,
        listOrderColumn: PropTypes.string.isRequired,
        listOrderType: PropTypes.string.isRequired,
        showAprovarMessage: PropTypes.bool.isRequired,
        resultAprovar: PropTypes.string.isRequired
    }

    state = {
        pageSize: 5,
        dialogOpen: false,
        codSoco: 0
    };

    componentDidMount() {
        const {
            dispatch,
            hasToFetchSolicitacao,
            loggedUser,
            loggedUserPass
        } = this.props;
        console.log(`fetch ${hasToFetchSolicitacao}`);
        if (hasToFetchSolicitacao) {
            dispatch(fetchSolicitacaoList(loggedUser, loggedUserPass));
        }
    }

    componentDidUpdate() {
        const {
            dispatch,
            hasToFetchSolicitacao,
            loggedUser,
            loggedUserPass
        } = this.props;
        if (hasToFetchSolicitacao) {
            dispatch(fetchSolicitacaoList(loggedUser, loggedUserPass));
        }
    }


    openDetails = (codSoco) => {
        const { router } = this.context;
        const { dispatch } = this.props;
        redirectDetalhes(router, codSoco, dispatch);
    }

    openConfirm = (codSoco) => {
        this.setState({
            dialogOpen: true,
            codSoco
        });
    }

    handleClose = () => {
        this.setState({ dialogOpen: false });
    };

    handleConfirmClose = () => {
        this.setState({
            dialogOpen: false
        });

        const {
            dispatch, solicitacaoList, loggedUser, loggedUserPass
        } = this.props;
        const { router } = this.context;

        const item = solicitacaoList.find(val => (val.COD_SOCO === this.state.codSoco));

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

    switchPage = (pageNo) => {
        const { dispatch } = this.props;
        dispatch(callChangePage(pageNo));
    };

    switchOrder = (order) => {
        let orderType = 'ASC';
        const { dispatch, listOrderColumn, listOrderType } = this.props;
        if (order === listOrderColumn) {
            if (orderType === listOrderType) {
                orderType = 'DESC';
            }
            dispatch(callChangeOrderType(orderType));
            dispatch(callChangePage(1));
        } else {
            dispatch(callChangeOrder(order));
            dispatch(callChangeOrderType(orderType));
            dispatch(callChangePage(1));
        }
    };

    handleChangeFilter = (filterComponent) => {
        const filterText = filterComponent.target.value;
        this.props.dispatch(callChangePageFilter(filterText));
    };

    handleResetSolicitacao = () => {
        this.props.dispatch(resetFetchSolicitacaoList());
    };

    handleChangeActiveFilter = () => {
        this.props.dispatch(callChangeOrderType('ASC'));
        this.props.dispatch(callChangePage(1));
        this.props.dispatch(callChangePageFilterActive(this.props.listFilter));
    };

    handleCloseMessageAprovar = () => {
        const { dispatch } = this.props;
        dispatch(closeMessageAprovar());
    }

    render() {
        const {
            solicitacaoList,
            listPageNo,
            listFilter,
            listFilterActive,
            listOrderColumn,
            listOrderType,
            showAprovarMessage,
            resultAprovar
        } = this.props;
        const actions = [
            <FlatButton
                label="Não"
                primary
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Sim"
                primary
                onClick={this.handleConfirmClose}
            />
        ];

        const filterOrderPipeline = [
            // funcao de filtro
            array => array.filter(item => (
                (item.COD_SOCO === parseInt(listFilterActive, 10))
                || (item.NOME_SOLICITANTE.toUpperCase().includes(listFilterActive.toUpperCase())
                ))),
            // funcao de ordernacao
            (array) => {
                if (listOrderColumn === '') return array;
                if (listOrderColumn === 'COD_SOCO') return array.sort((a, b) => (a.COD_SOCO - b.COD_SOCO));
                if (listOrderColumn === 'NOME_SOLICITANTE') {
                    return array.sort((a, b) => (a.NOME_SOLICITANTE.localeCompare(b.NOME_SOLICITANTE)
                    ));
                }
                if (listOrderColumn === 'VLR_TOTAL') return array.sort((a, b) => (a.VLR_TOTAL - b.VLR_TOTAL));
                return array;
            },
            // reverser se precisar
            (array) => {
                if (listOrderType === 'ASC') { return array; }
                return array.reverse();
            }
        ];

        // roda a lista pela pipeline de filtro
        let finalList = filterOrderPipeline.reduce((xs, f) => f(xs), solicitacaoList);
        const pages = Math.ceil(finalList.length / this.state.pageSize);

        // seleciona os itens da pagina selecionada
        finalList = finalList.slice(
            (this.state.pageSize * (listPageNo - 1)),
            (this.state.pageSize * listPageNo)
        );

        const listItems = finalList.map(solicitacao => (
            <TableRow key={solicitacao.COD_SOCO}>
                <TableRowColumn style={tableRowStyleCod}>
                    {solicitacao.COD_SOCO}
                </TableRowColumn>
                <TableRowColumn style={tableRowStyle}>
                    {solicitacao.NOME_SOLICITANTE}
                </TableRowColumn>
                <TableRowColumn style={tableRowStyleVal}>
                    {`R$ ${solicitacao.VLR_TOTAL.toFixed(2)}`}
                </TableRowColumn>
                <TableRowColumn style={tableRowStyleIcon}>
                    <FlatButton
                        fullWidth
                        onClick={() => { this.openDetails(solicitacao.COD_SOCO); }}
                        target="_blank"
                        secondary
                        icon={<ListIcon color={appSecondaryColor} />}
                        style={listButtonStyle}
                    />
                </TableRowColumn>
                <TableRowColumn style={tableRowStyleIcon}>
                    <FlatButton
                        fullWidth
                        onClick={() => { this.openConfirm(solicitacao.COD_SOCO); }}
                        target="_blank"
                        secondary
                        icon={<DoneIcon color={appSecondaryColor} />}
                        style={listButtonStyle}
                    />
                </TableRowColumn>
            </TableRow>
        ));
        let backPage = (listPageNo - 1);
        let backPage2 = (listPageNo - 2);
        let nextPage = (listPageNo + 1);
        let nextPage2 = (listPageNo + 2);
        if (backPage < 1) backPage = listPageNo;
        if (backPage2 < 1) backPage2 = listPageNo;
        if (nextPage > pages) nextPage = pages;
        if (nextPage2 > pages) nextPage2 = pages;


        // filtra apenas os distinct da lista
        const pagelist = [backPage2, backPage, listPageNo, nextPage, nextPage2]
            .filter((elem, pos, arr) => arr.indexOf(elem) === pos);

        let realPageList = [];

        if (pages === 0) {
            realPageList = [0];
        } else if (pagelist.length <= 3) realPageList = pagelist;
        else {
            const idx = pagelist.indexOf(listPageNo);
            let inc = 1;
            let dir = 'u';

            realPageList.push(pagelist[idx]);
            while (realPageList.length < 3) {
                if (dir === 'u') {
                    if ((idx + inc) < pagelist.length) {
                        realPageList.push(pagelist[(idx + inc)]);
                    }

                    dir = 'd';
                }

                if (dir === 'd') {
                    if ((idx - inc) > 0) {
                        realPageList.push(pagelist[(idx - inc)]);
                    }
                    inc += 1;
                    dir = 'u';
                }
            }
        }
        realPageList = realPageList.sort((a, b) => (a - b));


        const pageSelectionPages = realPageList.map(page => (
            <BottomNavigationItem
                key={page}
                label={page}
                onClick={() => { this.switchPage(page); }}
                icon={<CopyIcon color={appSecondaryColor} />}
                style={listButtonStyle}
            />
        ));


        const pageSelectionList = (
            <Paper zDepth={1} style={bottomNavStyle}>
                <BottomNavigation selectedIndex={(realPageList.indexOf(listPageNo) + 2)}>
                    <BottomNavigationItem
                        label="Inicio"
                        icon={<FirstPageIcon color={appSecondaryColor} />}
                        onClick={() => { this.switchPage(1); }}
                        style={listButtonStyle}
                    />
                    <BottomNavigationItem
                        label="Voltar"
                        icon={<BackPageIcon color={appSecondaryColor} />}
                        onClick={() => { this.switchPage(backPage); }}
                        style={listButtonStyle}
                    />
                    {pageSelectionPages}
                    <BottomNavigationItem
                        label="Prox"
                        icon={<NextPageIcon color={appSecondaryColor} />}
                        onClick={() => { this.switchPage(nextPage); }}
                        style={listButtonStyle}
                    />
                    <BottomNavigationItem
                        label="Fim"
                        icon={<LastPageIcon color={appSecondaryColor} />}
                        onClick={() => { this.switchPage(pages); }}
                        style={listButtonStyle}
                    />
                </BottomNavigation>
            </Paper>
        );

        let iconCodSoco = null;
        let iconNomeSolicitante = null;
        let iconVlrTotal = null;

        if (listOrderColumn === 'COD_SOCO') {
            iconCodSoco = (<ExpandLessIcon color={grayDisabledColor} viewBox="0 0 24 10" />);
            if (listOrderType === 'ASC') {
                iconCodSoco = (<ExpandMoreIcon color={grayDisabledColor} viewBox="0 0 24 10" />);
            }
        }

        if (listOrderColumn === 'NOME_SOLICITANTE') {
            iconNomeSolicitante = (<ExpandLessIcon color={grayDisabledColor} viewBox="0 0 24 10" />);
            if (listOrderType === 'ASC') {
                iconNomeSolicitante = (<ExpandMoreIcon color={grayDisabledColor} viewBox="0 0 24 10" />);
            }
        }

        if (listOrderColumn === 'VLR_TOTAL') {
            iconVlrTotal = (<ExpandLessIcon color={grayDisabledColor} viewBox="0 0 24 10" />);
            if (listOrderType === 'ASC') {
                iconVlrTotal = (<ExpandMoreIcon color={grayDisabledColor} viewBox="0 0 24 10" />);
            }
        }

        const actionsAprovar = [
            <FlatButton
                label="Fechar"
                primary
                onClick={this.handleCloseMessageAprovar}
            />
        ];

        return (
            <div>
                <div className="templateLogobar" />
                <p>







                    Solicitações de Compra
</p>

                <div style={bottomNavParentStyle}>

                    <Dialog
                        title="Confirmação"
                        actions={actions}
                        modal
                        open={this.state.dialogOpen}
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


                    <Toolbar style={searchToolbarStyle}>
                        <ToolbarGroup firstChild style={updateToolbarStyle}>

                            <RaisedButton
                                label=""
                                primary
                                style={updateToolbarButtonStylePortrait}
                                icon={<CachedIcon color={appSecondaryColor} />}
                                onClick={() => { this.handleResetSolicitacao(); }}
                            />


                        </ToolbarGroup>
                        <ToolbarGroup>
                            <TextField
                                hintText="FILTRO"
                                style={searchTextStyle}
                                value={listFilter}
                                onChange={this.handleChangeFilter}
                            />
                            <RaisedButton
                                label="OK"
                                primary
                                style={searchButtonStyle}
                                icon={<SearchIcon color={appSecondaryColor} />}
                                onClick={() => { this.handleChangeActiveFilter(); }}
                            />
                        </ToolbarGroup>
                    </Toolbar>


                    <Table>
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                        >
                            <TableRow>
                                <TableHeaderColumn style={tableRowStyleCod}>
                                    <div
                                        style={listButtonHeaderStyle}
                                        onClick={() => { this.switchOrder('COD_SOCO'); }}
                                    >







                                        COD
{' '}
                                        {iconCodSoco}
                                    </div>
                                </TableHeaderColumn>
                                <TableHeaderColumn style={tableRowStyle}>
                                    <div
                                        style={listButtonHeaderStyle}
                                        onClick={() => { this.switchOrder('NOME_SOLICITANTE'); }}
                                    >







                                        Solic.
{' '}
                                        {iconNomeSolicitante}
                                    </div>
                                </TableHeaderColumn>
                                <TableHeaderColumn style={tableRowStyleVal}>
                                    <div
                                        style={listButtonHeaderStyle}
                                        onClick={() => { this.switchOrder('VLR_TOTAL'); }}
                                    >







                                        Valor
{' '}
                                        {iconVlrTotal}
                                    </div>
                                </TableHeaderColumn>
                                <TableHeaderColumn style={tableRowStyleIcon}>







                                    Det.
</TableHeaderColumn>
                                <TableHeaderColumn style={tableRowStyleIcon}>







                                    Apr.
</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}
                        >
                            {listItems}
                        </TableBody>
                    </Table>
                    {pageSelectionList}
                </div>
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
        hasToFetchSolicitacao,
        listPageNo,
        listFilter,
        listFilterActive,
        listOrderColumn,
        listOrderType,
        showAprovarMessage,
        resultAprovar
    } = state;

    return {
        loggedUser,
        loggedUserPass,
        isLoading,
        solicitacaoList,
        hasToFetchSolicitacao,
        listPageNo,
        listFilter,
        listFilterActive,
        listOrderColumn,
        listOrderType,
        showAprovarMessage,
        resultAprovar
    };
};

export default connect(mapStateToProps)(SolicitacaoList);
