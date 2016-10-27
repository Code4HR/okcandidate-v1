'use strict'

/*
 * @description
 * A simple utility for converting a list of entries in a plain text file into a
 * JS module containing an array.
 * @usage
 * node listToArray <inputfile> <outputname?>
 */

const fs = require('fs')

const inputPath = process.argv[2]
const outputName = process.argv[3] || 'output.js'

if (inputPath === outputName) {
  console.log('Input path is the same as the output path. Exiting.')
  return
}

fs.readFile(inputPath, {encoding: 'utf8'}, (err, lines) => {
  if (err) throw err
  // Escape singlequotes.
  // Create a string that becomes a JS module.
  const output = "/* eslint-disable */\n\nmodule.exports = " + JSON.stringify(lines.split('\n'), null, 2)
  fs.writeFile(outputName, output, {encoding: 'utf8'}, err => {
    if (err) throw err
    console.log('Module saved to', outputName)
  })
})
