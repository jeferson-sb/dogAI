import React from 'react'
import './Preview.css'
import formatFileSize from '../../utils/formatFileSize'

function Preview(props) {
  return (
    <div className="fileInfo">
      <figure className="fileInfo-preview">
        <img
          className="fileInfo-preview-image"
          src={props.f.preview}
          alt={props.f.name}
          id="image"
        />
        <figcaption className="fileInfo-preview-caption">
          {props.f.name} ({formatFileSize(props.f.size)})
        </figcaption>
      </figure>
    </div>
  )
}

export default Preview
