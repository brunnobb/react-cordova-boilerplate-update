import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { makeStyles } from '@material-ui/core/styles'

import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import Paper from '@material-ui/core/Paper'
import { changePageData } from '../../actions/mainActions.js'

import ImageFile from '../shared/ImageFile.jsx'
import ImgLogo from '../../../resources/static/logo-bar.png'
import ConfirmDialog from '../shared/ConfirmDialog.jsx'
import MaterialUiDatePicker from '../shared/MaterialUiDatePicker.jsx'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	margin: {
		margin: theme.spacing(1)
	},
	fullpage: {
		height: 'calc(100vh - 75px)',
		overflow: 'hidden',
		'-webkit-overflow-scrolling': 'touch',
		'& > *': {
			'-webkit-transform': 'translateZ(0px)'
		}
	},
	container: { marginTop: '20px' },
	centeredDivContent: {
		width: '100%',
		textAlign: 'center'
	},
	bottomNav: {
		position: 'fixed',
		bottom: 0,
		width: '100%'
	},
	image: {
		width: '100%'
	}
}))

const propTypes = {
	// showAnoSelector: PropTypes.bool
}

const defaultProps = {
	// showAnoSelector: true
}

const Components = () => {
	const classes = useStyles()
	const dispatch = useDispatch()

	const [state, setState] = useImmer({
		confirmDialogVisible: false,
		dateValue: null,
		timeValue: null
	})

	const { confirmDialogVisible, dateValue, timeValue } = state

	useEffect(() => {
		dispatch(changePageData('Components', true))
	}, [])

	const handleConfirmDialog = (visible) => () => {
		setState((draft) => {
			draft.confirmDialogVisible = visible
		})
	}

	const handleChangeDateProp = (propName) => (value) => {
		setState((draft) => {
			draft[propName] = value
		})
	}

	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item xs={12} className={classes.margin}>
					<Paper
						className={classNames(classes.root, classes.fullpage, classes.padding)}
						elevation={1}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} className={classes.centeredDivContent}>
								Components
							</Grid>
							<Grid item xs={12}>
								<Card className={classes.root}>
									<CardHeader
										title='Image'
										subheader=' with full scren support, lazy loading and local file access'
									/>
									<CardContent>
										<ImageFile
											src={ImgLogo}
											alt='LogoIcon'
											className={classes.image}
											enableFullScreen
										/>
									</CardContent>
								</Card>
							</Grid>

							<Grid item xs={12}>
								<Card className={classes.root}>
									<CardHeader title='Confirm dialog' />
									<CardContent>
										<Button onClick={handleConfirmDialog(true)}>
											Show dialog
										</Button>
									</CardContent>
								</Card>
								<ConfirmDialog
									isVisible={confirmDialogVisible}
									message='blablalba'
									handleGoBack={() => {}}
									handleConfirm={() => {}}
									handleCancel={handleConfirmDialog(false)}
								/>
							</Grid>

							<Grid item xs={12}>
								<Card className={classes.root}>
									<CardHeader title='DateTime pickers' />
									<CardContent>
										<MaterialUiDatePicker
											readOnly={false}
											type='date'
											fullWidth
											showTodayButton
											label='bbbbbb'
											placeholder='xxxx'
											clearable
											value={dateValue}
											onChange={handleChangeDateProp('dateValue')}
										/>
										<MaterialUiDatePicker
											readOnly={false}
											type='time'
											fullWidth
											showTodayButton
											label='bbbbbb'
											placeholder='xxxx'
											clearable
											value={timeValue}
											onChange={handleChangeDateProp('timeValue')}
										/>
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</div>
	)
}

Components.propTypes = propTypes
Components.defaultProps = defaultProps

export default Components
