import React, { Component } from 'react'
import Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'

import Header from 'components/Header'
import Choropleth from 'components/Choropleth'
import styles from './index.module.css'

Leaflet.Icon.Default.imagePath = 'resources/images/'

class App extends Component {
  state = {
    year: 2010
  }

  onYearChange = year => {
    this.setState({
      year
    })
  }

  render() {
    const { year } = this.state

    return (
      <div className={styles.App}>
        <Header year={year} onYearChange={this.onYearChange} />
        <Choropleth className={styles.mapContainer} year={year} />
      </div>
    )
  }
}

export default App
