import React, { Component } from "react";

class Card extends Component {
    

  
  render() {



    return (
      <div className={`absolute transform ${this.props.angle}rotate-${this.props.rotation}`}>
        <img
          src={`${this.props.imageUrl}`}
          alt={`${this.props.value} of ${this.props.suit}`}
        />
        {console.log(this.props.angle, this.props.rotation)}
        
      </div>
    );
  }
}

export default Card;
