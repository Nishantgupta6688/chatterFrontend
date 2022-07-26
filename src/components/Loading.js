import React from 'react'
import styles from './Loading.module.css'

function Loading() {
  return (
    <div className={styles.loading}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
  )
}

export default Loading;