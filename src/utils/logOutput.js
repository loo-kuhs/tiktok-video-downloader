import { appendFile } from 'fs'

import ensureDirectoryExistence from './checkPathExist.js'
import getDate from './getDate.js'

/**
 * It takes a username and a log message as parameters, creates a file name based on the username and
 * the current date, creates a directory if it doesn't exist, and then appends the log message to the
 * file.
 * @method
 * @param {string} username - the username of the user
 * @param {string} log - the log message
 */
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

  appendFile(nameFile, content, { encoding: 'utf8', flag: 'a' }, (err) => {
    if (err) throw err
  })
}

export default writeLogData
