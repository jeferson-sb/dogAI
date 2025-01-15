import formatFileSize from '@/utils/formatFileSize'

import styles from './Preview.module.css'

function Preview({ file }) {
	return (
		<div className={styles.fileInfo}>
			<figure className={styles.fileInfo_preview}>
				<img
					data-testid="preview-image"
					loading="lazy"
					className={styles.fileInfo_previewImage}
					src={file.preview}
					alt={file.name}
					id="image"
				/>
				<figcaption className={styles.fileInfo_previewCaption}>
					{file.name} ({formatFileSize(file.size)})
				</figcaption>
			</figure>
		</div>
	)
}

export default Preview
