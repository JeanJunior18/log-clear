import fs from 'fs'

const file = fs.readFileSync('./src/trigger/test.log', 'utf8')
const lines = file
  .split('\n')
  .filter(line =>
    !line
      .toLocaleLowerCase()
      .includes('report')
  )

console.log(lines)
fs.writeFileSync(`./src/files/${new Date().toISOString()}.log`, lines.join('\n'))