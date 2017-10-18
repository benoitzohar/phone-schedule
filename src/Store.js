import User from './User'

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
  }
}
