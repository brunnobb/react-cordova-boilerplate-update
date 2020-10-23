import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import Strings from '../../helpers/strings.js'

const ConfirmDialog = (props) => {
	const { handleConfirm, handleCancel, handleGoBack, message, isVisible } = props

	return (
		<Dialog
			disableBackdropClick
			disableEscapeKeyDown
			open={isVisible}
			onClose={handleCancel}
			aria-labelledby='confirmation-mainmessage-title'
			aria-describedby='confirmation-mainmessage-description'
		>
			<DialogTitle id='confirmation-mainmessage-title'>{Strings.confirmation}</DialogTitle>
			<DialogContent>
				<DialogContentText id='confirmation-mainmessage-description'>
					{message}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				{handleGoBack && (
					<Button onClick={handleGoBack} color='primary'>
						{Strings.goBack}
					</Button>
				)}
				<Button onClick={handleCancel} color='primary'>
					{Strings.No}
				</Button>
				<Button onClick={handleConfirm} color='primary'>
					{Strings.Yes}
				</Button>
			</DialogActions>
		</Dialog>
	)
}

ConfirmDialog.propTypes = {
	handleConfirm: PropTypes.func.isRequired,
	handleCancel: PropTypes.func.isRequired,
	message: PropTypes.string.isRequired,
	isVisible: PropTypes.bool.isRequired,
	handleGoBack: PropTypes.func
}

ConfirmDialog.defaultProps = {
	handleGoBack: null
}

export default ConfirmDialog
