import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'

import './App.css';

import Word from './word'
import KeyBoard from './keyBoard'

const set = new Set()
const matched = []


class App extends Component {

  state = {
    word: this.generateWords(),
    guesses: 0,
    keyBoard: this.alphabet(),
    clicked: set,
    matched1: set
  }
  
  generateWords() {
    const word = []
    const words = ["Fleur", "Elephant", "Dinosaure", "Dispositif", "Camp", "Gorille", "Parents", "Charrue", "Arbre", "Chien", "Chat", "Sabou", "Karoui", "Romana", "Saoud"]
    const memo =  shuffle(words).pop().toLowerCase();
    // console.log(memo)
    for (let i = 0; i < memo.length; i++) {
      word.push(memo[i])
      matched.push(memo[i])
    }
    console.log(matched)
    console.log(word)
    return word
  }

  alphabet() {
    const keyBoard = []
    for (let i = 65; i <= 90; i++) {
      keyBoard.push(String.fromCharCode(i))
    }
    window.addEventListener('keypress', (e) =>{
      console.log(e.key);
      this.verify(e.key);
    })
    // console.log(keyBoard)
    return keyBoard
  }

  verify = alpha => {
    alpha = alpha.toLowerCase()
    const newGuesses = this.state.guesses + 1
    const newLetter = this.state.clicked.add( alpha )
    // const newMatched = this.state.matched1.concat( alpha )
    for (let i = 0; i < matched.length; i++)
      if (matched[i] === alpha)
        this.setState({matched1: this.state.matched1.add(alpha)})
    this.setState({clicked: newLetter, guesses : newGuesses})
    // console.log(this.state.matched1);
    return this.correct(alpha)
  }

  correct = alpha => {
    // console.log(alpha)
    for(let i = 0; i < matched.length; i++){
      if (matched[i] === alpha){
        console.log('works')
        return true
      }
    }
    return false
    // console.log(this.state.matched1)
  }

  arraysEqual(array, set) {
    for(let i = 0; i < array.length; i++) {
        if(!set.has(array[i]))
            return false;
    }
    return true;
}

  render() {
    const won = this.arraysEqual(matched, this.state.matched1)
    // correct={this.state.clicked.has(letter)}
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
        <p>Nombre de tentative : {this.state.guesses}</p>
        {won && <p>Bravo</p>}
      </div>
    );
  }
}

export default App;
