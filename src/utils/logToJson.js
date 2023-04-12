import { appendFile, promises } from 'fs'

import ensureDirectoryExistence from './checkPathExist.js'

// TODO: Repair this function
async function logToJson(username, logObject) {
  const date = new Date().toISOString().slice(0, 10)
  const nameFile = `downloads/${username}/${username}_downloadLog-${date}.json`
  let logs = []

  try {
    const fileContents = await promises.readFile(nameFile, 'utf8')
    logs = JSON.parse(fileContents)
  } catch (error) {
    console.error(error)
  }

  logs.push(logObject)

  const content = JSON.stringify(logs, null, 2)

  try {
    ensureDirectoryExistence(nameFile)
    await promises.appendFile(nameFile, content, { encoding: 'utf8', flag: 'a' })
  } catch (error) {
    console.error(error)
  }
}

let test = {
  index: 0,
  total: 1,
  username: 'tiktok',
  videoID: '6920000000000000000',
  tikTokVideoURL: 'https://www.tiktok.com/@tiktok/video/6920000000000000000',
  downloadURL: 'https://v16-web.tiktok.com/video/tos/alisg/tos-alisg-pve-0037c001/8b5b8b1b5b5b4b4b8b5b5b5b5b5b5b5b/?a=1988&br=0&bt=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&l=202109010000000101890721000E0B0B0E&lr=tiktok_m&mime_type=video_mp4&qs=0&rc=M3Z0Z3Z0Z2Z0NjMzNzczM0ApZjQ8Zjw4Z2Q0N2Q4N2Q8Z2dgc2JfY2JfY2JfLS0xMTZzc2IzYjIzYjIzYjIzYjI0YjM6Yw%3D%3D&vl=&vr=',
}

let test2 = {
  index: 1,
  total: 1,
  username: 'tiktok',
  videoID: '6920000000000000000',
  tikTokVideoURL: 'https://www.tiktok.com/@tiktok/video/6920000000000000000',
  downloadUrl: 'https://',
}

logToJson('tiktok', test)
logToJson('tiktok', test2)

export default logToJson
