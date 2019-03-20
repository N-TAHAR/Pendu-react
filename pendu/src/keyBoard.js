import React from 'react'

import './keyBoard.css'

const KeyBoard = ({alpha, onClick, correct, wrong}) => (
  <li className={`alpha ${correct ? 'correct' : ''} ${wrong ? 'wrong' : ''}`} onClick={() => onClick(alpha)}>{alpha}</li>
)

export default KeyBoard