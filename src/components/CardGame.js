import React, { Component } from 'react';
import ReactCardFlip from 'react-card-flip';


export default class CardGame extends Component {
  constructor(props) {
    super(props);
    /* The height and weight are state since they change over time and can't be computed from anything. This component (as the common owner component of the state) or its parent (i.e. App) can maintain the state information since it renders the BMI value based on that state. */
    this.state = {
      card1Flipped: false,
      card2Flipped: false,
      card3Flipped: false,
      cardWinner: 1,
      gameOver: false,

    };

    // Bind 'this' in the callback
    this.handleReset = this.handleReset.bind(this);
    this.setWinningCard = this.setWinningCard.bind(this);
  }

  setWinningCard () {
    return Math.floor((Math.random() * 3) + 1)
  }

  componentDidMount() {
    this.setState({ cardWinner: this.setWinningCard()});
  }

  handleFlip(cardNumber) {
    let cardFlipped = `card${cardNumber}Flipped`;
    this.setState(prevState => {
      console.log("prevState.gameOver", prevState.gameOver);
      return ({ 
          [cardFlipped]: !prevState[cardFlipped],  
          gameOver: !prevState.gameOver
        })
    });
  }

  handleReset(e){
    this.setState({ 
      card1Flipped: false,
      card2Flipped: false,
      card3Flipped: false,
      gameOver: false,
      cardWinner: this.setWinningCard()
    })
  }

  _winningCard (cardNumber){
    if (cardNumber === this.state.cardWinner){
      return (
        <div>
          <h2>Winner :D</h2>
          <button key={`tryagain${cardNumber}`} onClick={this.handleReset}>Try Again</button>
          <button key={`quit${cardNumber}`} onClick={this.handleReset}>Quit</button>
        </div>
      )
    }else{
      return (
        <div>
          <h2>Loser :(</h2>
          <button key={`tryagain${cardNumber}`} onClick={this.handleReset}>Try Again</button>
          <button key={`quit${cardNumber}`} onClick={this.handleReset}>Quit</button>
        </div>
      )
    }
  }

  _buttonFlip (cardNumber){
    console.log("this.state.gameOver", this.state.gameOver);
    return (
      <button key={`buttonFlip${cardNumber}`} onClick={this.handleFlip.bind(this, cardNumber)} disabled={this.state.gameOver}>Click to flip</button>
    )
  }

  _GameCards (){
    return [1,2,3].map(cardNumber => (
        <ReactCardFlip key={`ReactCardFlip${cardNumber}`} isFlipped={this.state[`card${cardNumber}Flipped`]} flipDirection="horizontal">
        <div key="front" style={cardStyle}>
          <h2>{cardNumber}</h2>
          {this._buttonFlip(cardNumber)}
        </div>
        <div key="back" style={cardStyle}>
          {this._winningCard(cardNumber)}
        </div>
      </ReactCardFlip>
      )
    )
  }

  render() {
    console.log("Card winner", this.state.cardWinner);
    return (
      <div>
        <h1 style={ headingStyle }>Win!</h1>
        <p>Choose the card with the letter A to win.</p>
        <div style={cards}>
          {this._GameCards()}
        </div>
      </div>
    )
  }
}

// Define internal CSS rule which can also be used by multiple elements
const headingStyle = {
  margin: '80px',
  float: 'left'
}

const cards = {
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '150px'
  
}

const cardStyle = {
  height: '300px',
  width: "200px",
  border: "1px solid black",
  borderRadius: '3px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems : 'center',
}
