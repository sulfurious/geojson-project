import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { MdSearch } from 'react-icons/md'
import RangeInputPlayer from 'components/RangeInputPlayer'
import styles from './index.module.css'

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
          <RangeInputPlayer value={year} title="Year" onValueChange={onYearChange} min={2010} max={2014} />
        </div>
        
        <MdSearch className={styles.search} />
      </div>
    )
  }
}

export default Header
