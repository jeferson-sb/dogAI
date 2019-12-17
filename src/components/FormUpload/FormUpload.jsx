import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import * as tmImage from '@teachablemachine/image'

import './FormUpload.css'

import uploadImage from '../../assets/uploadImage.svg'
import close from '../../assets/close.svg'

import PredictionResult from '../PredictionResult/PredictionResult.jsx'
import Loading from '../Loading/Loading.jsx'
import Preview from '../Preview/Preview.jsx'

function FormUpload() {
  const [predictions, setPredictions] = useState([])
  const [file, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [description, setDescription] = useState({})

  const onDrop = useCallback(async acceptedFiles => {
    try {
      const start = Date.now()
      setError(null)
      setLoading(true)
      setPredictions([])
      setDescription({})

      const singleFile = acceptedFiles[0]
      setFiles(
        Object.assign(singleFile, {
          preview: URL.createObjectURL(singleFile)
        })
      )

      const image = document.getElementById('image')

      const model = await tmImage.load(
        './model/model.json',
        './model/metadata.json'
      )

      const prediction = await model.predictTopK(image, 3)
      handleResults(prediction)

      async function handleResults(data) {
        setPredictions(data)
        let breed = data[0].className.replace(/(_)/gi, ' ')
        if (breed === 'Cão Selvagem') {
          breed = 'Canídeos'
        }
        const wikipediaApiUrl = encodeURI(
          `https://pt.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${breed}&limit=1`
        )
        try {
          const response = await fetch(wikipediaApiUrl)
          const responseData = await response.json()
          const wiki = {
            desc: responseData[2][0],
            wikiUrl: responseData[3][0]
          }
          if (!responseData[1].length) {
            wiki.error = true
          }
          setDescription(wiki)
        } catch (error) {
          console.error(error)
        }
      }

      setLoading(false)
      const end = new Date()
      const elapsedTime = end - start
      console.log(`It took ${elapsedTime / 1000} seconds`)
    } catch (err) {
      setLoading(false)
      setError(err)
      console.error(err)
    }
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject
  } = useDropzone({ onDrop, accept: 'image/jpeg, image/png, image/jpg' })

  const renderDragMessage = (isDragActive, isDragReject) => {
    if (!isDragActive) {
      return (
        <div className="dropContainer">
          <img src={uploadImage} alt="Illustration upload" />
          <h3>Arraste e solte ou clique aqui</h3>
          <small>para enviar sua imagem</small>
          <p>Nenhum arquivo selecionado</p>
        </div>
      )
    }
    if (isDragReject) {
      return (
        <div className="dropContainer dragReject">
          <img src={close} alt="X icon" />
          <h3>Arquivo não suportado!</h3>
        </div>
      )
    }

    return (
      <div className="dropContainer dragActive">
        <img src={uploadImage} alt="Illustration upload" />
        <h3>Solte aqui</h3>
        <small>para enviar sua imagem</small>
      </div>
    )
  }

  return (
    <>
      {file.name ? (
        <>
          <section>
            <section className="fileInput">
              <button {...getRootProps()} className="btn">
                Enviar outra imagem
              </button>
              <input {...getInputProps()} />
              <Preview f={file} />

              {loading && <Loading />}

              {error && (
                <p className="alert is-danger">
                  Erro ao efetuar análise, consulte os logs
                </p>
              )}
            </section>

            {predictions.length !== 0 && (
              <PredictionResult
                predictions={predictions}
                description={description}
              />
            )}
          </section>
        </>
      ) : (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <h2>Selecione uma imagem</h2>
          {renderDragMessage(isDragActive, isDragReject)}
        </div>
      )}
    </>
  )
}

export default FormUpload
