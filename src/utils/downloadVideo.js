const shell = require('shelljs')
const { writeLogData } = require('./logOutput')

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
  const log = `
      Video ${index + 1} of ${total}
      Username: ${username}
      Video ID: ${videoID}
      TikTok Video URL: ${tikTokVideoURL}
      Download URL: ${downloadURL}\n`

  console.info(log)
  writeLogData(username, log)

  const { code, stderr } = await shell.exec(
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

module.exports = downloadVideo
