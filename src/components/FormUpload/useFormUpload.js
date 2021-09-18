import { useCallback, useState } from 'react'

import { useMLModel } from 'hook/useMLModel'
import { useFetch } from 'hook/useFetch'

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

  const { predict } = useMLModel({
    modelPath: './model/model.json',
    metadataPath: './model/metadata.json',
  })

  const { retrieve } = useFetch()

  const handleResults = useCallback(async (data) => {
    setPrediction(data)

    let filteredDesc
    let breed = data.className.replace(/(_)/gi, ' ')
    if (breed === 'Cão Selvagem') {
      breed = 'Canids'
    }

    const wikipediaApiUrl = encodeURI(
      `${process.env.REACT_APP_WIKIPEDIA_ENDPOINT}${breed}`
    )

    const wikipediaPages = await retrieve(wikipediaApiUrl)

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
  }, [])

  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      const [single] = acceptedFiles
      setFile(
        Object.assign(single, {
          preview: URL.createObjectURL(single),
        })
      )

      const image = document.getElementById('image')
      const mlPrediction = await predict(image)

      await handleResults(mlPrediction)
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
