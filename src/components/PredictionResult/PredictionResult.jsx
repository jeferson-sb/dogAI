import React from 'react'
import './PredictionResult.css'
import track from '../../assets/track.svg'

function PredictionResult({ predictions, description }) {
  const renderResult = predictions => {
    if (predictions[0].probability > 0.6) {
      return (
        <article className="predictions">
          <h2 className="predictions-heading">
            {predictions[0].className.replace(/(_)/gi, ' ')}
          </h2>

          <h4 className="predictions-subheading isCapitalize">
            {predictions[0].className === 'Selvagem' ? (
              'Canídeo'
            ) : (
              <>
                <img src={track} alt="dog paw" />
                Cão
              </>
            )}
          </h4>

          <span>Precisão</span>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${(predictions[0].probability * 100).toFixed(2)}%`
              }}
              aria-valuenow={(predictions[0].probability * 100).toFixed(2)}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {(predictions[0].probability * 100).toFixed(2).replace('.', ',')}{' '}
              %
            </div>
          </div>
          <p className="predictions-description">
            {!description.error && !description.desc && (
              <span>Carregando ...</span>
            )}

            {!description.error && description.desc && (
              <>
                {description.desc}
                <span>
                  Saiba mais em{' '}
                  <a href={description.wikiUrl}>{description.wikiUrl}</a>
                </span>
              </>
            )}
            {description.error && <span>Wikipedia não encontrado.</span>}
          </p>
        </article>
      )
    } else {
      return (
        <p className="alert is-warning">
          Não foi possível identificar o cachorro nesta imagem
        </p>
      )
    }
  }

  return renderResult(predictions)
}

export default PredictionResult
