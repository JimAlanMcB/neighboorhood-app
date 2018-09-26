import React, { Component } from "react";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  handleMarkerClick = (props, marker, e) => {
    this.props.onMarkerClick(props, marker);
  };
  handleAnimation = () => {
    let animate = this.props.animation
      ? this.props.google.maps.Animation.BOUNCE
      : null;
    return animate;
  };
  render() {
    let animate = this.handleAnimation();
    if (!this.props.loaded) return <div>Loading...</div>;
    const style = {
      display: "grid"
    };

    return (
      <div>
        <Map
          google={this.props.google}
          zoom={14}
          style={style}
          initialCenter={{
            lat: 33.4484,
            lng: -112.074
          }}
          center={this.props.center}
          className="map"
          onClick={this.props.onMapClicked}
        >
          {this.props.locs.map(a => (
            <Marker
              key={a.name}
              position={{ lat: a.lat, lng: a.lng }}
              center={{ lat: a.lat, lng: a.lng }}
              onClick={this.handleMarkerClick}
              name={a.name}
              address={a.address}
              reviews={a.reviews}
              stars={a.stars}
              url={a.url}
              animation={animate}
            />
          ))}

          <InfoWindow
            marker={this.props.activeMarker}
            visible={this.props.showingInfoWindow}
          >
            <div className="infowindow">
              <h1 className="title">{this.props.selectedPlace.name}</h1>
              <h2 className="address">{this.props.selectedPlace.address}</h2>
              <h3>{this.props.selectedPlace.stars}</h3>
              {this.props.showingInfoWindow ? (
                this.props.selectedPlace.reviews.map(review => (
                  <h4 key={this.props.selectedPlace.name}>{review}</h4>
                ))
              ) : (
                <h4 key={this.props.selectedPlace.name}>
                  {this.props.selectedPlace.reviews}
                </h4>
              )}
              <li key={this.props.selectedPlace.name} className="locs-link">
                <a href={this.props.selectedPlace.url} target="_blank">
                  Website
                </a>
              </li>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDOGjcoE16Fw09SutQx44Zq5z2EapClK1Q&v=3"
})(MapContainer);
