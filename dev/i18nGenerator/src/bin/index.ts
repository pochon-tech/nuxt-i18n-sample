import * as fs from 'fs'
import createCsvParser from 'csv-parse'
import csvStringify from 'csv-stringify'
import createStreamTransformer from 'stream-transform'
import iconv from 'iconv-lite'
import program from 'commander'

program
  .version('0.0.1', '-v, --version')

program.command('from-csv')
  .description('Generate i18n-messages from CSV file')
  .option("-f, --filename <input-file>", "Input CSV file name")
  .option("-o, --output <output-file>", "Output JS file name")
  .action((_cmd, options) => {
    const inputFile = options.filename
    const outputFile = options.output
    
    let headers = null
    const result = {}
    fs.createReadStream(inputFile)
      .pipe(iconv.decodeStream('SJIS'))
      .pipe(iconv.encodeStream('UTF-8'))
      .pipe(createCsvParser())
      .pipe(createStreamTransformer((record)=>{
        if (!headers) {
          headers = record
          for (const langCode of record.slice(1)) {
            result[langCode] = {}
          }
        } else {
          for (const i in record.slice(1).keys()) {
            const langCode = headers[i]
            result[langCode][record[0]] = record[i]
          }
        }
      }))
    fs.writeFileSync(outputFile, "module.exports = "+JSON.stringify(result)+"\n")    
  })

program.command('vue-i18n-to-csv')
  .description('Generate i18n-messages CSV template')
  .option("-c, --config <config-file>", "Config JSON file name")
  .option("-o, --output <output-file>", "Output CSV file name")
  .action((_cmd, options) => {
    const configFile = options.config
    const outputFile = options.output
    const data = []
    csvStringify(data, (error, output)=>{
      fs.writeFileSync(outputFile, iconv.encode(output, 'shift_jis'))
    })
  })
program.parse(process.argv)

