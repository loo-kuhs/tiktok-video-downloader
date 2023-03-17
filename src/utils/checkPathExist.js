import { existsSync, mkdirSync } from 'fs'
import path from 'path'

/**
 * If the directory doesn't exist, create it.
 * @method
 * @param {string} filePath - The path to the file you want to create.
 * @returns {boolean} - true if the directory exists, and if it doesn't exist, it will create the directory.
 */
function ensureDirectoryExistence(filePath) {
  let dirname = path.dirname(filePath)
  if (existsSync(dirname)) {
    return true
  }

  ensureDirectoryExistence(dirname)
  mkdirSync(dirname)
}

export default ensureDirectoryExistence
