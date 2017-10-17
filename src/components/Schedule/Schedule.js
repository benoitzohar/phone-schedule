import React, {Component} from 'react'

import Menu from '../Menu/Menu'
import './Schedule.css'

class Schedule extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="app">
        <Menu />
        <div className="Schedule">Schedule</div>
      </div>
    )
  }

  renderRow(row) {
    return (
      <div className="row">
        <div className="cell"> {row.title}</div>
        {row.times.map(time => (
          <div className="cell">{time ? 'YES' : 'nope'}</div>
        ))}
      </div>
    )
  }
}

export default Schedule
