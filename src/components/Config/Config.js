import React, {Component} from 'react'
import Plus from 'react-icons/lib/fa/plus-circle'
import ArrowRight from 'react-icons/lib/fa/arrow-right'
import Check from 'react-icons/lib/fa/check'
import CheckCircle from 'react-icons/lib/fa/check-circle'
import Sync from 'react-icons/lib/fa/check'

import {days, times, langs} from '../../constants'
import {timeToReadable} from '../../helpers'
import User from '../../User'
import Store from '../../Store'
import Menu from '../Menu/Menu'
import './Config.css'

class Config extends Component {
  constructor(props) {
    super(props)

    this.updateUser = this.updateUser.bind(this)

    const currentUser = (props.users && props.users[0]) || new User()

    this.state = {
      currentUser,
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
    this.updateUser(user => {
      user.name = evt.target.value
      return user
    })
  }

  toggleLang(lang) {
    this.updateUser(user => {
      user.langs[lang] = !user.langs[lang]
      return user
    })
  }

  toggleAvailableAt(day, time) {
    this.updateUser(user => {
      user.toggleAvailableAt(day, time)
      return user
    })
  }

  toggleAll(day) {
    const currentUser = this.state.currentUser
    const hasAvailability = currentUser.hasAvailabilityOnDay(day)
    times.forEach(time => {
      currentUser.toggleAvailableAt(day, time, !hasAvailability)
    })
    this.setState({currentUser})
    Store.save()
  }

  setLunchTime(evt, day) {
    this.updateUser(user => {
      user.setLunchTime(day, evt.target.value)
      return user
    })
  }

  updateUser(action) {
    const currentUser = action(this.state.currentUser)
    this.setState({currentUser})
    Store.save()
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
            key={user.id}
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
        <div className="reset" onClick={() => Store.recalculate()}>
          <Sync />
          Recalculate the schedule (!)
        </div>
      </div>
    )
  }

  renderUserDetails() {
    return (
      <div className="user-details">
        <div className="name">
          <label>Name</label>
          <input
            type="text"
            className="name-input"
            value={this.state.currentUser.name}
            onChange={evt => this.renameUser(evt)}
          />
        </div>
        <div className="lang">
          <label>Languages</label>
          <div className="lang-checkboxes">
            {Object.keys(langs).map(lang_key => (
              <div className="lang-checkbox" key={lang_key}>
                <label>
                  <input
                    type="checkbox"
                    value="true"
                    checked={this.state.currentUser.canSpeak(lang_key)}
                    onChange={() => this.toggleLang(lang_key)}
                  />
                  {langs[lang_key]}
                </label>
              </div>
            ))}
          </div>
        </div>
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
            <tr>
              <th />
              {days.map((day, index) => (
                <th
                  key={index}
                  className="cell-head"
                  onClick={() => this.toggleAll(index)}
                >
                  <CheckCircle />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map(time => (
              <tr key={time}>
                <td className="cell time">{timeToReadable(time)}</td>
                {days.map((day, index) => {
                  let className = 'cell cell-time'
                  let content = null
                  if (this.state.currentUser.isAvailableAt(index, time)) {
                    className += ' available'
                    content = <Check />
                  }

                  return (
                    <td
                      key={index}
                      className={className}
                      onClick={() => this.toggleAvailableAt(index, time)}
                    >
                      {content}
                    </td>
                  )
                })}
              </tr>
            ))}
            <tr>
              <td className="cell time">Lunch</td>
              {days.map((day, day_index) => (
                <td className="cell-lunch" key={day_index}>
                  <select
                    value={this.state.currentUser.getlunchTime(day_index)}
                    onChange={evt => this.setLunchTime(evt, day_index)}
                  >
                    <option value="0">None</option>
                    {times.map(time => (
                      <option value={time} key={time}>
                        {timeToReadable(time)}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Config
