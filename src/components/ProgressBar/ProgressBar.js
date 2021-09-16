import styles from './ProgressBar.module.css'

function ProgressBar({ children, min, max, value }) {
  return (
    <div className={styles.progress}>
      <div
        className={styles.progressBar}
        role="progressbar"
        style={{
          width: `${value}%`,
        }}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
      >
        {children}
      </div>
    </div>
  )
}

export default ProgressBar
