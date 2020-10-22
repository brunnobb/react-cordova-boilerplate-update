import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import Dialog from '@material-ui/core/Dialog'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = () => ({
	progressBar: {
		marginLeft: '16px'
	},
	loadingLabel: {
		marginLeft: '8px',
		marginRight: '8px'
	},
	loadingGrid: {
		margin: '8px'
	}
})

const LoadingPage = (props) => {
	const { isLoading, classes } = props
	return (
		<Dialog open={isLoading} title='Loading'>
			<Grid container spacing={0} direction='column' alignItems='center' justify='center'>
				<Grid item xs={12} className={classes.loadingGrid}>
					<CircularProgress className={classes.progressBar} />
					<Typography variant='subtitle1' className={classes.loadingLabel}>
						Loading
					</Typography>
				</Grid>
			</Grid>
		</Dialog>
	)
}

LoadingPage.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	classes: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
}

const mapStateToProps = (state) => {
	const { isLoading } = state

	return {
		isLoading
	}
}

export default connect(mapStateToProps)(withStyles(styles)(LoadingPage))
