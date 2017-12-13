import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import UnlockIcon from 'material-ui/svg-icons/action/lock-open';
import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types';

import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

import { theme, appSecondaryColor } from './Theme';
import { loadingDivStyle, appNameStyle } from '../styles/styles';
import { fetchLogout } from '../actions/fetchActions';
import { redirectLogin, redirectContato } from '../actions/redirectActions';
import { version } from '../actions/mainActions';


class Template extends React.Component {
    static contextTypes = {
        router: PropTypes.shape({
            history: PropTypes.object.isRequired
        })
    };


    static propTypes = {
        children: PropTypes.element,
        isLoading: PropTypes.bool.isRequired,
        loggedUser: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired,
        loggedUserPass: PropTypes.string.isRequired
    };

    static defaultProps = {
        children: (<div />)
    };

    state = {
        drawerOpen: false
    };


    componentDidMount() {
        const { loggedUser, loggedUserPass } = this.props;
        const { router } = this.context;
        const { dispatch } = this.props;
        if (!loggedUser || !loggedUserPass) {
            redirectLogin(router, dispatch);
        }
    }

    componentDidUpdate() {
        const { loggedUser, loggedUserPass } = this.props;
        const { router } = this.context;
        const { dispatch } = this.props;
        if (!loggedUser || !loggedUserPass) {
            redirectLogin(router, dispatch);
        }
    }


    handleArea1Click = () => {
        const { router } = this.context;
        const { dispatch } = this.props;
        redirectLogin(router, dispatch);
    };

    handleArea2Click = () => {
        const { router } = this.context;
        const { dispatch } = this.props;
        redirectContato(router, dispatch);
    };

    handleExitClick = () => {
        this.props.dispatch(fetchLogout());
    };

    showDrawer = () => {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    };

    render() {
        const { loggedUser, isLoading } = this.props;
        let progressDiv;
        if (isLoading) {
            progressDiv = (
                <div className="fill-parent loading-bg vcenter" >
                    <div className="loadingDiv">
                        <CircularProgress size={100} thickness={7} color={'White'} style={loadingDivStyle} />
                    </div>
                </div>
            );
        }


        return (

            <MuiThemeProvider muiTheme={theme}>
                <div>
                    <Drawer
                        open={this.state.drawerOpen}
                        docked={false}
                        onRequestChange={drawerOpen => this.setState({ drawerOpen })}
                    >

                        <AppBar
                            title={`Usuário: ${loggedUser}`}
                            showMenuIconButton={false}
                        />
                        <div className="templateLogobar" />
                        <Divider />
                        <MenuItem
                            onClick={this.handleArea1Click}
                            rightIcon={<ChevronRight />}
                        >
                            Area 1
                        </MenuItem>
                        <Divider />
                        <MenuItem
                            onClick={this.handleArea2Click}
                            rightIcon={<ChevronRight />}
                        >
                            Area 2
                        </MenuItem>
                        <Divider />
                        <FlatButton
                            onTouchTap={this.handleExitClick}
                            backgroundColor={appSecondaryColor}
                            fullWidth
                            label="SAIR"
                            icon={(<UnlockIcon />)}
                        />
                    </Drawer>
                    <div className="fill-parent">
                        { progressDiv }
                        <AppBar
                            title={`Usuário: ${loggedUser}`}
                            showMenuIconButton
                            onLeftIconButtonTouchTap={this.showDrawer}
                            iconElementRight={
                                <div>
                                    <div className="versionFont">
                                        V{version}
                                    </div>
                                </div>
                            }
                        />
                        <div style={appNameStyle}>

                            {this.props.children}
                        </div>

                    </div>
                </div>

            </MuiThemeProvider>

        );
    }
}


const mapStateToProps = (state) => {
    const { loggedUser, loggedUserPass, isLoading } = state;

    return {
        loggedUser,
        loggedUserPass,
        isLoading
    };
};

export default withRouter(connect(mapStateToProps)(Template));
