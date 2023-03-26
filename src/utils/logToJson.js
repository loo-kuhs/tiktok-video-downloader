import { appendFile } from 'fs'

import ensureDirectoryExistence from './checkPathExist.js'

async function logToJson(username, log) {
  const date = new Date().toISOString().slice(0, 10)
  const nameFile = `downloads/${username}/${username}_downloadLog-${date}.json`
  const content = JSON.stringify(log, null, 2)

  ensureDirectoryExistence(nameFile)

  appendFile(nameFile, content, { encoding: 'utf8', flag: 'a' }, (err) => {
    if (err) throw err
  })
}

export default logToJson
