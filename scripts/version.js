const fs = require('fs')
const path = require('path')
const beautify = require('js-beautify').js_beautify
const config = require('./package.json')

const writeVersion = () => new Promise((resolve, reject) => {
  const { version } = config
  const numbers = version.split('.')
  numbers[2] = Number(numbers[2]) + 1
  config.version = numbers.join('.')

  fs.writeFile(path.join(__dirname, 'package.json'), beautify(JSON.stringify(config), { indent_size: 2 }), (err) => {
    if (err) {
      reject()
    }
    resolve()
  })
})



const start = async () => {
  await writeVersion()
}

start();
