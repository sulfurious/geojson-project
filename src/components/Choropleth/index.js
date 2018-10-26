import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Map, TileLayer, GeoJSON } from 'react-leaflet'
import { scaleLinear } from 'd3'

import { data, dataStats, dataCenter } from 'utils/getData'
import './index.css'

export default class Choropleth extends Component {
  static propTypes = {
    year: PropTypes.number.isRequired
  };

  initialZoom = 12
  maxFillOpacity = 0.7

  fillScale = year => scaleLinear().domain([dataStats[year].mean, dataStats[year].max]).range([0.2, this.maxFillOpacity])

  getFillOpacity = (properties, year) => this.fillScale(year)(properties[year])

  styleFeature = feature => {
    const { year } = this.props;
    const { properties } = feature

    return {
      color: '#999491',
      weight: 1,
      fillColor: '#CC6161',
      fillOpacity: this.getFillOpacity(properties, year)
    }
  }

  render() {
    const { year } = this.props;

    return (
      <Map center={dataCenter} zoom={this.initialZoom}>
        <TileLayer
          className="chloropleth"
          attribution="&amp;copy <a href=&quot;https://wikimediafoundation.org/wiki/Maps_Terms_of_Use&quot;>Wikimedia</a>"
          url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
        />
        <GeoJSON key={year} data={data} style={this.styleFeature} />
      </Map>
    )
  }
}
