import fs from 'fs'

const REMOVE_LINES_WITH = ['report', 'service']
const ORIGIN_FILE_PATH = './src/trigger/test.log'
const DESTINATION_FILE_PATH = './src/files/result.log'

function removeLinesWithWords(originFilePath, words, destinationFilePath) {
  const file = fs.readFileSync(originFilePath, 'utf8')
  const lines = file.split('\n').map(line => line.toLocaleLowerCase())
  const newLines = lines.filter(line => !words.some(word => line.includes(word.toLocaleLowerCase())))
  fs.writeFileSync(destinationFilePath, newLines.join('\n'))
}

removeLinesWithWords(ORIGIN_FILE_PATH, REMOVE_LINES_WITH, DESTINATION_FILE_PATH)