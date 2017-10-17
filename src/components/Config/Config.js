import React, {Component} from 'react'
import Plus from 'react-icons/lib/fa/plus-circle'
import ArrowRight from 'react-icons/lib/fa/arrow-right'
import Check from 'react-icons/lib/fa/check'

import {days, times} from '../../constants'
import {timeToReadable} from '../../helpers'
import User from '../../User'
import Menu from '../Menu/Menu'
import './Config.css'

class Config extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: props.users && props.users[0],
      users: props.users
    }
  }

  addNewUser() {
    let name = 'My new member'
    let i = 2
    let is_unique
    let new_name = name
    do {
      is_unique = true
      this.state.users.forEach(user => {
        if (user.name === new_name) {
          is_unique = false
          new_name = name + ' #' + i
          i++
        }
      })
    } while (!is_unique)
    const users = this.state.users
    const user = new User(Math.random(), new_name)
    users.push(user)
    this.setState({users, currentUser: user})
  }

  renameUser(evt) {
    const user = this.state.currentUser
    user.name = evt.target.value
    this.setState({currentUser: user})
  }

  render() {
    return (
      <div className="app">
        <Menu />
        <div className="Config">
          {this.renderUserList()}
          {this.renderUserDetails()}
        </div>
      </div>
    )
  }

  renderUserList() {
    return (
      <div className="user-list">
        {this.state.users.map(user => (
          <div
            className="user-item"
            onClick={() => this.setState({currentUser: user})}
          >
            <div className="name">{user.name}</div>
            <div className="icon">
              {this.state.currentUser.id === user.id ? <ArrowRight /> : null}
            </div>
          </div>
        ))}
        <div className="user-item user-add" onClick={() => this.addNewUser()}>
          <Plus />
          New member
        </div>
      </div>
    )
  }

  renderUserDetails() {
    return (
      <div className="user-details">
        <input
          type="text"
          value={this.state.currentUser.name}
          onChange={evt => this.renameUser(evt)}
        />
        <table className="timepicker">
          <thead>
            <tr>
              <th />
              {days.map((day, index) => (
                <th key={index} className="cell-head">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map(time => (
              <tr>
                <td>{timeToReadable(time)}</td>
                {days.map((day, index) => {
                  let className = 'cell-time'
                  let content = null
                  if (this.state.currentUser.isAvailableAt(day, time)) {
                    className += ' available'
                    content = <Check />
                  }

                  return (
                    <td
                      key={index}
                      className={className}
                      onClick={() =>
                        this.state.currentUser.toggleAvailableAt(day, time)}
                    >
                      {content}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Config
