import React, { Component } from "react";

class MobileButton extends Component {
  clearSearch = () => {
    this.props.clearSearch();
  };
  sortFiveStars = () => {
    this.props.sortFiveStars();
  };
  render() {
    return (
      <div className="button-holder">
     
        <button className="query-btn-mobile" onClick={this.sortFiveStars}>
          4+ Stars
        </button>
        <button className="query-btn-mobile" onClick={this.clearSearch}>
          Clear
        </button>
      </div>
    );
  }
}

export default MobileButton;
