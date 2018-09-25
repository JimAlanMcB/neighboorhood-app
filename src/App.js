import React, { Component } from "react";
import "./App.css";
import MapContainer from "./MapComponent";
import * as LocsAPI from "./LocsAPI";
import Menu from "./Menu";
import MobileButton from "./MobileButton";
import Modal from "./Modal";

class App extends Component {
  state = {
    error: false,
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    locs: [],
    center: {},
    initialCenter: {
      lat: 33.4484,
      lng: -112.074
    },
    modal: true
  };
  componentDidMount() {
    this.getLocs();
  }
  getLocs = () => {
    let newLocs;
    LocsAPI.get()
      .then(locs => {
        this.setState({ error: false });
        newLocs = locs.map(l => {
          if (l.stars.startsWith("$")) {
            l.stars = "No Rating";
          }
          return l;
        });
        this.setState({ locs: newLocs });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  };
  onMarkerClick = (props, marker) => {
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true,
      center: marker.center
    });
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
  // instead of building a search API endpoint, I built the query endpoint here basically.
  // Filters the input fields, and only returns the correct locations from the filtered array.
  onSearchLocs = query => {
    let newLocs;
    query === " "
      ? (query = "")
      : query.length < 1
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
      newLocs[0] === undefined
        ? this.setState({ locs: [] })
        : this.setState({
            locs: newLocs,
            selectedPlace: newLocs[0],
            activeMarker: newLocs[0],
            center: { lat: newLocs[0].lat, lng: newLocs[0].lng }
          });
    });
  };
  // clear the search and go back to center of the map
  clearSearch = () => {
    this.setState({
      center: {
        lat: this.state.initialCenter.lat,
        lng: this.state.initialCenter.lng
      },
      locs: []
    });
    this.getLocs();
  };

  // I think this is a solution, however hacky. Created my PY program to scape the entire star rating div, which resulted in a string
  // so I had to go through and clean it up, then return it back to previous state.
  // Grab locations, REGEX to remove everything up to the first number, go through that new array and change each STR to a INT
  // filter based on greater than 4, then turn it back into a full "rating" string.

  sortFiveStars = () => {
    let fiveStars = this.state.locs
      .map(s => {
        let stars = s.stars;
        stars = stars.split();
        stars = stars[0].replace(/[^0-9.,]+/, " ");
        s.stars = stars;
        return s;
      })
      .map(e => {
        e.stars = Number(e.stars[1]);
        return e;
      })
      .filter(e => e.stars > 4)
      .map(e => {
        let num = e.stars;
        e.stars = `Rating: ${num}`;
        return e;
      });
    this.setState({ locs: fiveStars, showingInfoWindow: false });
  };
  onModalClick = () => {
    this.setState({ modal: false });
  };

  render() {
    // If we are in error state from not fetching API, display error page. Display Modal first. No need for react router ATM.
    // Otherwise display map
    return this.state.error ? (
      <div className="error">
        <div className="error-msg">
          <div className="error-text">
            looks like we had a big gap :'( refresh the page to try again
            <br />
            in the mean time check out this cool canyon
            <br />
            <a href="/" target="">
              Go Home
            </a>
          </div>
        </div>
      </div>
    ) : this.state.modal ? (
      <Modal onModalClick={this.onModalClick} />
    ) : (
      <div className="main">
        <Menu
          onSearchLocs={this.onSearchLocs}
          locs={this.state.locs}
          clearSearch={this.clearSearch}
          sortFiveStars={this.sortFiveStars}
        />
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
          center={this.state.center}
        />
        <MobileButton
          clearSearch={this.clearSearch}
          sortFiveStars={this.sortFiveStars}
        />
      </div>
    );
  }
}

export default App;
