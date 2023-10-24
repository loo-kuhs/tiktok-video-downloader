import { readFileSync, writeFileSync } from 'fs'
import extractUrlsFromHtml from './extractUrlsFromHtml.js'

/**
 * It reads a text file, extracts all URLs from it, removes duplicates, and saves the unique URLs to a
 * new text file
 * @param {string} username - The username of the account you want to download.
 * @param {string} txtFile - The path to the text file containing the HTML to extract URLs from.
 * @returns a Promise.
 */
async function saveUniqueUrlsToFile(username, txtFile) {
  let html = readFileSync(txtFile, 'utf8')
  let urls = extractUrlsFromHtml(html)
  let uniqueUrls = [...new Set(urls)]
  let uniqueUrlsString = uniqueUrls.join('\n')
  const nameFile = `downloads/${username}-urls.txt`

  if (uniqueUrls.length === 0) {
    console.info(`\n
      No URLs found in ${txtFile}.
      ${nameFile} was not created.
    `)
    return
  }

  writeFileSync(nameFile, uniqueUrlsString, { encoding: 'utf8', flag: 'w' })

  console.info(`\n
    ${uniqueUrls.length} URLs extracted from ${txtFile}.
    Saved to ${nameFile}.
  `)
}

export default saveUniqueUrlsToFile
