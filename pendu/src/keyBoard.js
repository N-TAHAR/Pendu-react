import React from 'react'

import './keyBoard.css'

const KeyBoard = ({alpha, onClick}) => (
  <li className={`alpha ${onClick ? 'correct' : 'wrong'}`} onClick={() => onClick(alpha)}>{alpha}</li>
)

export default KeyBoard