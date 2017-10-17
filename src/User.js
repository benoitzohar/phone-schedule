class User {
  constructor(
    id,
    name,
    available = [[], [], [], [], [], [], []],
    work = [[], [], [], [], [], [], []],
    lunch = []
  ) {
    this.id = id
    this.name = name
    this.available = available
    this.work = work
    this.lunch = lunch
  }

  isAvailableAt(day, time) {
    return this.available[day] && this.available[day].indexOf(time) > -1
  }
  toggleAvailableAt(day, time) {
    if (!this.available[day]) {
      this.available[day] = []
    }
    if (this.isAvailableAt(day, time)) {
      this.available[day].slice(this.available[day].indexOf(time), 1)
    } else {
      this.available[day].push(time)
    }
  }
  worksAt(day, time) {
    return this.work[day].indexOf(time) > -1
  }
  hasLunchAt(day, time) {
    return this.lunch[day] === time
  }
}

export default User
