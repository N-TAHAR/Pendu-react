import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'

import './App.css';

import Word from './word'
import KeyBoard from './keyBoard'

const matched = []

class App extends Component {

  // constructor(props){
  //   super(props)
  //   initialState = {
  //     word: this.generateWords(),
  //     guesses: 5,
  //     keyBoard: this.alphabet(),
  //     clicked: new Set(),
  //     correct: new Set(matched[0]),
  //     wrong: new Set(),
  //     lose: false,
  //     win: false
  //   }
  // }

  state = {
    word: this.generateWords(),
    guesses: 5,
    keyBoard: this.alphabet(),
    clicked: new Set(),
    correct: new Set(matched[0]),
    wrong: new Set(),
    lose: false,
    win: false
  }
  
  generateWords() {
    const word = []
    //const words = ["Fleur", "Elephant", "Dinosaure", "Dispositif", "Camp", "Gorille", "Parents", "Charrue", "Arbre", "Chien", "Chat", "Sabou", "Karoui", "Romana", "Saoud", "Amrane", "Benzina","Booba", "Anticonstitutionnellement", "Algerie", "Nintendo", "Stage","canopée", "moula", "perquisition", "braquage", "methamphetamine", "ketamine", "antivol"]
    const words = ["canapé", "moula", "perquisition", "braquage", "methamphetamine", "ketamine", "antivol"]
    const memo =  shuffle(words).pop().toLowerCase();
    for (let i = 0; i < memo.length; i++) {
      word.push(memo[i])
      matched.push(memo[i])
    }
    return word
  }

  alphabet() {
    const keyBoard = []
    for (let i = 65; i <= 90; i++) {
      keyBoard.push(String.fromCharCode(i))
    }
    window.addEventListener('keypress', (e) =>{
      this.verify(e.key);
    })
    return keyBoard
  }

  verify = alpha => {
    if(this.state.lose === true){ 
      return alert("C'est perdu ! Recharge la page.")
    }
    if(this.state.won === true){ return alert("C'est gagné ! Bien joué.")}
    alpha = alpha.toLowerCase()
    const newLetter = this.state.clicked.add( alpha )
    this.setState({clicked: newLetter})
    this.correct(alpha)
  }

  correct(alpha){
    alpha = alpha.toLowerCase()
    for(let i = 0; i < matched.length; i++){
      if (matched[i] === alpha){
        return this.setState({correct: this.state.correct.add(alpha)})
      } 
    }

    if(this.state.guesses > 0){
      const newGuesses = this.state.guesses - 1
      this.setState({wrong: this.state.wrong.add(alpha), guesses: newGuesses})
    }else{
      this.state.lose = true
      alert("C'est perdu")
    }
  }

  won(array, set) {
    for(let i = 0; i < array.length; i++) {
        if(!set.has(array[i]))
            return false;
    }
    this.state.won = true
    return true;
  }



  // reset(){
  //   console.log('yes')
  //   // const newWord = this.generateWords()
  //   // const newGuesses = 5
  //   // const newKeyboard = this.alphabet()
  //   // const newClicked = new Set()
  //   // const newCorrect = this.alphabet()
  //   // const newWrong = new Set()
  //   // const

  //   // this.state = {
  //   //   word: this.generateWords(),
  //   //   guesses: 5,
  //   //   keyBoard: this.alphabet(),
  //   //   clicked: new Set(),
  //   //   correct: new Set(matched[0]),
  //   //   wrong: new Set(),
  //   //   lose: false,
  //   //   win: false
  //   // }
  //   this.setState({wrong: this.state.wrong.add(alpha), guesses: newGuesses})

  // }
   
  render() {
    const won = this.won(matched, this.state.correct)
    return (
      <div className="App">
        <h1 className="title">PENDU</h1>
        <ul className="word">
          {this.state.word.map( (letter, index) =>(
            <Word letter={letter} key={index} index={index} clickChecked={this.state.clicked.has(letter)}/>
          ))}
        </ul>
        <ul className="keyBoard">
          {this.state.keyBoard.map( (alpha, index) =>(
            <KeyBoard alpha={alpha} key={index} correct={this.state.correct.has(alpha.toLowerCase())} wrong={this.state.wrong.has(alpha.toLowerCase())} onClick={this.verify}/>
          ))}
        </ul>
        <p>Nombre de tentative : {this.state.guesses}</p>
        {won && alert('gagné')}
        <button onClick={() => this.reset()}>Recommencer</button>
      </div>
    );
  }
}

export default App;
