import configureStore from './configureStore.js'

let storeInstance = null

export const createStoreInstance = (history) => {
	storeInstance = configureStore(history)
	return storeInstance
}

export const getStore = () => storeInstance
