const { writeLogData } = require('./logOutput')

/**
 * It logs the data to the console and writes it to a file.
 * @method
 * @param index - The index of the video in the array of videos.
 * @param total - The total number of videos to download
 * @param username - The username of the TikTok user.
 * @param videoID - The ID of the video you want to download.
 * @param tiktokVideoURL - The URL of the TikTok video you want to download.
 * @param downloadURL - The URL of the video you want to download.
 */
function infoConsoleLog(
  index,
  total,
  username,
  videoID,
  tiktokVideoURL,
  downloadURL
) {
  const log = `
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
  -
  +  Video ${index + 1} of ${total}
  -  Username: ${username}
  +  Video ID: ${videoID}
  -  TikTok Video URL: ${tiktokVideoURL}
  +  Download URL: ${downloadURL}
  -
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n`

  console.info(log)
  writeLogData(username, log)
}

module.exports = infoConsoleLog
