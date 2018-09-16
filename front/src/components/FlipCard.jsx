import React, { Component } from 'react';


class FlipCard extends Component {
  state = {
    isOpen: false,
  }

  cardClickHandler = (e) => {
    if (!this.props.closeCard) {
      e.currentTarget.classList.toggle('flip');
      this.setState({ isOpen: !this.state.isOpen });
      this.props.openedCounter(this.props.id);
    }
  }

  render() {
    return (
      <div id={this.props.id} className="flip-container" onClick={this.cardClickHandler}>
        <div className="flipper">
          <div className="front">
            <div className='color'></div>
          </div>
          <div className="back">
          <img src={`/img/${this.props.back}`} alt="JS Framework"/> 
          </div>
        </div>
      </div>
    )
  }
}

export default FlipCard;
