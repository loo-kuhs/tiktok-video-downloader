import { appendFile } from 'fs'
import getDate from './getDate.js'
import ensureDirectoryExistence from './checkPathExist.js'

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
