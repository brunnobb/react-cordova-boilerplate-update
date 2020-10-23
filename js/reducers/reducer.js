import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import {
	DEVICE_READY,
	CHANGE_LOADING,
	CHANGE_GENERAL_MESSAGE_TEXT,
	CHANGE_SHOW_GENERAL_MESSAGE,
	CHANGE_USER,
	CHANGE_SCREEN_NAME,
	CHANGE_SHOW_BACK_BUTTON,
	CHANGE_PAGE_DATA
} from '../actions/mainActions.js'

const isLoading = (state = false, action) => {
	switch (action.type) {
		case CHANGE_LOADING:
			return action.loading
		case CHANGE_GENERAL_MESSAGE_TEXT:
			return false
		default:
			return state
	}
}

const deviceIsReady = (state = false, action) => {
	switch (action.type) {
		case DEVICE_READY:
			return true
		default:
			return state
	}
}

const showGeneralMessage = (state = false, action) => {
	switch (action.type) {
		case CHANGE_GENERAL_MESSAGE_TEXT:
			return true
		case CHANGE_SHOW_GENERAL_MESSAGE:
			return action.visible
		default:
			return state
	}
}

const generalMessageText = (state = '', action) => {
	switch (action.type) {
		case CHANGE_GENERAL_MESSAGE_TEXT:
			return action.text
		default:
			return state
	}
}

const screenName = (state = 'Home', action) => {
	switch (action.type) {
		case CHANGE_SCREEN_NAME:
			return action.text
		case CHANGE_PAGE_DATA:
			return action.screenName
		default:
			return state
	}
}

const showBackButton = (state = false, action) => {
	switch (action.type) {
		case CHANGE_SHOW_BACK_BUTTON:
			return action.show
		case CHANGE_PAGE_DATA:
			return action.showBackButton
		default:
			return state
	}
}

// Login
const loggedUser = (state = null, action) => {
	switch (action.type) {
		case CHANGE_USER:
			return action.user
		default:
			return state
	}
}

const getRootReducer = (history) =>
	combineReducers({
		isLoading,
		deviceIsReady,
		showGeneralMessage,
		generalMessageText,
		loggedUser,
		screenName,
		showBackButton,
		router: connectRouter(history)
	})

export default getRootReducer
