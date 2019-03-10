import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'

import './App.css';

import Word from './word'

class App extends Component {

  state = {
    word: this.generateWords(),
    guesses: 0,
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

  

  render() {
    return (
      <div className="App">
        <h1>PENDU</h1>
        <div className="word">
          {this.state.word.map( letter =>(
            // <div className="letter">{letter}</div>
            <Word letter={letter}/>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
