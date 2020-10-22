import { push } from 'connected-react-router'
import { getStore } from '../store/store.js'

export const redirectTarget = (path) => {
	const { dispatch } = getStore()
	dispatch(push(path))
}

export const redirectIndex = () => {
	const { dispatch } = getStore()
	const path = '/'
	dispatch(push(path))
}

export const redirectLogin = () => {
	const { dispatch } = getStore()
	const path = '/login'
	dispatch(push(path))
}

export const redirectHome = () => {
	const { dispatch } = getStore()
	const path = '/user/home'
	dispatch(push(path))
}
