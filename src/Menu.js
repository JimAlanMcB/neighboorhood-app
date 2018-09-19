import React, { Component } from "react";

class Menu extends Component {
  state = {
    query: ""
  };

  handleSearch = query => {
    this.setState({ query: query });
    this.props.onSearchLocs(query);
  };
  handleSort = () => {
    console.log(this.props.locs);
  };
  handleLocationClick = e => {
    let search = e.target.innerText.toLowerCase()
    this.handleSearch(search)
    // recenter map on location
  };
  clearSearch = () => {
    this.handleSearch('')
  }
  sortFiveStars = () => {
    // going to have to turn str to number, then search by value. 
  }
  render() {
    return (
      <div className="query-locs">
        <div className="query-locs-bar">
          <div className="query-locs-input-wrapper">
            <input
              type="text"
              placeholder="Search by Name or Rating"
              onChange={e => this.handleSearch(e.target.value)}
            />
            <button className="query-btn" onClick={this.handleSort}>
              Sort by Star Rating
            </button>
            <button className="query-btn" onClick={this.sortFiveStars}>
              5+ Stars only
            </button>
            <button className="query-btn" onClick={this.clearSearch}>
              Clear
            </button>
            <div className="locs-holder">
            <h2>Parks in Phoenix</h2>
              {this.props.locs.map(l => {
                return (
                  <li key={l.name} className="locs-name" onClick={this.handleLocationClick}>
                    {l.name}
                    
                  </li>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
