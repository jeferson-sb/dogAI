import { useCallback, useState } from 'react'
import * as tmImage from '@teachablemachine/image'

export function useFormUpload() {
  const [file, setFile] = useState([])
  const [prediction, setPrediction] = useState([])
  const [description, setDescription] = useState({})
  const [error, setError] = useState(null)

  const statusType = {
    IDLE: 'IDLE',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTED',
  }

  const [status, setStatus] = useState(statusType.IDLE)

  const handleResults = async (data) => {
    setPrediction(data)

    let breed = data.className.replace(/(_)/gi, ' ')
    if (breed === 'Cão Selvagem') {
      breed = 'Canids'
    }

    const wikipediaApiUrl = encodeURI(
      `${process.env.REACT_APP_WIKIPEDIA_ENDPOINT}${breed}`
    )

    try {
      const response = await fetch(wikipediaApiUrl)

      if (response.status === 200 && response.ok) {
        let filteredDesc
        const wikipediaPages = await response.json()

        if (wikipediaPages.query) {
          wikipediaPages.query.pages.forEach((page) => {
            if (
              page.title.toLowerCase().includes(breed) &&
              page.extract.search(/(dog|canid|breed)/g) !== -1
            ) {
              filteredDesc = page.extract
            } else {
              filteredDesc = wikipediaPages.query.pages[0].extract
            }
          })
          setDescription({
            desc: `${filteredDesc.substring(0, 400 - 10)}...`,
            wikiUrl: `${process.env.REACT_APP_WIKIPEDIA_WIKI}/${breed}`,
          })
        } else {
          setDescription({
            desc: 'No wikipedia found.',
            wikiUrl: '',
            error: true,
          })
        }
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      const [single] = acceptedFiles
      setFile(
        Object.assign(single, {
          preview: URL.createObjectURL(single),
        })
      )

      // Load model and pick the best prediction out of 10 classes

      const image = document.getElementById('image')
      const model = await tmImage.load(
        './model/model.json',
        './model/metadata.json'
      )
      const predictions = await model.predictTopK(image, 10)
      const highestPrediction = predictions.reduce(
        (prev, current) =>
          prev.probability > current.probability ? prev : current,
        0
      )

      await handleResults(highestPrediction)
    } catch (err) {
      setError(err)
      setStatus(statusType.REJECTED)
    } finally {
      setStatus(statusType.FULFILLED)
    }
  }, [])

  return {
    onDrop,
    file,
    prediction,
    description,
    error,
    isLoading: status === statusType.IDLE,
    isFinished: status === statusType.FULFILLED,
    isRejected: status === statusType.REJECTED,
  }
}
