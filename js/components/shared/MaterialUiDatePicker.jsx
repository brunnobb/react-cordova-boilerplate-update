import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'

import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker
} from '@material-ui/pickers'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

import moment from 'moment'
import MomentUtils from '@date-io/moment'
import 'moment/locale/de'
import 'moment/locale/pt'

import Strings from '../../helpers/strings.js'

const MaterialUiDatePicker = (props) => {
	const { type, readOnly, ...other } = props

	moment.locale('en')
	let defaultFormat = 'YYYY-MM-DD'

	const lang = Strings.getLanguage()
	console.log(`Current Language ${lang}`)

	if (lang === 'de') {
		moment.locale('de')
		defaultFormat = 'MM/DD/YYYY'
	}

	if (lang === 'pt') {
		moment.locale('pt-BR')
		defaultFormat = 'DD/MM/YYYY'
	}

	if (readOnly) {
		let formatedDate = ''
		if (other.value) {
			formatedDate = moment(other.value).format(defaultFormat)
		}

		return <Typography component='p'>{`${other.label}: ${formatedDate}`}</Typography>
	}

	return (
		<MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>
			{type === 'time' ? (
				<KeyboardTimePicker
					allowKeyboardControl
					margin='normal'
					cancelLabel='Cancel'
					clearLabel='Clear'
					ampm={false}
					todayLabel='Now'
					leftArrowIcon={<ArrowBackIcon />}
					rightArrowIcon={<ArrowForwardIcon />}
					minDateMessage='Date should be bigger than'
					maxDateMessage='Date should be smaller than'
					invalidLabel='SELECT'
					showTodayButton={false}
					{...other}
				/>
			) : (
				<KeyboardDatePicker
					allowKeyboardControl
					margin='normal'
					cancelLabel='Cancel'
					clearLabel='Clear'
					todayLabel='Today'
					leftArrowIcon={<ArrowBackIcon />}
					rightArrowIcon={<ArrowForwardIcon />}
					minDateMessage='Date should be bigger than'
					maxDateMessage='Date should be smaller than'
					invalidLabel='SELECT'
					format={defaultFormat}
					{...other}
				/>
			)}
		</MuiPickersUtilsProvider>
	)
}

MaterialUiDatePicker.propTypes = {
	type: PropTypes.string.isRequired,
	readOnly: PropTypes.bool.isRequired
}

export default MaterialUiDatePicker
