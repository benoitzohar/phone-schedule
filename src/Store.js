import User from './User'
import {days, times, langs} from './constants'

const MAX_PEOPLE_AT_THE_SAME_TIME = 2

export default {
  users: [],
  load() {
    try {
      const users = JSON.parse(window.localStorage.users || '[]')
      this.users = users.map(user => User.initFromObject(user))
    } catch (e) {
      console.error(e)
    }
  },

  save() {
    window.localStorage.users = JSON.stringify(this.users)
  },

  recalculate() {
    // Reset all
    this.users.forEach(user => user.resetWork())

    days.forEach((day, day_index) => {
      const stats = {
        total_worked_halfs: 0,
        max_working: {}
      }
      this.users.forEach(user => {
        stats.total_worked_halfs += user.available[day_index].length
      })

      this.users.forEach(user => {
        stats.max_working += stats.total_worked_halfs / this.users.length //TODO
      })
      times.forEach(time => {
        let nb_of_people = 0
        let found_langs = []

        this.users.forEach(user => {
          if (nb_of_people >= MAX_PEOPLE_AT_THE_SAME_TIME) {
            return
          }
          Object.keys(langs).forEach(lang => {
            if (nb_of_people >= MAX_PEOPLE_AT_THE_SAME_TIME) {
              return
            }
            if (
              found_langs.indexOf(lang) === -1 &&
              user.canSpeak(lang) &&
              user.isAvailableAt(day_index, time) &&
              !user.worksAt(day_index, time) &&
              !user.hasLunchAt(day_index, time) &&
              !user.isWorkingMoreThan(stats.max_working[user.id], day_index)
            ) {
              user.toggleWorksAt(day_index, time, true)
              found_langs.push(lang)
              nb_of_people++
            }
          })
        })
      })
    })

    this.save()
  }
}
