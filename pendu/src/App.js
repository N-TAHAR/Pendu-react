import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'

import './App.css';

import Word from './word'
import KeyBoard from './keyBoard'

const set = new Set()

class App extends Component {

  state = {
    word: this.generateWords(),
    guesses: 0,
    keyBoard: this.alphabet(),
    clicked: set,
    matched: []

  }
  
  generateWords() {
    const word = []
    const words = ["Fleur", "Elephant", "Dinosaure"]
    const memo =  shuffle(words).pop().toLowerCase();
    console.log(memo)
    for (let i = 0; i < memo.length; i++) {
      word.push(memo[i])
    }
    console.log(word);
    return word
  }

  alphabet() {
    const keyBoard = []
    for (let i = 65; i <= 90; i++) {
      keyBoard.push(String.fromCharCode(i))
    }
    console.log(keyBoard)
    return keyBoard
  }

  verify = alpha => {
    const newGuesses = this.state.guesses + 1
    const newLetter = this.state.clicked.add( alpha.toLowerCase() )
    this.setState({clicked: newLetter, guesses : newGuesses})
    console.log(this.state.clicked);
  }


  render() {
    const won = this.state.clicked.has(this.state.word) === true
    return (
      <div className="App">
        <h1 className="title">PENDU</h1>
        <ul className="word">
          {this.state.word.map( (letter, index) =>(
            <Word letter={letter} key={index} index={index} clickChecked={this.state.clicked}/>
          ))}
        </ul>
        <ul className="keyBoard">
        {this.state.keyBoard.map( (alpha, index) =>(
            <KeyBoard alpha={alpha} key={index} index={index} onClick={this.verify}/>
          ))}
        </ul>
        <p>{this.state.guesses}</p>
        {won && <p>Bravo</p>}
      </div>
    );
  }
}

export default App;
