import React, {Component} from 'react'

import Menu from '../Menu/Menu'
import './Config.css'

class Config extends Component {
  render() {
    return (
      <div className="app">
        <Menu />
        <div className="Config">Config</div>
      </div>
    )
  }
}

export default Config
