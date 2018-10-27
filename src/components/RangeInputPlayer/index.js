import React, { Component } from "react";
import PropTypes from "prop-types";

import { MdPlayCircleOutline, MdPauseCircleOutline } from "react-icons/md";
import styles from "./index.module.css";

class RangeInputPlayer extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onValueChange: PropTypes.func.isRequired,
    title: PropTypes.string,
    step: PropTypes.number
  };

  static defaultProps = {
    title: "",
    step: 1
  };

  state = {
    play: false
  };

  intervalId = null;
  intervalTime = 1500;

  componentDidUpdate = (prevProps, prevState) => {
    const { play } = this.state;

    if (play !== prevState.play) {
      play ? this.startTimeline() : this.stopTimeline();
    }
  };

  componentWillUnmount = () => {
    this.stopTimeline();
  };

  incrementValue = () => {
    const { value, onValueChange, step } = this.props;
    onValueChange(value === 2014 ? 2010 : value + step);
  };

  startTimeline = () => {
    this.intervalId = setInterval(this.incrementValue, this.intervalTime);
  };

  stopTimeline = () => {
    clearInterval(this.intervalId);
  };

  onValueChange = e => {
    const { onValueChange } = this.props;
    onValueChange(parseInt(e.target.value, 10));
  };

  onPlayPause = e => {
    e.preventDefault();

    this.setState(prevState => ({
      play: !prevState.play
    }));
  };

  render() {
    const { title, value, min, max, step } = this.props;
    const { play } = this.state;

    return (
      <div className={styles.container}>
        {title}
        
        <input
          className={styles.rangeInput}
          onChange={this.onValueChange}
          value={value}
          type="range"
          min={min}
          max={max}
          step={step}
        />

        <button className={styles.playButton} onClick={this.onPlayPause}>
          {play ? <MdPauseCircleOutline /> : <MdPlayCircleOutline />}
        </button>

        {value}
      </div>
    );
  }
}

export default RangeInputPlayer;
