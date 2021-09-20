import { useMemo } from 'react'
import cx from 'clsx'

import styles from './DropContainer.module.css'

function DropContainerHeader({ children }) {
  return <h3 className={styles.dropContainerHeader}>{children}</h3>
}

function DropContainerSubheader({ children }) {
  return <small className={styles.dropContainerSubheader}>{children}</small>
}

function DropContainer({ children, header, subheader, Image, active, reject }) {
  const containerStyles = useMemo(
    () =>
      cx({
        [styles.dropContainer]: true,
        [styles.active]: active,
        [styles.reject]: reject,
      }),
    [active, reject]
  )

  return (
    <div className={containerStyles} data-testid="dropzone-container">
      <Image />
      <DropContainerHeader>{header}</DropContainerHeader>
      <DropContainerSubheader>{subheader}</DropContainerSubheader>
      {children}
    </div>
  )
}

export default DropContainer
