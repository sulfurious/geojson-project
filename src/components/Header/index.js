import React, { Component } from "react"
import PropTypes from "prop-types"

import { dataStats } from "utils/getData"

import { MdSearch, MdViewList } from "react-icons/md"
import { IoMdGlobe } from "react-icons/io"
import RangeInputPlayer from "components/RangeInputPlayer"
import styles from "./index.module.css"

class Header extends Component {
  static propTypes = {
    year: PropTypes.number.isRequired,
    onYearChange: PropTypes.func.isRequired
  }

  render() {
    const { year, onYearChange } = this.props

    return (
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
          <MdSearch className={styles.icon} />
          <IoMdGlobe className={styles.icon} />
          <MdViewList className={styles.icon} />
        </div>        
      </div>
    )
  }
}

export default Header
