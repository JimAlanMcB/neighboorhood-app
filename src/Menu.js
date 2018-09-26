import React, { Component } from "react";

class Menu extends Component {
  state = {
    query: ""
  };
  handleSearch = query => {
    this.setState({ query: query });
    query = query.toLowerCase();
    this.props.onSearchLocs(query);
  };
  handleLocationClick = e => {
    let search = e.target.innerText.toLowerCase();
    this.handleSearch(search);
  };
  clearSearch = () => {
    const input = document.getElementsByTagName("input")[0];
    input.value = "";
    this.props.clearSearch();
  };
  sortFiveStars = () => {
    this.props.sortFiveStars();
  };
  render() {
    return (
      <div className="query-locs">
        <div className="query-locs-bar" id="nav">
          <div className="query-locs-input-wrapper">
            <label id="search-input" htmlFor="search-input" />
            <input
              id="search-input"
              type="text"
              aria-label="SearchInput"
              placeholder="Name or Star Rating"
              onChange={e => this.handleSearch(e.target.value)}
            />
            <button className="query-btn" onClick={this.sortFiveStars}>
              4+ Stars only
            </button>
            <button className="query-btn" onClick={this.clearSearch}>
              Clear
            </button>
            <div className="locs-holder">
              <h2>Parks in Phoenix</h2>
              {this.props.locs.map(l => {
                return (
                  <li
                    key={l.name}
                    className="locs-name"
                    onClick={this.handleLocationClick}
                    aria-labelledby={l.name}
                    tabIndex="0"
                  >
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
