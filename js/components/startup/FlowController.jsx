import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import StepLoadingPage from '../shared/StepLoadingPage.jsx'
import { readUser } from '../../db/DbLocalStorage.js'
import { changeUser } from '../../actions/mainActions.js'
import { redirectHome, redirectLogin } from '../../actions/redirectActions.js'

class FlowController extends React.Component {
	static propTypes = {
		children: PropTypes.element,
		dispatch: PropTypes.func.isRequired,
		deviceIsReady: PropTypes.bool.isRequired,
		loggedUser: PropTypes.object
	}

	static defaultProps = {
		loggedUser: null,
		children: <></>
	}

	constructor(props) {
		super(props)
		this.state = {
			currentStep: 0,
			currentMax: 10,
			isLoaded: false,
			finished: false
		}
	}

	componentDidMount = () => {
		this.loadDataFromLocalstorage()
	}

	componentDidUpdate() {
		this.loadDataFromLocalstorage()
	}

	loadDataFromLocalstorage = () => {
		const { dispatch, deviceIsReady, loggedUser } = this.props
		const { finished, isLoaded } = this.state

		if (!deviceIsReady) {
			// Cordova is not loaded, so, wait
		} else if (!isLoaded) {
			this.loadSomething()
		} else if (!loggedUser || !loggedUser.email || !loggedUser.token) {
			const user = readUser()

			if (!user || !user.email || !user.token) {
				redirectLogin()
				return
			}
			dispatch(changeUser(user))
		} else if (!finished) {
			this.setState({
				finished: true
			})
			redirectHome()
		}
	}

	loadSomething = () => {
		const { currentStep, currentMax } = this.state
		const advance = () => {
			if (currentStep === currentMax) {
				this.setState({ isLoaded: true })
				return
			}
			const nextStep = currentStep + 1
			this.setState({ currentStep: nextStep })
		}
		setTimeout(advance, 300)
	}

	render() {
		const { children } = this.props
		const { currentStep, currentMax, isLoaded } = this.state

		if (!isLoaded) {
			return (
				<>
					<StepLoadingPage
						currentMax={currentMax}
						currentStep={currentStep}
						currentStepName={`currentStep:${currentStep}`}
						displayText='Loading'
					/>
				</>
			)
		}
		return <>{children}</>
	}
}

const mapStateToProps = (state) => {
	const { dispatch, deviceIsReady, loggedUser } = state

	return {
		dispatch,
		deviceIsReady,
		loggedUser
	}
}

export default connect(mapStateToProps)(FlowController)
