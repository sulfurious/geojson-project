import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Map, TileLayer, GeoJSON } from 'react-leaflet'
import { scaleLinear } from 'd3'

import { data, dataStats, dataCenter } from 'utils/getData'
import Popup from './Popup'
import styles from './index.module.css'

export default class Choropleth extends PureComponent {
  static propTypes = {
    year: PropTypes.number.isRequired,
    className: PropTypes.string
  }

  static defaultProps = {
    className: ''
  }

  state = {
    popupPos: null,
    popupFeature: null
  }

  initialZoom = 13
  maxFillOpacity = 0.7

  fillScale = year => scaleLinear().domain([dataStats[year].mean, dataStats[year].max]).range([0.2, this.maxFillOpacity])

  getFillOpacity = (properties, year) => this.fillScale(year)(properties[year])

  styleFeature = feature => {
    const { year } = this.props
    const { properties } = feature

    return {
      color: '#999491',
      weight: 1,
      fillColor: '#CC6161',
      fillOpacity: this.getFillOpacity(properties, year)
    }
  }

  setPopup = event => {
    this.setState({
      popupPos: event ? event.latlng : null,
      popupFeature: event ? event.target.feature : null
    })
  }

  onEachFeature = (feature, layer) => {
    layer.on('click', this.setPopup, this)
  }

  render() {
    const { className, year } = this.props
    const { popupPos, popupFeature } = this.state

    return (
      <Map className={className} center={dataCenter} zoom={this.initialZoom}>
        <TileLayer
          className={styles.chloropleth}
          attribution="&amp;copy <a href=&quot;https://wikimediafoundation.org/wiki/Maps_Terms_of_Use&quot;>Wikimedia</a>"
          url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
        />
        <GeoJSON key={year} data={data} style={this.styleFeature} onEachFeature={this.onEachFeature} />
        {popupPos && <Popup position={popupPos} feature={popupFeature} year={year} onClose={this.setPopup} />}
      </Map>
    )
  }
}
