import { saveUser } from '../db/DbLocalStorage.js'

export const version = '1.0.0'

export const DEVICE_READY = 'DEVICE_READY'
export const changeDeviceIsReady = () => ({
	type: DEVICE_READY
})

export const CHANGE_LOADING = 'CHANGE_LOADING'
export const changeLoading = (loading) => ({
	type: CHANGE_LOADING,
	loading
})

export const CHANGE_GENERAL_MESSAGE_TEXT = 'CHANGE_GENERAL_MESSAGE_TEXT'
export const changeGeneralMessageText = (text) => ({
	type: CHANGE_GENERAL_MESSAGE_TEXT,
	text
})

export const CHANGE_SHOW_GENERAL_MESSAGE = 'CHANGE_SHOW_GENERAL_MESSAGE'
export const changeShowGeneralMessage = (visible) => ({
	type: CHANGE_SHOW_GENERAL_MESSAGE,
	visible
})

export const CHANGE_SCREEN_NAME = 'CHANGE_SCREEN_NAME'
export const changeScreenName = (text) => ({
	type: CHANGE_SCREEN_NAME,
	text
})

export const CHANGE_USER = 'CHANGE_USER'
export const changeUser = (user) => {
	saveUser(user)
	return {
		type: CHANGE_USER,
		user
	}
}

export const CHANGE_SHOW_BACK_BUTTON = 'CHANGE_SHOW_BACK_BUTTON'
export const changeShowBackButton = (user) => {
	saveUser(user)
	return {
		type: CHANGE_SHOW_BACK_BUTTON,
		user
	}
}

export const CHANGE_PAGE_DATA = 'CHANGE_PAGE_DATA'
export const changePageData = (screenName, showBackButton) => {
	return {
		type: CHANGE_PAGE_DATA,
		screenName,
		showBackButton
	}
}
