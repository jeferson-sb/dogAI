import React from 'react'
import { useDropzone } from 'react-dropzone'

import uploadSVG from '@/assets/uploadImage.svg'
import closeSVG from '@/assets/close.svg'

import DropContainer from '@/components/DropContainer'
import PredictionResult from '@/components/PredictionResult/PredictionResult'
import Loading from '@/components/Loading'
import Preview from '@/components/Preview'
import Button from '@/components/Button'
import Alert from '@/components/Alert'

import styles from './FormUpload.module.css'

import { useFormUpload } from './useFormUpload'

function FormUpload() {
	const { file, prediction, description, error, isLoading, onDrop } =
		useFormUpload()

	const { getRootProps, getInputProps, isDragActive, isDragReject } =
		useDropzone({ onDrop, accept: 'image/jpeg, image/png, image/jpg' })

	return (
		<>
			{file?.name ? (
				<div className={styles.container}>
					<section className={styles.wrapper}>
						<div className={styles.buttonGroup}>
							<Button {...getRootProps()} shine>
								Send another image
							</Button>
							<input {...getInputProps()} />
						</div>

						<Preview file={file} />

						{isLoading && <Loading />}

						{error && (
							<Alert type="danger">
								Fail to scan image, try again with a different one.
							</Alert>
						)}
					</section>

					{prediction.probability && (
						<PredictionResult
							prediction={prediction}
							description={description}
						/>
					)}
				</div>
			) : (
				<div className={styles.uploadContainer} {...getRootProps()}>
					<input {...getInputProps()} data-testid="upload-image" />
					<h2>Choose a file</h2>

					{isDragReject && (
						<DropContainer
							reject
							header="File not supported!"
							Image={() => <img src={closeSVG} alt="Close" />}
						/>
					)}
					{isDragActive ? (
						<DropContainer
							active
							header="Drop here"
							subheader="to send your photo"
							Image={() => <img src={uploadSVG} alt="Illustration upload" />}
						/>
					) : (
						<DropContainer
							header="Drag and Drop or click here"
							subheader="to send your photo"
							Image={() => <img src={uploadSVG} alt="Illustration upload" />}
						>
							<p>No file selected.</p>
						</DropContainer>
					)}
				</div>
			)}
		</>
	)
}

export default FormUpload
