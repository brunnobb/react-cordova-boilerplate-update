import React from 'react'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import Strings from '../../helpers/strings.js'

const styles = () => ({
	appBar: {
		position: 'relative'
	},
	flex: {
		flex: 1
	},
	fullWidth: {
		width: '100%'
	}
})

class ImageFileFullScreenModal extends React.Component {
	static propTypes = {
		classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
		handleClose: PropTypes.func.isRequired,
		isVisible: PropTypes.bool.isRequired,
		picValue: PropTypes.any.isRequired
	}

	transition = React.forwardRef(function Transition(props, ref) {
		return <Slide direction='up' ref={ref} {...props} />
	})

	render() {
		const { classes, handleClose, isVisible, picValue } = this.props

		return (
			<Dialog
				fullScreen
				open={isVisible}
				onClose={handleClose}
				TransitionComponent={this.transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton color='inherit' onClick={handleClose} aria-label='Close'>
							<CloseIcon />
						</IconButton>
						<Typography variant='h6' color='inherit' className={classes.flex}>
							{Strings.Image}
						</Typography>

						<Button color='inherit' onClick={handleClose}>
							{Strings.Close}
						</Button>
					</Toolbar>
				</AppBar>
				<img src={picValue} alt='Full screen item' className={classes.fullWidth} />
			</Dialog>
		)
	}
}

export default withStyles(styles)(ImageFileFullScreenModal)
