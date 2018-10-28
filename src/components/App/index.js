import React, { Component } from "react";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

import { MdList } from "react-icons/md";
import Header from "components/Header";
import Stats from "components/Stats";
import Choropleth from "components/Choropleth";
import styles from "./index.module.css";

Leaflet.Icon.Default.imagePath = "resources/images/";

class App extends Component {
  state = {
    year: 2010,
    showStats: false
  };

  onYearChange = year => {
    this.setState({
      year
    });
  };

  showStats = () =>
    this.setState(prevState => ({ showStats: !prevState.showStats }));

  render() {
    const { year, showStats } = this.state;

    return (
      <div className={styles.App}>
        <Header year={year} onYearChange={this.onYearChange}>
          <MdList onClick={this.showStats} />
        </Header>

        {showStats && <Stats />}
        
        <Choropleth className={styles.mapContainer} year={year} />
      </div>
    );
  }
}

export default App;
