class User {
  constructor(name, available, work, lunch) {
    this.name = name
    this.available = available
    this.work = work
    this.lunch = lunch
  }

  isAvailableAt(day, time) {
    return this.available[day].indexOf(time) > -1
  }
  worksAt(day, time) {
    return this.work[day].indexOf(time) > -1
  }
  hasLunchAt(day, time) {
    return this.lunch[day] === time
  }
}

export default User
