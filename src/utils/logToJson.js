import { readFileSync, writeFileSync } from 'fs'

import checkAndCreateDir from './checkAndCreateDir.js'

// TODO: Update this function and merge it
async function logToJson(username, logObject) {
  const date = new Date().toISOString().slice(0, 10)
  const logFileName = `downloads/${username}/${username}_downloadLog-${date}.json`
  const jsonData = JSON.stringify(logObject, null, 2)

  checkAndCreateDir(logFileName)

  try {
    let existingData = []

    try {
      const existingDataBuffer = readFileSync(logFileName)
      existingData = JSON.parse(existingDataBuffer.entries().toString())
    } catch (error) {
      console.log(error)
    }

    existingData.push(logObject)

    writeFileSync(
      logFileName,
      jsonData,
      { encoding: 'utf8', flag: 'a' },
      (err) => {
        if (err) throw err
      }
    )
  } catch (error) {
    console.log(error)
  }
}

let test3 = [
  {
    index: 1,
    total: 1,
    username: 'tiktok',
    videoID: '6920000000000000000',
    tikTokVideoURL: 'https://www.tiktok.com/@tiktok/video/6920000000000000000',
    downloadUrl: 'https://',
  },
  {
    index: 2,
    total: 1,
    username: 'tiktok',
    videoID: '6920000000000000000',
    tikTokVideoURL: 'https://www.tiktok.com/@tiktok/video/6920000000000000000',
    downloadUrl: 'https://',
  },
]


export default logToJson
