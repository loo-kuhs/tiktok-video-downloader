const SanitizeURL = require('./helpers/SanitizeUrl')
const downloadVideo = require('./utils/downloadVideo')
const { program } = require('commander')

program.arguments(`'<url>'`, 'TikTok video URL')

program.parse()

const url = program.args[0]

const sanitizeURL = new SanitizeURL(url)

const { videoID, username, tikTokVideoURL, downloadURL } =
  sanitizeURL.createVideoObject()

downloadVideo({ username, videoID, tikTokVideoURL, downloadURL })
