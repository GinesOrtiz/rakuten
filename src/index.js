import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import './styles.scss'

const rootElement = document.querySelector('#rakuten')

console.log(process.env)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
)
