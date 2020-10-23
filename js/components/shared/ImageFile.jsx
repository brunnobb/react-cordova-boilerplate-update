import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import makeCancelable from 'makecancelable'

import ImageFileFullScreenModal from './ImageFileFullScreenModal.jsx'

import StripedImage from '../../../resources/stripes.jpg'

// import { readImageFileFromDiskStorage } from '../../plugins/CordovaDataManager'

class ImageFile extends React.Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		deviceIsReady: PropTypes.bool.isRequired,
		enableFullScreen: PropTypes.bool,
		imageKey: PropTypes.string,
		imageKeyTemp: PropTypes.string,
		src: PropTypes.string,
		reprint: PropTypes.number,
		onClick: PropTypes.func
	}

	static defaultProps = {
		imageKey: '',
		imageKeyTemp: '',
		reprint: 1,
		src: '',
		enableFullScreen: true,
		onClick: null
	}

	constructor(props) {
		super(props)
		this.state = {
			picValue: '',
			fullScreenModalOpen: false
		}
	}

	componentDidMount() {
		this.updateImage()
	}

	componentDidUpdate(prevProps) {
		const { imageKey, imageKeyTemp, reprint } = this.props

		const prevImageKey = prevProps.imageKey
		const prevImageKeyTemp = prevProps.imageKeyTemp
		const prevReprint = prevProps.reprint

		let forceUpdate = false

		if (imageKey && prevImageKey) {
			if (imageKey !== prevImageKey) {
				this.unloadimage()
				forceUpdate = true
				this.updateImage(forceUpdate)
				return
			}
		}

		if (imageKeyTemp && prevImageKeyTemp) {
			if (imageKeyTemp !== prevImageKeyTemp) {
				this.unloadimage()
				forceUpdate = true
				this.updateImage(forceUpdate)
				return
			}
		}

		if (reprint && prevReprint) {
			if (reprint !== prevReprint) {
				this.unloadimage()
				forceUpdate = true
				this.updateImage(forceUpdate)
				return
			}
		}

		this.updateImage(forceUpdate)
	}

	componentWillUnmount() {
		if (this.cancelUpdate) {
			this.cancelUpdate()
		}
		this.unloadimage()
	}

	unloadimage = () => {
		const { picValue } = this.state

		const urlCreator = window.URL || window.webkitURL
		urlCreator.revokeObjectURL(picValue)
	}

	updateImage = (forceUpdate) => {
		const { imageKey, imageKeyTemp, deviceIsReady, src } = this.props

		const { picValue } = this.state

		if (!deviceIsReady) {
			return
		}

		if (src) return

		if (picValue && !forceUpdate) {
			return
		}

		async function readImagesFromDisk() {
			return null

			/* const arrImage = await readImageFileFromDiskStorage(imageKey)
			const arrTemp = await readImageFileFromDiskStorage(imageKeyTemp)

			if (arrTemp) {
				const blob = new Blob([arrTemp], { type: 'image/jpeg' })
				if (blob.size > 0) {
					return arrTemp
				}
			}

			return arrImage */
		}

		if (imageKey || imageKeyTemp) {
			this.cancelUpdate = makeCancelable(
				readImagesFromDisk(),
				(array) => {
					if (array) {
						const blob = new Blob([array], { type: 'image/jpeg' })
						if (blob.size > 0) {
							const urlCreator = window.URL || window.webkitURL
							const imageUrl = urlCreator.createObjectURL(blob)
							this.setState({
								picValue: imageUrl
							})
						} else {
							this.setState({
								picValue: ''
							})
						}
					} else {
						this.setState({
							picValue: ''
						})
					}
				},
				(err) => {
					console.error(err)
				}
			)
		}
	}

	openModal = () => {
		const { enableFullScreen } = this.props
		if (!enableFullScreen) return
		this.setState({
			fullScreenModalOpen: true
		})
	}

	closeModal = () => {
		this.setState({
			fullScreenModalOpen: false
		})
	}

	render() {
		const {
			dispatch,
			imageKey,
			deviceIsReady,
			imageKeyTemp,
			onClick,
			src,
			enableFullScreen,
			...otherProps
		} = this.props

		const { picValue, fullScreenModalOpen } = this.state
		let imgValue = picValue
		if (!picValue) {
			imgValue = StripedImage
		}
		if (src) {
			imgValue = src
		}

		return (
			<>
				<ImageFileFullScreenModal
					isVisible={fullScreenModalOpen}
					handleClose={this.closeModal}
					picValue={imgValue}
				/>

				{/* eslint-disable jsx-a11y/alt-text,jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions, react/jsx-props-no-spreading */}
				<img onClick={onClick || this.openModal} src={imgValue} {...otherProps} />
				{/* eslint-enable jsx-a11y/alt-text,jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions, react/jsx-props-no-spreading */}
			</>
		)
	}
}

const mapStateToProps = (state) => {
	const { dispatch, deviceIsReady } = state

	return {
		dispatch,
		deviceIsReady
	}
}

export default connect(mapStateToProps)(ImageFile)
