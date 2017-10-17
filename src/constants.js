export const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

export const startTime = 800
export const endTime = 2000

export const times = []
let i = startTime
while (i < endTime) {
  times.push(i)
  if (('' + i).substr(-2) === '30') {
    i = (parseInt(i / 100, 10) + 1) * 100
  } else {
    i += 30
  }
}
