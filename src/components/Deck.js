import React, { Component } from "react";
import Card from "./Card";
import axios from "axios";

class Deck extends Component {
  state = {
    deckId: [],
    drawnCards: []
  };

  async componentDidMount() {
    await axios
      .get("https://deckofcardsapi.com/api/deck/new/shuffle/")
      .then((response) => {
        this.setState({
          deckId: response.data.deck_id
        });
      });
  }

  render() {
    const clickHandler = async (event) => {
      const rotationList = ["1", "2", "3", "6", "12", "45"];
      const rotationAngleList = ["", "-"];
      let ranRotation =
        rotationList[Math.floor(Math.random() * rotationList.length)];
      let ranAngle =
        rotationAngleList[Math.floor(Math.random() * rotationAngleList.length)];
      try {
        await axios
          .get(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/`)
          .then((response) => {
            response.data.cards[0].rotation = ranRotation;
            response.data.cards[0].angle = ranAngle;
            console.log(response.data.cards);
            if (response.data.remaining === 0) {
              alert("No more cards remaining!");
              window.location.reload(false);
            } else {
              this.setState({
                drawnCards: [...this.state.drawnCards, response.data.cards[0]],
              });
            }
          });
      } catch (err) {
        alert("API se zakašlja, molim te pitaj novu kartu :)");
      }
    };

    return (
      <div>
        <button
          className="flex 
        mx-auto 
        my-16 
        p-4 
        bg-indigo-400 
        rounded-lg 
        border-none 
        cursor-pointer 
        text-white 
        font-bold"
          onClick={clickHandler}
        >
          Draw Card
        </button>
        <div className="flex justify-center">
          {this.state.drawnCards.map((cards) => <Card
                imageUrl={cards.image}
                value={cards.value}
                suit={cards.suit}
                angle={cards.angle}
                rotation={cards.rotation}
              />
            )}
        </div>
      </div>
    );
  }
}

export default Deck;
