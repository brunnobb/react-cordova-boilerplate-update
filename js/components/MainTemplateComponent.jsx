import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';

import CircularProgress from 'material-ui/CircularProgress';
import Drawer from 'material-ui/Drawer';
import UnlockIcon from 'material-ui/svg-icons/action/lock-open';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';


import { theme, appSecondaryColor } from './Theme';
import { loadingDivStyle, appNameStyle } from '../styles/styles';
import { fetchLogout } from '../actions/fetchActions';
import { redirectLogin, redirectContato } from '../actions/redirectActions';
import { version } from '../actions/mainActions';


const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Template extends React.Component {
    static propTypes = {
        children: PropTypes.element,
        isLoading: PropTypes.bool.isRequired,
        loggedUser: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired,
        loggedUserPass: PropTypes.string.isRequired
    };


    static contextTypes = {
        router: PropTypes.shape({
            history: PropTypes.object.isRequired
        })
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
        const { loggedUser, isLoading, classes  } = this.props;
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

            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <div>
                    <Drawer
                        open={this.state.drawerOpen}
                        docked={false}
                        onRequestChange={drawerOpen => this.setState({ drawerOpen })}
                    >

                        <AppBar>
                            <Toolbar>
                                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="title" color="inherit" className={classes.flex}>
                                    {`Usuário: ${loggedUser}`}
                                </Typography>
                            </Toolbar>
                        </AppBar>

                   


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
                        >Area 2</MenuItem>
                        <Divider />
                        <Button
                            onClick={this.handleExitClick}
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
                            onLeftIconButtonClick={this.showDrawer}
                            iconElementRight={(
                                <div>
                                    <div className="versionFont">V 
                                        {version}
                                    </div>
                                </div>
                            )}
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

export default withStyles(styles)(withRouter(connect(mapStateToProps)(Template)));
