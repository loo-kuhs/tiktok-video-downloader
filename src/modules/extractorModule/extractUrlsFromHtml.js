/**
 * It takes a string of HTML and returns an array of all the URLs found in the HTML.
 * @method
 * @param {string} html - The HTML string to extract URLs from.
 * @returns {string[]} - An array of URLs.
 */
function extractUrlsFromHtml(html) {
  const urlRegex = /href="([^"]*)"/g
  const urls = []
  let match

  while ((match = urlRegex.exec(html)) !== null) {
    urls.push(match[1])
  }

  return urls
}

export default extractUrlsFromHtml
