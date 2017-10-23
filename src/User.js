class User {
  constructor(
    id,
    name,
    available = [[], [], [], [], [], [], []],
    work = [[], [], [], [], [], [], []],
    lunch = {},
    langs = {fr: false, en: false}
  ) {
    this.id = id
    this.name = name
    this.available = available
    this.work = work
    this.lunch = lunch
    this.langs = langs
  }

  static initFromObject(obj) {
    const {id, name, available, work, lunch, langs} = obj
    return new User(id, name, available, work, lunch, langs)
  }

  isAvailableAt(day, time) {
    return this.available[day] && this.available[day].indexOf(time) > -1
  }
  toggleAvailableAt(day, time, force = null) {
    if (!this.available[day]) {
      this.available[day] = []
    }
    if (this.isAvailableAt(day, time) || force === false) {
      const pos = this.available[day].indexOf(time)
      this.available[day].splice(pos, 1)
    } else {
      this.available[day].push(time)
    }
  }
  hasAvailabilityOnDay(day) {
    return this.available[day] && this.available[day].length > 0
  }
  worksAt(day, time) {
    return this.work[day].indexOf(time) > -1
  }
  toggleWorksAt(day, time, force = null) {
    if (this.worksAt(day, time) || force === false) {
      const pos = this.work[day].indexOf(time)
      this.work[day].splice(pos, 1)
    } else {
      this.work[day].push(time)
    }
  }
  workTime(day) {
    const nb_half_hour = this.work[day].length
    let time = parseInt(nb_half_hour / 2) * 100
    if (nb_half_hour % 2 != 0) {
      time += 30
    }
    return time
  }
  isWorkingMoreThan(nb_half_hours, day) {
    return this.work[day].length > nb_half_hours
  }
  resetWork() {
    this.work = [[], [], [], [], [], [], []]
  }
  getlunchTime(day) {
    return this.lunch[day] || 0
  }
  hasLunchAt(day, time) {
    return this.lunch[day] == time
  }
  setLunchTime(day, time) {
    this.lunch[day] = time
  }
  canSpeak(lang) {
    return this.langs[lang] || false
  }
}

export default User
