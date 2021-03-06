import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
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
	}
}))

const propTypes = {
	// showAnoSelector: PropTypes.bool
}

const defaultProps = {
	// showAnoSelector: true
}

const Database = (props) => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const reduxState = useSelector((state) => state.loggedUser)

	useEffect(() => {
		dispatch(changePageData('Database', true))
	}, [])

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
								Database
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</div>
	)
}

Database.propTypes = propTypes
Database.defaultProps = defaultProps

export default Database
