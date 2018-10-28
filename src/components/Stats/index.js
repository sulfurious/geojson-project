import React, { memo } from "react"

import { years, dataStats } from "utils/getData"
import styles from "./index.module.css"

const Stats = () => (
  <div className={styles.container}>
    <div className={styles.rowHeadings}>
      <div>&nbsp;</div>
      <div>Min</div>
      <div>Max</div>
      <div>Median</div>
      <div>Mean</div>
      <div className={styles.spaceAbove}>Total</div>
    </div>
    <div className={styles.columns}>
      {years.map(year => (
        <div key={year} className={styles.column}>
          <div>{year}</div>
          <div className={styles.value}>{dataStats[year].min}</div>
          <div className={styles.value}>{dataStats[year].max}</div>
          <div className={styles.value}>{dataStats[year].median}</div>
          <div className={styles.value}>{dataStats[year].mean.toFixed(2)}</div>
          <div className={styles.value}>{dataStats[year].sum}</div>
        </div>
      ))}
    </div>
  </div>
)

export default memo(Stats)
