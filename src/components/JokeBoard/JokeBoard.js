import React, { Component } from "react";
import Joke from "../Joke/Joke";
import axios from "axios";
import "./JokeBoard.css";

class JokeBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
      numberOfJokes: 10,
      loading: false,
    };
    this.getJokes = this.getJokes.bind(this);
  }

  async getJokes() {
    this.setState({ loading: true });
    let jokes = [];
    let n = 0;
    while (n < this.state.numberOfJokes) {
      await axios
        .get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" },
        })
        .then((response) => {
          if (!jokes.some((el) => el.id === response.data.id)) {
            response.data.funFactor = 0;
            jokes.push(response.data);
            this.setState({ jokes: jokes });
          } else {
            n--;
          }
        });
      n++;
    }
    this.setState({ loading: false })
  }

  componentDidMount() {
    this.getJokes();
  }

  render() {
    const changeFunFactor = (idOfJoke, direction) => {
      let newFF = [];
      let indexOfJoke = 0;
      this.state.jokes.map((j, index) => {
        if (j.id === idOfJoke) {
          indexOfJoke = index;
          newFF = j;
          if (direction === "plus") {
            newFF.funFactor += 1;
          } else if (direction === "minus") {
            newFF.funFactor -= 1;
          }
        }
      });
      let newJokes = [...this.state.jokes];
      newJokes.splice(indexOfJoke, 1, newFF);
      this.setState({ jokes: newJokes });
    };

    const renderJokesList = () => {
      if (this.state.loading) {
        return (
          <div>
            <h1 className="text-center mt-44">Loading...</h1>
            <div className="spinner"></div>
          </div>
        );
      }
      if (!this.state.loading) {
        return (this.state.jokes.map((j) => (
          <Joke
            key={j.id}
            position={j.id}
            joke={j.joke}
            fun={j.funFactor}
            plus={changeFunFactor}
          />
        )))
      }
    };

    return (
      <div className="flex w-screen h-screen diagonal">
        <div className="flex flex-col mt-40 ml-40 mb-40 w-80 justify-center bg-purple-500 shadow-xl min-w-max">
          <h1 className="text-center pb-6 text-white mx-10">Dad Jokes</h1>
          <div className="flex w-28 mx-auto mb-6 rounded-full shadow-xl">
            <i className="em em-joy mx-auto text-7xl"></i>
          </div>
          <button
            onClick={this.getJokes}
            className="diagonal 
            border-none 
            cursor-pointer 
            w-32
            h-12 
            rounded-2xl 
            mx-auto 
            shadow-xl 
            font-bold 
            text-white
            focus:outline-none
            transform
            transition
            ease-in
            duration-75
            active:scale-x-90"
          >
            New Jokes
          </button>
        </div>

        <div className="bg-white jokeList my-48 mr-16 overflow-y-scroll shadow-xl relative min-w-max">
          {renderJokesList()}
        </div>
      </div>
    );
  }
}

export default JokeBoard;
