import React, { Component } from "react";
import "./Joke.css";

class Joke extends Component {
  render() {
    const funFactorHandler = (direction) => {
      this.props.plus(this.props.position, direction);
    };

    const chooseEmote = () => {
      let emote = "";
      let border = "";
      if (this.props.fun === 0) {
        emote = "em-neutral_face";
        border = "border-solid border-4 border-blue-400";
        return [emote, border];
      }
      if (this.props.fun > 0 && this.props.fun <= 3) {
        emote = "em-smile";
        border = "border-solid border-4 border-green-400";
        return [emote, border];
      }
      if (this.props.fun > 3 && this.props.fun <= 7) {
        emote = "em-joy";
        border = "border-solid border-4 border-green-600";
        return [emote, border];
      }
      if (this.props.fun > 7) {
        emote = "em-rolling_on_the_floor_laughing";
        border = "border-solid border-4 border-green-800";
        return [emote, border];
      }
      if (this.props.fun < 0 && this.props.fun >= -3) {
        emote = "em-cry";
        border = "border-solid border-4 border-yellow-400";
        return [emote, border];
      }
      if (this.props.fun < -3 && this.props.fun >= -6) {
        emote = "em-sob";
        border = "border-solid border-4 border-yellow-600";
        return [emote, border];
      }
      if (this.props.fun < -6) {
        emote = "em-nauseated_face";
        border = "border-solid border-4 border-red-800";
        return [emote, border];
      }
    };

    return (
      <div className="flex items-center p-5 bottom">
        <i
          onClick={(e) => funFactorHandler("plus", e)}
          className="fas fa-arrow-up text-xl text-gray-300 cursor-pointer hover:text-yellow-300"
        ></i>
        <div
          className={`flex
        justify-center 
        items-center
        mx-3
        circle
        rounded-full 
        shadow-xl 
        ${chooseEmote()[1]}`}
        >
          {this.props.fun}
        </div>
        <i
          onClick={(e) => funFactorHandler("minus", e)}
          className="fas fa-arrow-down text-xl text-gray-300 pr-8 cursor-pointer hover:text-yellow-300"
        ></i>
        <div className="flex items-center pr-16 text-width">
          {this.props.joke}
        </div>
        <i
          className={`em ${
            chooseEmote()[0]
          } text-4xl textshadow`}
        ></i>
      </div>
    );
  }
}

export default Joke;
