import React, {Component} from 'react'
import Phone from 'react-icons/lib/fa/phone'
import Lunch from 'react-icons/lib/go/squirrel'

import {days, times} from '../../constants'
import {timeToReadable} from '../../helpers'
import Menu from '../Menu/Menu'
import './Schedule.css'

class Schedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDay: 0,
      users: props.users
    }
  }

  render() {
    return (
      <div className="app">
        <Menu />
        <div className="Schedule">
          {this.renderDayPicker()}
          {this.renderSchedule()}
        </div>
      </div>
    )
  }

  renderDayPicker() {
    return (
      <div className="day-picker">
        {days.map((day, index) => (
          <button
            key={index}
            className={index === this.state.currentDay ? 'active' : ''}
            onClick={() => this.setState({currentDay: index})}
          >
            {day}
          </button>
        ))}
      </div>
    )
  }

  renderSchedule() {
    return (
      <table className="table">
        <thead>
          <tr className="header">
            <th />
            {this.state.users.map((user, index) => (
              <th className="cell" key={user.name}>
                {user.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="body">
          {times.map(time => this.renderRow(time))}
        </tbody>
      </table>
    )
  }

  renderRow(time) {
    return (
      <tr key={time} className="row">
        <td className="cell time">{timeToReadable(time)}</td>
        {this.state.users.map(user => {
          let className = 'cell'
          let content = null
          if (user.isAvailableAt(this.state.currentDay, time)) {
            className += ' available'
          }
          if (user.worksAt(this.state.currentDay, time)) {
            className += ' works'
            content = <Phone />
          }
          if (user.hasLunchAt(this.state.currentDay, time)) {
            className += ' lunch'
            content = <Lunch />
          }
          return (
            <td key={user.name + time} className={className}>
              {content}
            </td>
          )
        })}
      </tr>
    )
  }
}

export default Schedule
