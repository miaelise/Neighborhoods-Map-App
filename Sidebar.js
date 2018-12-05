import React from 'react';

class Sidebar extends React.Component {

componentDidMount() {
  //Set up listener for filter on the sidebar
  this.listenForFilter();
}

listenForFilter() {
  //If user selects any filter, assign filter and pass up chain
  document.querySelector('.eats').addEventListener('click', () => {
    //If filter is not already assigned, assign to event target
    if (this.props.filter !== 'E') {
      this.props.filterVenues('E')
    }
    //If filter is assigned, reset to all
    else {
      this.props.filterVenues(null)
    }
  })
  document.querySelector('.treats').addEventListener('click', () => {
    if (this.props.filter !== 'T') {
      this.props.filterVenues('T')
  }
  else {
    this.props.filterVenues(null)
    }
  })
}

render() {

   return(

      <div className='sidebar'>

      <div className='dropdown'>
        <button className='filter-btn'>Filter</button>
        <div className='content'>
          <p className='eats'>{this.props.filter !== 'E' ? 'Eats' : 'All'}</p>
          <hr />
          <p className='treats'>{this.props.filter !== 'T' ? 'Treats' : 'All'}</p>
        </div>

      </div>

        <ol>
            {
              this.props.filtered.map((venue, index) =>

              <li key={venue.name} cat={venue.category}>
              <h4 tabIndex='0' className='venue-name' onClick={e => this.props.clickVenue(index)}>{venue.name || 'Venue'}</h4>
              <p className='venue-address'>{venue.address || 'Address'} </p>
              </li>
            )
          }
        </ol>
      </div>
    )
  }
}

export default Sidebar
