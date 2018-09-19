import React, { Component } from "react";
import "./App.css";
import MapContainer from "./MapComponent";
import * as LocsAPI from "./LocsAPI";
import Menu from "./Menu";

class App extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    locs: []
  };

  componentDidMount() {
    this.getLocs();
  }
  getLocs = () => {
    let newLocs;
    LocsAPI.get().then(locs => {
      newLocs = locs.map(l => {
        if (l.stars.startsWith("$")) {
          l.stars = "No Rating";
        }
        return l;
      });
      this.setState({ locs: newLocs });
    });
  };
  onMarkerClick = (props, marker) => {
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    });
    console.log(props);
  };
  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };

  onSearchLocs = query => {
    let newLocs;
    query === ' ' ? query = '' : 
    query.length < 1
      ? this.setState({ locs: [], showingInfoWindow: false })
      : this.setState({ showingInfoWindow: false });
    LocsAPI.get().then(locs => {
      newLocs = locs
        .map(l => {
          let nameStr = l.name.toLowerCase();
          l.name = nameStr;
          return l;
        })
        .filter(
          a =>
            a.name.startsWith(query) ||
            (a.stars && a.stars.startsWith(`Rating: ${query}`))
        )
        .map(a => {
          a.name = a.name.toUpperCase();
          return a;
        });
      this.setState({ locs: newLocs });
    });
  };
  render() {
    return (
      <div className="main">
        <Menu onSearchLocs={this.onSearchLocs} locs={this.state.locs} />
        <MapContainer
          className="map"
          onMarkerClick={this.onMarkerClick}
          onInfoWindowClose={this.onInfoWindowClose}
          onMapClicked={this.onMapClicked}
          activeMarker={this.state.activeMarker}
          selectedPlace={this.state.selectedPlace}
          showingInfoWindow={this.state.showingInfoWindow}
          locs={this.state.locs}
          getLocs={this.getLocs}
        />
      </div>
    );
  }
}

export default App;
