import React, { Component } from 'react';
import MapContainer from './MapContainer.js'
import Sidebar from './Sidebar.js'
import locations from './locations.json'
import './App.css';

class App extends Component {
  state = {
    lat: 34.1745281,
    lng: -118.2692868,
    zoom: 12,
    locations: locations,
    filtered: locations,
    filter: null,
    clickIndex: null,
    open: false
  }

  filterVenues = (filter) => {
    //Filter venues by selected category
    let filtered = this.state.locations.filter(venue => venue.cat.includes(filter))
    if (filter !== null) {
      this.setState({filtered: filtered, filter})
    }
    //If filter unselected, reset to all
    else {
      this.setState({filtered: locations, filter})
    }
  }

  clickVenue = (index) => {
    //Set state to clicked list venue
    this.setState({ clickIndex: index, open: !this.state.open })
  }

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <h1>Tasty Eats & Treats</h1>
        </header>

        <div className="App-body" role='main'>

          <section className="sidebar-section">

          { <Sidebar
            locations={this.state.locations}
            filtered={this.state.filtered}
            lat={this.state.lat}
            lng={this.state.lng}
            filter={this.state.filter}
            filterVenues={this.filterVenues}
            clickVenue={this.clickVenue}
            /> }

          </section>


          <div className='map-section'>

            <MapContainer
              className='map'
              locations={this.state.locations}
              filtered={this.state.filtered}
              lat={this.state.lat}
              lng={this.state.lng}
              zoom={this.state.zoom}
              filter={this.state.filter}
              clickVenue={this.clickVenue}
              clickIndex={this.state.clickIndex}
            />

          </div>

        </div>
      </div>

    );
  }
}

export default App;
