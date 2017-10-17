export function timeToReadable(time) {
  const str = (('' + time).length > 3 ? '' : '0') + time
  return str[0] + str[1] + ':' + str[2] + str[3]
}
