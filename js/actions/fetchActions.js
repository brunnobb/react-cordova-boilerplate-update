import Axios from 'axios'
import Strings from '../helpers/strings.js'
import { keepAwake, letSleep } from '../plugins/CordovaPlugins.js'
import { changeLoading } from './mainActions.js'

const webservicePath =
	'https://my-json-server.typicode.com/brunnobb/react-cordova-boilerplate-update/'

export const test = () => null

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
		method: 'POST',
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
			const obj = response.data.result
			// MZ - 14.2.20 - check for token too
			if (obj && obj.success && obj.token) {
				// MZ - changeUser saves the whole result object, should we only save token and user id?
				// dispatch(changeUser(obj))
			} else {
				let errorMsg = `${Strings.loginFailed}`
				if (obj && obj.message) {
					errorMsg = obj.message
				}
				// dispatch(changeGeneralMessageText(`${errorMsg}`))
			}
		})
		.catch((error) => {
			letSleep()
			// dispatch(changeGeneralMessageText(`${Strings.errorLogin} ${getErrorMessage(error)}`))
		})
}
