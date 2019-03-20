import React from 'react'

import './word.css'

const hidden = '_'

const Word = ({letter, clickChecked, index}) => (
      <li className='letter'>{clickChecked || index === 0 ? letter : hidden}</li>
)

export default Word