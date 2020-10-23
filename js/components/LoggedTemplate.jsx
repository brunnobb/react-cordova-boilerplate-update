import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Divider from '@material-ui/core/Divider'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import AccountIcon from '@material-ui/icons/AccountCircle'

import BookIcon from '@material-ui/icons/Book'
import HomeIcon from '@material-ui/icons/Home'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import Grid from '@material-ui/core/Grid'

import Strings from '../helpers/strings.js'

import { redirectBack, redirectHome, redirectTarget } from '../actions/redirectActions.js'
import ImageFile from './shared/ImageFile.jsx'
import Logo from '../../resources/static/logo-bar.png'

const drawerWidth = '80%'

const styles = (theme) => ({
	flex: {
		flex: 1
	},
	flexDiv: {
		flex: 1,
		display: 'inline-flex'
	},
	margin: {
		margin: theme.spacing(1)
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	menuBorderBottom: {
		// 'border-bottom': `3px solid ${theme.palette.primary.light}`
		'border-bottom': `3px solid ${theme.palette.secondary.dark}` /* mz - check with brunno, use secondary.dark for more contrast */
	},
	logoStyle: {
		maxHeight: '35px',
		marginRight: '15px'
	},
	imageDiv: {
		textAlign: 'center'
	},
	image: {
		height: '80px'
	},
	fullWidth: {
		flexGrow: '1'
	},
	backBtnMargin: {
		marginTop: '4px'
	},
	nested: {
		paddingLeft: theme.spacing(4)
	},
	nested2: {
		paddingLeft: theme.spacing(8)
	},
	imgBtn: {
		height: '24px',
		width: '18px'
	},
	imgBtnSquare: {
		height: '24px',
		width: '24px'
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: '0 8px',
		...theme.mixins.toolbar,
		justifyContent: 'flex-end'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	logoImage: {
		height: '100%',
		maxHeight: '80px'
	}
})

class LoggedTemplate extends React.Component {
	static propTypes = {
		children: PropTypes.element,
		classes: PropTypes.object.isRequired,
		loggedUser: PropTypes.object,
		screenName: PropTypes.string.isRequired,
		showBackButton: PropTypes.bool.isRequired
	}

	static defaultProps = {
		children: <div />,
		loggedUser: null
	}

	constructor(props) {
		super(props)
		this.state = {
			drawerOpen: false
		}
	}

	handleToggle = (setOpen) => {
		this.setState({ drawerOpen: setOpen })
	}

	handleRedirectHome = () => {
		this.setState({ drawerOpen: false })
		redirectHome()
	}

	handleBackToLastPage = () => {
		const { showBackButton } = this.props
		if (!showBackButton) return
		redirectBack()
	}

	redirectToPage = (page) => () => {
		this.setState({ drawerOpen: false })
		redirectTarget(page)
	}

	render() {
		const { children, classes, screenName, loggedUser, showBackButton } = this.props

		const { drawerOpen } = this.state

		const extraActions = null

		const actualLogo = showBackButton ? (
			<ArrowBackIos className={classes.backBtnMargin} onClick={this.handleBackToLastPage} />
		) : null

		const isDrawerOpen = drawerOpen || false

		let username = 'no username defined'
		if (loggedUser && loggedUser.email) {
			username = loggedUser.email
		}

		const templatesList = []
		templatesList.push(
			<ListItem key='a' button onClick={this.redirectToPage('/user/home')}>
				<ListItemIcon>
					<BookIcon />
				</ListItemIcon>
				<ListItemText primary='Home' />
			</ListItem>
		)

		return (
			<div>
				<AppBar position='static' className={classes.menuBorderBottom}>
					<Toolbar variant='dense'>
						<IconButton
							key='iconButtonToggle'
							className={classes.menuButton}
							color='inherit'
							aria-label='Menu'
							onClick={() => this.handleToggle(true)}
						>
							<MenuIcon />
						</IconButton>
						<div className={classes.flexDiv}>
							{actualLogo}
							<Typography
								className={classes.fullWidth}
								variant='h6'
								color='inherit'
								key='typography'
								onClick={this.handleBackToLastPage}
							>
								{screenName}
							</Typography>
						</div>
						{extraActions}
					</Toolbar>
				</AppBar>

				<SwipeableDrawer
					open={isDrawerOpen}
					onClose={() => this.handleToggle(false)}
					onOpen={() => this.handleToggle(true)}
					className={classes.drawer}
					classes={{
						paper: classes.drawerPaper
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={() => this.handleToggle(false)}>
							<ChevronLeftIcon />
						</IconButton>
					</div>

					<Grid container>
						<Grid item xs={12}>
							<Grid item xs={12}>
								<div className={classes.imageDiv}>
									<ImageFile
										src={Logo}
										alt='LogoIcon'
										className={classes.logoImage}
									/>
								</div>
							</Grid>

							<List component='nav'>
								<ListItem>
									<ListItemIcon>
										<AccountIcon />
									</ListItemIcon>
									<ListItemText
										primary={Strings.formatString(
											Strings.CurrentUser,
											username
										)}
									/>
								</ListItem>

								<Divider />

								<ListItem button onClick={this.handleRedirectHome}>
									<ListItemIcon>
										<HomeIcon />
									</ListItemIcon>
									<ListItemText primary={Strings.Home} />
								</ListItem>

								<Divider />

								{templatesList}

								<Divider />
							</List>
						</Grid>
					</Grid>
				</SwipeableDrawer>

				{children}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { loggedUser, screenName, showBackButton } = state

	return {
		loggedUser,
		screenName,
		showBackButton
	}
}

export default connect(mapStateToProps)(withStyles(styles)(LoggedTemplate))
