import React, { memo } from "react"
import PropTypes from "prop-types"

import { dataStats } from "utils/getData"

import RangeInputPlayer from "components/RangeInputPlayer"
import styles from "./index.module.css"

const Header = ({ year, onYearChange, children }) => (
  <div className={styles.header}>
    <div className={styles.headerLeft}>
      <div className={styles.title}>D.C. Neighborhood Car Crashes</div>
      <RangeInputPlayer
        value={year}
        title="Year"
        onValueChange={onYearChange}
        min={dataStats.minYear}
        max={dataStats.maxYear}
      />
    </div>

    <div className={styles.icons}>
      {children}
    </div>        
  </div>
)

Header.propTypes = {
  year: PropTypes.number.isRequired,
  onYearChange: PropTypes.func.isRequired,
  children: PropTypes.any
}

Header.defaultProps = {
  children: null
}

export default memo(Header)
