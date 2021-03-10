import store from 'store2'

const KEY_THEME = 'KEY_THEME'
const KEY_USER = 'KEY_USER'

function readFromJson(key, defValue) {
	const retText = store.get(key)
	if (!retText || retText === 'null') {
		return defValue
	}
	const object = JSON.parse(retText)
	return object
}

function readFromString(key) {
	const retText = store.get(key)
	if (!retText) {
		return ''
	}
	return retText
}

function saveString(key, text) {
	if (!text) {
		store.remove(key)
		return
	}

	store.set(key, text)
}

function saveJson(key, obj) {
	if (!obj || obj === 'null') {
		store.remove(key)
		return
	}

	const retText = JSON.stringify(obj)
	store.set(key, retText)
}

export function readTheme() {
	const res = readFromJson(KEY_THEME, {})
	return res
}

export function saveTheme(obj) {
	saveJson(KEY_THEME, obj)
}

export function readUser() {
	const res = readFromJson(KEY_USER, {})
	return res
}

export function saveUser(obj) {
	saveJson(KEY_USER, obj)
}
