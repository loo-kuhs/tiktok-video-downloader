function getDate() {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  return `@--[ ${hours}:${minutes}:${seconds} - ${day}/${month}/${year} ]--@`
}

module.exports = getDate
