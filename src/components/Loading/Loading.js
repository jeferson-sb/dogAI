import styles from './Loading.module.css'

function Loading() {
  return (
    <div className={styles.bouncingLoader}>
      <span />
      <span />
      <span />
    </div>
  )
}

export default Loading
