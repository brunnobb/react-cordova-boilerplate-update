/* global Camera */
/* global cordova */

export function keepAwake() {
	if (!window.cordova) return
	if (window && window.plugins && window.plugins.insomnia) {
		// console.log('keepAwake')
		window.plugins.insomnia.keepAwake()
	}
}

export function letSleep() {
	if (!window.cordova) return
	if (window && window.plugins && window.plugins.insomnia) {
		// console.log('letSleep')
		window.plugins.insomnia.allowSleepAgain()
	}
}

export async function takePicture() {
	const pictureSettings = {
		quality: 20,
		sourceType: Camera.PictureSourceType.CAMERA,
		destinationType: Camera.DestinationType.FILE_URI,
		correctOrientation: true,
		saveToPhotoAlbum: true,
		allowEdit: false,
		cameraDirection: Camera.Direction.BACK
	}

	const takePicturePromise = () =>
		new Promise((resolve, reject) => {
			navigator.camera.getPicture(
				(picture) => {
					resolve(picture)
				},
				(error) => {
					reject(error)
				},
				pictureSettings
			)
		})

	try {
		if (navigator.camera) {
			const file = await takePicturePromise()
			return file
		}
		throw new Error('Navigator camera not ready')
	} catch (e) {
		console.error('Error saving file', e)
		throw e
	}
}

export async function selectPictureFromGalery() {
	const pictureSettings = {
		sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
		destinationType: Camera.DestinationType.FILE_URI,
		correctOrientation: true
	}

	const selectPicturePromise = () =>
		new Promise((resolve, reject) => {
			navigator.camera.getPicture(
				(picture) => {
					resolve(picture)
				},
				(error) => {
					reject(error)
				},
				pictureSettings
			)
		})

	try {
		if (navigator.camera) {
			const file = await selectPicturePromise()
			return file
		}
		throw new Error('Navigator not ready')
	} catch (e) {
		console.error('Error selecting file', e)
		throw e
	}
}

export async function takeBarcode() {
	if (typeof cordova === 'undefined' || !cordova || !cordova.file) {
		console.error('Cordova is not defined or device is not ready')
		return ''
	}

	// console.log('takeBarcode')

	const getBarcodePromise = () =>
		new Promise((resolve, reject) => {
			const barcodeConfig = {
				preferFrontCamera: false, // iOS and Android
				showFlipCameraButton: false, // iOS and Android
				showTorchButton: true, // iOS and Android
				torchOn: false, // Android, launch with the torch switched on (if available)
				saveHistory: false, // Android, save scan history (default false)
				prompt: 'Place a barcode inside the scan area', // Android
				resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
				// formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
				orientation: 'portrait', // Android only (portrait|landscape), default unset so it rotates with the device
				disableAnimations: true, // iOS
				disableSuccessBeep: false // iOS and Android
			}

			cordova.plugins.barcodeScanner.scan(
				(result) => {
					if (result.cancelled) {
						reject(new Error('Operation Cancelled'))
					}
					resolve(result)
				},
				(error) => {
					reject(error)
				},
				barcodeConfig
			)
		})

	try {
		const barcode = await getBarcodePromise()
		return barcode
	} catch (e) {
		console.error('Error reading barcode', e)
		throw e
	}
}

export function openInAppBrowser(url) {
	const target = '_blank'
	const options = 'location=no,footer=yes,closebuttoncaption=Fechar'
	const ref = cordova.InAppBrowser.open(url, target, options)
	return ref
}

export function openInAppBrowserPic(url) {
	const target = '_blank'
	const options = 'location=no,footer=yes,closebuttoncaption=Fechar,enableViewportScale=true'
	const pic = `data:image/jpeg;base64,${url}`
	const ref = cordova.InAppBrowser.open(pic, target, options)
	return ref
}

export function openExternalBrowser(url) {
	const target = '_system'
	const options = 'location=no,footer=yes,closebuttoncaption=Fechar'
	const ref = cordova.InAppBrowser.open(url, target, options)
	return ref
}

export async function getGeolocation() {
	if (typeof cordova === 'undefined' || !cordova) {
		console.error('Cordova is not defined or device is not ready')
		return {}
	}

	const getGeolocationPromise = () =>
		new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				(result) => {
					resolve(result)
				},
				(error) => {
					reject(error)
				},
				{
					timeout: 45000
				}
			)
		})

	try {
		const geolocation = await getGeolocationPromise()
		return geolocation
	} catch (e) {
		console.error('Error getting geolocation', e)
		throw e
	}
}
