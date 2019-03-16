import React from 'react'

import './word.css'

const hidden = '_'

const Word = ({letter, clickChecked,}) => (
      <li className='letter'>{clickChecked.has(letter) ? letter : hidden}</li>
)

export default Word