import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Paper from '@material-ui/core/Paper'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import {
	changeGeneralMessageText,
	changeLoading,
	changePageData
} from '../../actions/mainActions.js'
import { redirectTarget } from '../../actions/redirectActions.js'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	margin: {
		margin: theme.spacing(1)
	},
	fullpage: {
		height: 'calc(100vh - 120px)',
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
	}
}))

const propTypes = {
	// showAnoSelector: PropTypes.bool
}

const defaultProps = {
	// showAnoSelector: true
}

const Home = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const reduxState = useSelector((state) => state.loggedUser)
	const [isClicked, setIsClicked] = useState(false)

	useEffect(() => {
		dispatch(changePageData('Home', false))
	}, [])

	const handleChangeMessage = () => {
		dispatch(changeGeneralMessageText('message?'))
	}

	const handleChangeLoading = () => {
		dispatch(changeLoading(true))
		setTimeout(() => {
			dispatch(changeLoading(false))
		}, 3000)
	}

	const handleChangeClicked = () => {
		setIsClicked(!isClicked)
	}

	const handleRedirectComponents = () => {
		redirectTarget('/user/components')
	}
	const handleRedirectDatabase = () => {
		redirectTarget('/user/database')
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
								Home - usuario {`${reduxState && reduxState.email}`}
							</Grid>

							<Grid item xs={12}>
								<Button
									variant='contained'
									color='primary'
									fullWidth
									onClick={handleChangeMessage}
								>
									Show message
								</Button>
							</Grid>

							<Grid item xs={12}>
								<Button
									variant='contained'
									color='primary'
									fullWidth
									onClick={handleChangeLoading}
								>
									Show loading
								</Button>
							</Grid>
							<Grid item xs={4}>
								<Button
									variant='contained'
									color='primary'
									fullWidth
									onClick={handleChangeClicked}
								>
									STATE TEST
								</Button>
							</Grid>
							<Grid item xs={4}>
								{`State is ${isClicked ? 'true' : 'false'}`}
							</Grid>

							<Grid item xs={12}>
								<Card className={classes.root}>
									<CardContent> Has predefined components</CardContent>
									<CardActions>
										<Button size='small' onClick={handleRedirectComponents}>
											Learn More
										</Button>
									</CardActions>
								</Card>
							</Grid>

							<Grid item xs={12}>
								<Card className={classes.root}>
									<CardContent>
										Has Support for pouchdb Database - using SQLite on mobile
										and webSQL on chrome
									</CardContent>
									<CardActions>
										<Button size='small' onClick={handleRedirectDatabase}>
											Learn More
										</Button>
									</CardActions>
								</Card>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>

			<BottomNavigation value={1} showLabels className={classes.bottomNav}>
				<BottomNavigationAction label='Back' icon={<ChevronLeftIcon />} />
				<BottomNavigationAction label='Next' icon={<ChevronLeftIcon />} />
				<BottomNavigationAction label='Other' icon={<ChevronLeftIcon />} />
			</BottomNavigation>
		</div>
	)
}

Home.propTypes = propTypes
Home.defaultProps = defaultProps

export default Home
