import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { changeShowGeneralMessage } from '../../actions/mainActions'

import Strings from '../../helpers/strings'

const GeneralMessage = (props) => {
	const { dispatch, showGeneralMessage, generalMessageText } = props

	const handleModalClose = () => {
		dispatch(changeShowGeneralMessage(false))
	}

	return (
		<Dialog
			open={showGeneralMessage}
			onClose={handleModalClose}
			aria-labelledby='alert-mainmessage-title'
			aria-describedby='alert-mainmessage-description'
		>
			<DialogTitle id='alert-mainmessage-title'>{Strings.attention}</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-mainmessage-description'>
					{generalMessageText}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleModalClose} color='primary'>
					{Strings.OK}
				</Button>
			</DialogActions>
		</Dialog>
	)
}

GeneralMessage.propTypes = {
	dispatch: PropTypes.func.isRequired,
	showGeneralMessage: PropTypes.bool.isRequired,
	generalMessageText: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
	const { dispatch, showGeneralMessage, generalMessageText } = state

	return {
		dispatch,
		showGeneralMessage,
		generalMessageText
	}
}

export default connect(mapStateToProps)(GeneralMessage)
