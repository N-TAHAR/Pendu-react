import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'

import './App.css';

import Word from './word'
import KeyBoard from './keyBoard'

let matched = []
const guesses = 5

class App extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      word: this.generateWords(),
      guesses: guesses,
      keyBoard: this.alphabet(),
      clicked: new Set(),
      correct: new Set(matched[0]),
      wrong: new Set(),
      lose: false,
      win: false,
      again: false
    }
    this.reset = this.reset.bind(this)
    window.addEventListener('keypress', (e) =>{
      if(e.keyCode === 13 || e.keyCode === 32){return}
      this.verify(e.key);
    })
  }
  
  generateWords() {
    matched = []
    const word = []
    const words = ["Fleur", "Elephant", "Dinosaure", "Dispositif", "Camp", "Gorille", "Parents", "Charrue", "Arbre", "Chien", "Chat", "Anticonstitutionnellement", "Algerie", "Nintendo", "Stage"]
    const memo =  shuffle(words).pop().toLowerCase();
    for (let i = 0; i < memo.length; i++) {
      word.push(memo[i])
      matched.push(memo[i])
    }
    return word
  }

  alphabet() {
    const keyBoard = []
    for (let i = 65; i <= 90; i++) 
      keyBoard.push(String.fromCharCode(i))
    return keyBoard
  }

  verify = alpha => {
    if(this.state.win === true){ return }
    if(this.state.lose === true){ return }
    this.correct(alpha)
    this.won(matched, this.state.correct)
  }

  correct(alpha){
    alpha = alpha.toLowerCase()
    for(let i = 0; i < matched.length; i++)
      if (matched[i] === alpha){ return this.setState({correct: this.state.correct.add(alpha)})} 
    // let newGuesses = this.state.guesses - 1
    // if(this.state.again === true){ 
    //   newGuesses = this.state.guesses + 1
    //   // this.setState({again: false})    
    // }
    this.setState({wrong: this.state.wrong.add(alpha), guesses: this.state.guesses - 1})
    if(this.state.guesses === 0){ 
      this.setState({lose: true}) 
      window.addEventListener("keypress", (e)=>{
        if(e.keyCode === 13){this.reset()}
      })
    }
  }

  won(array, set) {
    for(let i = 0; i < array.length; i++)
        if(!set.has(array[i]))
            return
    this.setState({win: true})
    window.addEventListener("keypress", (e)=>{
      if(e.keyCode === 13){this.reset()}
    })
  }

  reset(){
    this.setState({
      word: this.generateWords(),
      guesses: guesses,
      keyBoard: this.alphabet(),
      clicked: new Set(),
      correct: new Set(matched[0]),
      wrong: new Set(),
      lose: false,
      win: false,
      again: true
    })
    window.removeEventListener("keypress", ()=>{})
  }
   
  render() {
    const result = this.state.win || this.state.lose
    return (
      <div className="App">
        <h1 className="title">PENDU</h1>
        <ul className="word">
          {this.state.word.map( (letter, index) =>(
            <Word letter={letter} key={index} index={index} clickChecked={this.state.correct.has(letter)}/>
          ))}
        </ul>
        {result && <span className="result">YOU {this.state.win ? 'WIN' : 'LOSE'}</span>}
        <ul className="keyBoard">
          {this.state.keyBoard.map( (alpha, index) =>(
            <KeyBoard alpha={alpha} key={index} correct={this.state.correct.has(alpha.toLowerCase())} wrong={this.state.wrong.has(alpha.toLowerCase())} onClick={this.verify}/>
          ))}
        </ul>
        <p>Nombre de tentative : {this.state.guesses}</p>
        <button onClick={this.reset}>Recommencer</button>
      </div>
    );
  }
}

export default App;
