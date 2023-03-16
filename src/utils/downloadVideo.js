import pkg from 'shelljs'
const { exec } = pkg
import writeLogData from './logOutput.js'
import infoConsoleLog from './infoConsoleLog.js'

/**
 * Downloads a TikTok video.
 * @method
 * @param {object} {
 *   username,
 *   videoID,
 *   tikTokVideoURL,
 *   downloadURL,
 * }
 * @return {number} code - The return value is a number.
 */
async function downloadVideo(
  { username, videoID, tikTokVideoURL, downloadURL },
  index = 0,
  total = 1
) {
  infoConsoleLog(index, total, username, videoID, tikTokVideoURL, downloadURL)

  const { code, stderr } = await exec(
    `curl -L ${downloadURL} -o downloads/${username}/${username}-${videoID}.mp4 --progress-bar --create-dirs`
  )

  if (code !== 0) {
    console.error(`Error: ${stderr}`)
    writeLogData(`Error: ${stderr}`)
  }

  console.info(
    `\nVideo downloaded: ${username}-${videoID}.mp4 in downloads/${username} directory`
  )

  return code
}

export default downloadVideo
