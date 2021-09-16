import { useMemo } from 'react'
import cx from 'clsx'

import styles from './Alert.module.css'

function Alert({ children, type }) {
  const alertStyles = useMemo(
    () =>
      cx(
        {
          [styles.alert]: true,
        },
        styles[type]
      ),
    [type]
  )

  return (
    <div className={alertStyles} aria-live="polite">
      {children}
    </div>
  )
}

export default Alert
