import React, { Component } from 'react'
import Leaflet from 'leaflet'

import Choropleth from 'components/Choropleth'
import './index.css'
import 'leaflet/dist/leaflet.css'
import { MdPlayCircleOutline, MdPauseCircleOutline } from 'react-icons/md'

Leaflet.Icon.Default.imagePath = 'resources/images/'

class App extends Component {
  state = {
    play: false,
    year: 2010
  }

  yearIntervalId = null

  componentWillUnmount = () => {
    this.stopTimeline();
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { play } = this.state

    if (play !== prevState.play) {
      play ? this.startTimeline() : this.stopTimeline()
    }
  }

  incrementYear = () => {
    this.setState(prevState => ({
      year: prevState.year === 2014 ? 2010 :  prevState.year + 1
    }))
  }

  startTimeline = () => {
    this.yearInterval = setInterval(this.incrementYear, 2000)
  }

  stopTimeline = () => {
    clearInterval(this.yearInterval);
  }

  onYearChange = e => {
    this.setState({
      year: parseInt(e.target.value, 10)
    })
  }

  onPlayPause = e => {
    e.preventDefault();

    this.setState(prevState => ({
      play: !prevState.play
    }))
  }

  render() {
    const { year, play } = this.state

    return (
      <div className="App">
        <div className="title">D.C. Neighborhood Car Crashes</div>
        <div className="yearInput">
          Year
          <input onChange={this.onYearChange} value={year} type="range" min="2010" max="2014" step="1" />
          <button className="playButton" onClick={this.onPlayPause}>
            {play ? <MdPauseCircleOutline /> : <MdPlayCircleOutline />}
          </button>
          {year} 
        </div>
        <Choropleth year={year} />
      </div>
    );
  }
}

export default App
