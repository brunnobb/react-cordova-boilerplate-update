import React, { PureComponent } from 'react'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'

const styles = (theme) => ({
	root: {
		flexGrow: 1
	},
	margin: {
		margin: theme.spacing(3)
	},
	topMargin: {
		marginTop: theme.spacing(20)
	},
	center: {
		textAlign: 'center'
	}
})

class StepLoadingPage extends PureComponent {
	static propTypes = {
		classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
		currentStep: PropTypes.number.isRequired,
		currentMax: PropTypes.number.isRequired,
		currentStepName: PropTypes.string.isRequired,
		displayText: PropTypes.string.isRequired,
		checkboxList: PropTypes.array
	}

	static defaultProps = { checkboxList: null }

	render() {
		const {
			classes,
			currentMax,
			currentStep,
			currentStepName,
			displayText,
			checkboxList
		} = this.props

		// MIN = Minimum expected value
		// MAX = Maximium expected value
		// Function to normalise the values (MIN / MAX could be integrated)
		const normalise = (value) => (value * 100) / currentMax

		let component = null
		if (checkboxList && checkboxList.length > 0) {
			component = (
				<List dense>
					{checkboxList.map((item) => {
						return (
							<ListItem key={item.uniqueId}>
								<ListItemIcon>
									<Checkbox
										edge='start'
										checked={item.checked}
										tabIndex={-1}
										disableRipple
									/>
								</ListItemIcon>
								<ListItemText primary={item.description} />
							</ListItem>
						)
					})}
				</List>
			)
		}

		let gridclass = (classes.margin, classes.topMargin)
		if (component) {
			gridclass = classes.margin
		}
		return (
			<div className={classes.root}>
				<Grid container>
					<Grid item xs={12} className={gridclass}>
						<Grid container>
							<Grid item xs={12} className={classNames(classes.margin)}>
								<Typography
									variant='overline'
									display='block'
									className={classes.center}
								>
									{displayText}
								</Typography>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={12} className={classNames(classes.center)}>
								<Typography variant='subtitle2' gutterBottom>
									{`${currentStepName} - ${currentStep} out of ${currentMax}`}
								</Typography>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={12} className={classNames(classes.margin)}>
								<LinearProgress
									variant='determinate'
									color='secondary'
									value={normalise(currentStep)}
								/>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							{component}
						</Grid>
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default withStyles(styles)(StepLoadingPage)
