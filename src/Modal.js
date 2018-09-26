import React, { Component } from "react";

class Modal extends Component {
  handleClick = () => {
    this.props.onModalClick();
  }
  
  render() {
    return (
      <div className="modal">
       
      <div className="modal-msg">
      <h1>Phoenix Arizona Parks</h1>
      
      <button className="go-btn" onClick={this.handleClick}>Explore</button>
        </div>
      </div>
    );
  }
}

export default Modal;
