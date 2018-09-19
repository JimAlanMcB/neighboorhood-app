import React, { Component } from "react";


import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  // shouldComponentUpdate(nextProps, nextState){
  //   console.log(nextProps)
  //   console.log(nextState)
  //   console.log(this.props)
  //   if(this.props.className === nextProps.className){
  //     return false
  //   }
  //   else return true
  // }
  render() {
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
          className="map"
          onClick={this.props.onMapClicked}
        >
          {this.props.locs.map(a => (
            <Marker
              key={a.name}
              position={{ lat: a.lat, lng: a.lng }}
              onClick={this.props.onMarkerClick}
              name={a.name}
              address={a.address}
              reviews={a.reviews}
              stars={a.stars}
              // animation={this.props.google.maps.Animation.DROP}
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
                  <h4>{review}</h4>
                ))
              ) : (
                <h4>{this.props.selectedPlace.reviews}</h4>
              )}
              {/* <a href={this.props.selectedPlace.url} /> */}
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
