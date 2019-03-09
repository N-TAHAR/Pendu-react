import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'

import './App.css';

const words = ["Fleur", "Elephant", "Dinosaure"]
console.log(shuffle(words))
class App extends Component {


  
  // generateWords() {
  //   return shuffle(words)
  // }
    
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
