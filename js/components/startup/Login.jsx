import React from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { fetchExecuteLogin } from '../../actions/fetchActions'

import { LOGO_BIG_KEY } from '../../helpers/constantKeys.js'

import ImageFile from '../shared/ImageFile.jsx'

const styles = (theme) => ({
	root: {
		flexGrow: 1
	},
	margin: {
		margin: theme.spacing(1)
	},
	bigMargin: {
		margin: theme.spacing(2)
	},
	fullWidth: {
		width: '100%'
	},
	btnIconMargin: {
		marginRight: theme.spacing(1)
	},
	lateralMargin: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	topMargin: {
		marginTop: theme.spacing(5)
	},
	fullpage: {
		height: 'calc(100vh - 75px)',
		overflow: 'scroll',
		'-webkit-overflow-scrolling': 'touch',
		'& > *': {
			'-webkit-transform': 'translateZ(0px)'
		}
	},
	bottomNav: {
		position: 'fixed',
		bottom: 0,
		width: '100%'
	},

	icon: {
		margin: theme.spacing(2)
	},
	flexPaper: {
		display: 'flex',
		margin: '10px'
	},
	imageDiv: {
		marginTop: theme.spacing(3),
		textAlign: 'center'
	},
	logoImage: {
		height: '50px'
	},
	textField: {
		width: 'calc(100% - 16px)'
	},
	submitBtn: {
		width: 'calc(100% - 16px)',
		marginBottom: theme.spacing(2)
	}
})

class Login extends React.Component {
	static propTypes = {
		classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
		dispatch: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props)

		this.state = { txtname: '', txtpass: '' }
	}

	handleConfirm = () => {
		const { dispatch } = this.props
		const { txtname, txtpass } = this.state
		dispatch(fetchExecuteLogin(txtname, txtpass))
	}

	handleChangeText = (name) => (component) => {
		this.setState({
			[name]: component.target.value
		})
	}

	goBack = () => {
		// no go back
	}

	render() {
		const { classes } = this.props

		const { txtname, txtpass } = this.state

		return (
			<div className={classes.root}>
				<Grid container>
					<Grid item xs={12} className={classes.margin}>
						<Paper
							className={classNames(classes.root, classes.fullpage, classes.padding)}
							elevation={1}
						>
							<Grid container>
								<Grid item xs={12}>
									<div className={classes.imageDiv}>
										<ImageFile
											imageKey={LOGO_BIG_KEY}
											alt='LogoIcon'
											className={classes.logoImage}
										/>
									</div>
								</Grid>

								<form className={classNames(classes.fullWidth)}>
									<Grid
										item
										xs={12}
										className={classNames(classes.margin, classes.topMargin)}
									>
										<Paper className={classes.root} elevation={1}>
											<Grid container item xs={12} className={classes.margin}>
												<Grid item xs={12}>
													<TextField
														inputProps={{
															autoComplete: 'username'
														}}
														label='Username'
														placeholder='Type your username'
														className={classes.textField}
														margin='normal'
														autoFocus
														value={txtname}
														onChange={this.handleChangeText('txtname')}
													/>
												</Grid>
												<Grid item xs={12}>
													<TextField
														inputProps={{
															autoComplete: 'current-password'
														}}
														label='Password'
														placeholder='Type your password'
														className={classes.textField}
														margin='normal'
														type='password'
														value={txtpass}
														onChange={this.handleChangeText('txtpass')}
													/>
												</Grid>

												<Grid item xs={12} className={classes.bigMargin}>
													<Button
														color='primary'
														variant='contained'
														onClick={this.handleConfirm}
														className={classes.submitBtn}
													>
														Login
													</Button>
												</Grid>
											</Grid>
										</Paper>
									</Grid>
								</form>
							</Grid>
						</Paper>

						<BottomNavigation value={1} showLabels className={classes.bottomNav}>
							<BottomNavigationAction
								label='Back'
								icon={<ChevronLeftIcon />}
								onClick={this.goBack}
							/>
						</BottomNavigation>
					</Grid>
				</Grid>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { dispatch, selectedRole } = state

	return {
		dispatch,
		selectedRole
	}
}

export default connect(mapStateToProps)(withStyles(styles)(Login))
