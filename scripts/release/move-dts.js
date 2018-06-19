const fs = require('fs')

// step.1: copy

const originDts = './lib/index.d.ts'
const destination = './index.d.ts'

fs.copyFileSync(originDts, destination)

// step.2: correct path

let file = fs.readFileSync(destination, 'utf-8')
file = file.replace(/\.\//g, './lib/')
fs.writeFileSync(destination, file)