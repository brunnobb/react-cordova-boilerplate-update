import Axios from 'axios'
import { changeLoading } from './mainActions.js'

export const test = () => null

export const fetchExecuteLogin = (txtname, txtpass) => (dispatch, getState) => {
	// set Loading
	dispatch(changeLoading(true))

	const actualState = getState()
	const webservicePath = actualState.serverPath

	// Parameters
	const postObj = {
		// MZ - get these values from Login result. For now, you login first, then select a Role. User Folder deprecated (-> Conversion Module)
		// TODO user folder is now deprecated - only pass username and password
		/* userFolder: selectedRole.userFolder,
		userKey: selectedRole.userKey,
		userLogin: selectedRole.userLogin,
		userPass: selectedRole.userPass, */
		txtname,
		txtpass
	}

	const axiosOptions = {
		method: 'POST',
		url: `${webservicePath}${LoginUrl}`,
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
				dispatch(changeUser(obj))
				// TODO now changed the order
				// MZ - 14.2.20 - changed route: server -> login -> module / role -> settings
				// redirectSettings()
				redirectRole()
			} else {
				let errorMsg = `${Strings.loginFailed}`
				if (obj && obj.message) {
					errorMsg = obj.message
				}
				dispatch(changeGeneralMessageText(`${errorMsg}`))
			}
		})
		.catch((error) => {
			letSleep()
			dispatch(changeGeneralMessageText(`${Strings.errorLogin} ${getErrorMessage(error)}`))
		})
}
