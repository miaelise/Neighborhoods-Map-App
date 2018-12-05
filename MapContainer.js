import React, {Component} from 'react'
import { GoogleApiWrapper, Map, InfoWindow } from 'google-maps-react'
import ErrorHandler from './errorHandling.js'

class MapContainer extends Component {
  state = {
    map: null,
    markers: [],
    currentMarker: null,
    currentMarkerProps: null,
    windowOpen: false,
    hasError: false
  };

  componentWillMount() {

  }

  componentDidMount() {
    //Alerts user if Google Maps failed to load.
    window.gm_authFailure = () => {
      alert("Something went wrong with Google Maps. Please try again later.");
    }
  }

  componentWillReceiveProps = (props) => {
        //If filter applied, update markers
        if (this.state.markers.length !== props.filtered.length) {
            this.closeInfoWindow();
            this.updateMarkers(props.filtered);
            this.setState({currentMarker: null});
            return;
        }
        //Close any active marker if not selected
        if (!props.clickIndex || (this.state.currentMarker &&
            (this.state.markers[props.clickIndex] !== this.state.currentMarker))) {
            this.closeInfoWindow();
        }
        // Treat the marker as clicked
        this.onMarkerClick(this.state.markerProps[props.clickIndex], this.state.markers[props.clickIndex]);
    }

  loadMap = (props, map) => {
    //Sets initial map state and starts setting up markers for all locations
        this.setState({map});
        this.updateMarkers(this.props.filtered);
    }

    closeInfoWindow = () => {
        // Disables any current marker animations, closes open window and removes
        //marker from active state.
        this.state.currentMarker && this.state.currentMarker.setAnimation(null);
        this.setState({windowOpen: false, currentMarker: null, currentMarkerProps: null});
    }

    getVenueInfo = (props, data) => {
      //Filters Foursquare results for the desired location.
        return data.response.venues.filter(venue => venue.name.includes(props.name) || props.name.includes(venue.name));
    }

    onMarkerClick = (props, marker) => {

      const API_client = 'JREQJDPN2KCB04GMNDHBT3RDSOHLFEPKBYA0UQP3I1J0TQI1'
      const API_secret = 'DEG5V0ADZNHJPYSROBIYU1VTIKDU4R0QCN2UCUB0IDXLJYKH'
      const API_v = '20180323'
      //De-activates any current markers.
        this.closeInfoWindow();

        let url = `https://api.foursquare.com/v2/venues/search?client_id=${API_client}&client_secret=${API_secret}&v=${API_v}&radius=100&ll=${props.position.lat},${props.position.lng}&llAcc=100`;
        let headers = new Headers();
        let request = new Request(url, {
            method: 'GET',
            headers
        });
        //Fetches the venue data at the current marker's position.
        let currentMarkerProps;
        fetch(request)
            .then(response => response.json())
            .then(result => {
                let venue = this.getVenueInfo(props, result);
                currentMarkerProps = {
                    ...props,
                    venueData: venue[0]
                };
                //If venue was retrieved, fetch available photos for venue.
                if (currentMarkerProps.venueData) {
                    let url = `https://api.foursquare.com/v2/venues/${venue[0].id}/photos?client_id=${API_client}&client_secret=${API_secret}&v=${API_v}`;
                    fetch(url)
                        .then(response => response.json())
                        .then(result => {
                          //If the result includes photos, add them to the marker's props
                          if(result.response.photos) {
                            currentMarkerProps = {
                                ...currentMarkerProps,
                                images: result.response.photos
                            };
                            //Make current marker bounce, and set states for the marker.
                            marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
                            this.setState({windowOpen: true, currentMarker: marker, currentMarkerProps});
                          }
                          else {
                          marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
                          this.setState({windowOpen: true, currentMarker: marker, currentMarkerProps});
                          }
                        })
                        .catch (error => {
                          currentMarkerProps = {
                            ...currentMarkerProps,
                            errorMessage: 'Could not load data'
                          }
                          marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
                          this.setState({windowOpen: true, currentMarker: marker, currentMarkerProps});
                        })
                }
                else {
                    //Make current marker bounce and set states even if no API data retrieved.
                    marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
                    this.setState({windowOpen: true, currentMarker: marker, currentMarkerProps});
                }
            })
            .catch (error => {
              currentMarkerProps = {
                ...props,
                errorMessage: 'Could not load data'
              }
              marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
              this.setState({windowOpen: true, currentMarker: marker, currentMarkerProps});
            })
    }

    updateMarkers = (locations) => {
      //Removes any current markers.
        this.state.markers.forEach(marker => marker.setMap(null));

        //Map over ever location and create its props
        let markerProps = [];
        let markers = locations.map((location, index) => {
            let props = {
                key: location.name,
                index,
                name: location.name,
                position: location.pos,
                url: location.url
            };
            markerProps.push(props);
            //Create markers, add animation and click event listener
            let animation = this.props.google.maps.Animation.DROP;
            let marker = new this.props.google.maps.Marker({position: location.pos, map: this.state.map, animation});
            marker.addListener('click', () => {
                this.onMarkerClick(props, marker);
            });
            return marker;
        })
        this.setState({markers, markerProps});
          }

  render() {
    let marker = this.state.currentMarkerProps;



    return(

      <Map
        className='google-map'
        role='application'
        aria-label='map'
        google={this.props.google}
        initialCenter={{
            lat: this.props.lat,
            lng: this.props.lng
          }}
        zoom={this.props.zoom}
        onReady={this.loadMap}
        onClick={this.closeInfoWindow}>

                <InfoWindow
                    marker={this.state.currentMarker}
                    visible={this.state.windowOpen}
                    onClose={this.closeInfoWindow}
                    >
                    <div>
                      <h3>{marker && marker.name}</h3>
                      <p>{marker && marker.address}</p>
                      <p><a href={marker && marker.url}>Visit site</a></p>
                      <p>{marker && marker.errorMessage}</p>
                      <img className='info-photo' src={(marker && marker.images) ? marker.images.items[0].prefix + "100x100" + marker.images.items[0].suffix : ''} alt={marker ? marker.name : 'eatery'}/>
                      <h6>Image provided by Foursquare</h6>
                    </div>
                </InfoWindow>
        </Map>


    )
  }
}

export default GoogleApiWrapper({apiKey: "AIzaSyC7Ajn8xAlcvEff7CvTz6pjo-Nq8aAyDdI", LoadingContainer: ErrorHandler})(MapContainer)
