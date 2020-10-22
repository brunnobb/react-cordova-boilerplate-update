import React from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'

import { changeDeviceIsReady } from '../actions/mainActions.js'

import LoadingPage from './shared/LoadingPage.jsx'
import GeneralMessage from './shared/GeneralMessage.jsx'
import FlowController from './startup/FlowController.jsx'

const styles = () => ({
	mainDiv: {
		flexGrow: 1,
		minHeight: '100%'
	}
})
class Template extends React.Component {
	static propTypes = {
		children: PropTypes.element,
		dispatch: PropTypes.func.isRequired,
		classes: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
	}

	static defaultProps = {
		children: <div />
	}

	componentDidMount() {
		const { dispatch } = this.props
		const isCordovaApp = !!window.cordova
		if (!isCordovaApp) {
			dispatch(changeDeviceIsReady())
		} else {
			document.addEventListener('deviceready', this.onDeviceReady, false)
			document.addEventListener('resume', this.onResume, false)
		}
	}

	onDeviceReady = () => {
		const { dispatch } = this.props
		if (document) {
			document.addEventListener(
				'backbutton',
				(e) => {
					e.preventDefault()
				},
				false
			)
		}

		dispatch(changeDeviceIsReady())
		console.log('Cordova Device Ready')
	}

	onResume = () => {
		console.log('On Resume')
	}

	render() {
		const { children, classes } = this.props
		return (
			<div className={classes.mainDiv}>
				<FlowController>
					<>
						<LoadingPage />
						<GeneralMessage />
						{children}
					</>
				</FlowController>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { dispatch } = state

	return {
		dispatch
	}
}

export default connect(mapStateToProps)(withStyles(styles)(Template))
