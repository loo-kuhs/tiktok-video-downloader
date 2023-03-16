import { readFileSync, writeFileSync } from 'fs'

/**
 * It reads a file containing HTML, extracts the URLs, removes duplicates, and saves the unique URLs to a text
 * file
 * @method
 * @param username - The username of the account you want to download from.
 * @param htmlFile - The HTML file that contains the URLs you want to extract.
 */
async function urlsToTxtFile(username, htmlFile) {
  let html = readFileSync(htmlFile, 'utf8')

  const regex = /<a href="(.+?)"/g
  let m
  let urls = []
  while ((m = regex.exec(html)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      if (groupIndex === 1) {
        urls.push(match)
      }
    })
  }

  let uniqueUrls = [...new Set(urls)]
  let uniqueUrlsString = uniqueUrls.join('\n')
  const nameFile = `downloads/${username}-urls.txt`

  writeFileSync(nameFile, uniqueUrlsString, { encoding: 'utf8', flag: 'w' })

  console.info(`\n
    ${uniqueUrls.length} URLs extracted from ${htmlFile}
    Saved to ${nameFile}
  \n`)
}

export default urlsToTxtFile
