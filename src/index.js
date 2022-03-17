import fs from 'fs'

const REMOVE_LINES_WITH = ['report', 'service']
const ORIGIN_DIR = './src/trigger'
const DESTINATION_DIR = './src/files'

function getLogFiles() {
  const files = fs.readdirSync('./src/trigger')
  return files.filter(file => file.includes('.log'))
}

function removeLinesWithWords(originFilePath, words, destinationFilePath) {
  const file = fs.readFileSync(originFilePath, 'utf8')
  const lines = file.split('\n').map(line => line.toLocaleLowerCase())
  const newLines = lines.filter(line => !words.some(word => line.includes(word.toLocaleLowerCase())))
  fs.writeFileSync(destinationFilePath, newLines.join('\n'))
}

function removeLinesOfFiles(files) {
  files.forEach(file => {
    const originFilePath = `${ORIGIN_DIR}/${file}`
    const destinationFilePath = `${DESTINATION_DIR}/${file}`
    removeLinesWithWords(originFilePath, REMOVE_LINES_WITH, destinationFilePath)
  })
}


function watchNewFiles() {
  fs.watch(ORIGIN_DIR, (eventType, filename) => {
    console.log(eventType, filename)
    if (filename) {
      const originFilePath = `${ORIGIN_DIR}/${filename}`
      const destinationFilePath = `${DESTINATION_DIR}/${filename}`
      removeLinesWithWords(originFilePath, REMOVE_LINES_WITH, destinationFilePath)
    }
  })
}

function runApp() {
  const files = getLogFiles()
  removeLinesOfFiles(files)
  watchNewFiles()
}

runApp()