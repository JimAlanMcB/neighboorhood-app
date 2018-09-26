import React, { Component } from "react";

class MobileNav extends Component {
  state = {
    dropped: false
  };
  dropNav = () => {
    const nav = document.getElementById("nav");
    const button = document.getElementById("nav-button");
    const navArrow = document.getElementById("nav-arrow");
    const navMenu = !this.state.dropped
      ? ((button.style.top = "50%"), (nav.style.height = "48%"), (this.setState({dropped: true})), (navArrow.innerText = "↑"))
      : ((button.style.top = "26%"), (nav.style.height = "20%"), (this.setState({dropped: false})), (navArrow.innerText = "↓"));
      return navMenu
  };
  render() {
    return (
      <div className="nav-main" id="nav-button">
        <button className="nav-menu" id="nav-arrow" onClick={this.dropNav}>
          ↓
        </button>
      </div>
    );
  }
}
export default MobileNav;
