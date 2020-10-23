import Axios from 'axios'

import Strings from '../helpers/strings.js'
import { keepAwake, letSleep } from '../plugins/CordovaPlugins.js'
import { changeGeneralMessageText, changeLoading, changeUser } from './mainActions.js'

const webservicePath =
	'https://my-json-server.typicode.com/brunnobb/react-cordova-boilerplate-update/'

export const test = () => null

function getErrorMessage(error) {
	return 'unknow error'
}

export const fetchExecuteLogin = (username, pass) => (dispatch, getState) => {
	// set Loading
	dispatch(changeLoading(true))

	// https://my-json-server.typicode.com/brunnobb/react-cordova-boilerplate-update/users/1
	const URL = `${webservicePath}users/1`

	// Parameters
	const postObj = {
		username,
		pass
	}

	const axiosOptions = {
		method: 'GET',
		url: URL,
		data: postObj,
		headers: {
			// NOAUTH
			'Content-Type': 'application/json;charset=UTF-8',
			Accept: 'application/json'
		},
		json: true
	}

	keepAwake()
	return Axios(axiosOptions)
		.then((response) => {
			letSleep()

			dispatch(changeLoading(false))
			const user = response.data
			dispatch(changeUser(user))
		})
		.catch((error) => {
			letSleep()
			dispatch(changeGeneralMessageText(`${Strings.loginFailed} ${getErrorMessage(error)}`))
		})
}
