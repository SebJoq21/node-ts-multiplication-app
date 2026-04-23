import fs from 'fs'
import { yarg } from './config/plugins/args.plugin'

console.log( yarg )

let outputMessage = ''
const headerMessage = `
--------------------------------
        TABLA DE ${ yarg.b }
--------------------------------\n
`

for (let i = 1; i <= yarg.l; i++){
    outputMessage += `${ yarg.b } x ${ i } = ${ yarg.b * i }\n`
}

outputMessage = headerMessage + outputMessage

if ( yarg.s ){
    console.log(outputMessage)
}

const outputPath = `outputs`

fs.mkdirSync(outputPath, { recursive: true})
fs.writeFileSync(`outputs/tabla-${ yarg.b }.txt`, outputMessage)
console.log('file created!') 