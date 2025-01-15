import { useCallback, useEffect, useState } from 'react'

import { useMLModel } from '@/hook/useMLModel'
import { useFetch } from '@/hook/useFetch'

export function useFormUpload() {
	const [file, setFile] = useState({})
	const [prediction, setPrediction] = useState([])
	const [description, setDescription] = useState({})
	const [error, setError] = useState(null)

	const statusType = {
		IDLE: 'IDLE',
		LOADING: 'LOADING',
		FULFILLED: 'FULFILLED',
		REJECTED: 'REJECTED',
	}

	const [status, setStatus] = useState(statusType.IDLE)

	const { predict } = useMLModel({
		modelPath: './model/model.json',
		metadataPath: './model/metadata.json',
	})

	const { retrieve } = useFetch()

	const findWikiDescription = (pages, term) => {
		const text = pages.query.pages.find(
			(page) =>
				page.title.toLowerCase().includes(term) &&
				page.extract.search(/(\bdog\b|canid|breed)/g) !== -1,
		)

		if (!pages.query) return null

		return text?.extract ?? pages.query?.pages[0]?.extract
	}

	const handleResults = useCallback(async (data) => {
		setPrediction(data)

		let breed = data.className.replace(/(_)/gi, ' ')
		if (breed === 'wild dog') {
			breed = 'Canidae'
		}

		const wikipediaApiUrl = encodeURI(
			`${import.meta.env.VITE_WIKIPEDIA_ENDPOINT}${breed}`,
		)
	
		const wikipediaPages = await retrieve(wikipediaApiUrl)

		const term = breed.toLowerCase().replace('-', ' ')
		const text = findWikiDescription(wikipediaPages, term)

		if (text) {
			setDescription({
				desc: `${text.substring(0, 400 - 10)}...`,
				wikiUrl: `${import.meta.env.VITE_WIKIPEDIA_WIKI}/${breed}`,
			})
		} else {
			setDescription({
				desc: 'No wikipedia found.',
				wikiUrl: '',
				error: true,
			})
		}
	}, [])

	const predictImage = useCallback(async () => {
		try {
			setStatus(statusType.LOADING)

			const image = document.getElementById('image')

			const mlPrediction = await predict(image)
			await handleResults(mlPrediction)
		} catch (error) {
			setError(error)
			setStatus(statusType.REJECTED)
		} finally {
			setStatus(statusType.FULFILLED)
		}
	}, [])

	const onDrop = useCallback(async (acceptedFiles) => {
		const [single] = acceptedFiles
		setFile(
			Object.assign(single, {
				preview: URL.createObjectURL(single),
			}),
		)
	}, [])

	useEffect(() => {
		if (file?.name) predictImage()
	}, [file, predictImage])

	return {
		onDrop,
		file,
		prediction,
		description,
		error,
		isLoading: status === statusType.LOADING,
		isFinished: status === statusType.FULFILLED,
		isRejected: status === statusType.REJECTED,
	}
}
