import { useMemo } from 'react'
import cx from 'clsx'

import styles from './Button.module.css'

function Button({
  children,
  onClick,
  asLink,
  href,
  isSubmit = false,
  rounded,
  shine,
}) {
  const buttonStyles = useMemo(
    () =>
      cx({
        [styles.button]: true,
        [styles.rounded]: rounded,
        [styles.shine]: shine,
      }),
    [rounded, shine]
  )

  return asLink ? (
    <a href={href} className={`${buttonStyles} ${styles.link}`}>
      {children}
    </a>
  ) : (
    <button
      type={isSubmit ? 'submit' : 'button'}
      onClick={onClick}
      className={buttonStyles}
    >
      {children}
    </button>
  )
}

export default Button
