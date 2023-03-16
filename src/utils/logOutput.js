const fs = require('fs')
const getDate = require('./getDate')
const ensureDirectoryExistence = require('./checkPathExist')

async function writeLogData(username, log) {
  const date = new Date().toISOString().slice(0, 10)
  const nameFile = `downloads/${username}/${username}_downloadLog-${date}.txt`
  ensureDirectoryExistence(nameFile)
  const content = `
  ||||||||||||||||||||||||||||||||||||||||||
  ${log}
  At: ${getDate()} \n
  |||||||||||||||||||||||||||||||||||||||||
  \n`

  fs.appendFile(nameFile, content, { encoding: 'utf8', flag: 'a' }, (err) => {
    if (err) throw err
  })
  
}

module.exports = { writeLogData }
