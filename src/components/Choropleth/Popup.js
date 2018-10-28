import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import noop from 'utils/noop';
import { years } from "utils/getData";

import { Popup as LeafletPopup } from 'react-leaflet'
import { BarChart, Bar, XAxis, YAxis, LabelList } from 'recharts'
import styles from './popup.module.css'

export default class Popup extends PureComponent {
  static propTypes = {
    position: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    }),
    feature: PropTypes.object.isRequired,
    year: PropTypes.number.isRequired,
    onClose: PropTypes.func
  }

  static defaultProps = {
    onClose: noop
  }

  formatD3Data = data => years.map(year => ({ name: year, value: data[year] }) )
  
  render() {
    const { position, feature, year, onClose } = this.props
    const count = feature.properties[year]

    return (
      <LeafletPopup position={position} onClose={onClose}>      
        <h4 className={styles.title}>
          <div>{feature.properties.name}</div>
          {count ? count : 'none'} in {year}
        </h4>
        <BarChart width={200} height={200} data={this.formatD3Data(feature.properties)}>
          <Bar dataKey='value' fill='#0099CC'>
            <LabelList dataKey="value" position="insideTop" />
          </Bar>
          <XAxis dataKey="name" />
        </BarChart>          
      </LeafletPopup>
    )
  }
}
