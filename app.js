const { program } = require('commander')
const shell = require('shelljs')

const SanitizeURL = require('./src/ObtainData')

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

console.log(infoObject)

async function downloadVideo() {
  const { code, stderr } = await shell.exec(
    `curl -L ${downloadURL} -o ${username}-${videoID}.mp4 --progress-bar`
  )

  if (code !== 0) {
    console.log(`Error: ${stderr}`)
  }

  console.log(`Downloaded video: ${username}-${videoID}.mp4`)

  return code
}

downloadVideo()
