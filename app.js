const SanitizeURL = require('./src/ObtainData')
const shell = require('shelljs')
const { program } = require('commander')

program.arguments(`'<url>'`, 'TikTok video URL')

program.parse()

const url = program.args[0]

const sanitizeURL = new SanitizeURL(url)

const videoID = sanitizeURL.getVideoID()
const username = sanitizeURL.getUsername()
const tiktokVideoURL = sanitizeURL.getTikTokVideoURL()
const downloadURL = sanitizeURL.getDownloadURL()

const infoObject = {
  videoID,
  username,
  tiktokVideoURL,
  downloadURL,
}

console.info(infoObject)

async function downloadVideo() {
  const { code, stderr } = await shell.exec(
    `curl -L ${downloadURL} -o downloads/${username}/${username}-${videoID}.mp4 --progress-bar --create-dirs`
  )

  if (code !== 0) {
    console.error(`Error: ${stderr}`)
  }

  console.info(
    `Downloaded video: ${username}-${videoID}.mp4 in downloads/${username} directory`
  )

  return code
}

downloadVideo()
