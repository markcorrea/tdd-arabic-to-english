const entry = process.argv[2]
const unities = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
const tenths = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
const dozens = ['', '', 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']

function printConsole(message) {
  if (!entry || entry !== 'test') console.log(message)
}

function validatesEntryValue(entryValue) {
  if (entryValue === undefined) {
    printConsole(
      '!!!\nHEY! => Please insert a number after the command. Example: node arabic2english.js 2\n!!!'
    )
    return false
  }

  const numberValue = parseInt(entryValue)

  if (typeof numberValue !== 'number' || Number.isNaN(numberValue)) {
    printConsole(
      '!!!\nHEY! => The given number is not of the type number. Please insert a valid number\n!!!'
    )
    return false
  }
  return numberValue
}

let entryValue = validatesEntryValue(entry)

printConsole(entryValue)

function parseEntry(entry) {
  let splittedString =  entry.toString().split('')
  return splittedString.map(x => parseInt(x))
}

let parsedEntry = parseEntry(entryValue)

function reverseEntry(entry) {
  return entry.reverse()
}

const reversedEntry = reverseEntry(parsedEntry)

function getEnglishDozen(entry) {
  if (entry.length > 1) {
    if (entry[1] === 1) return tenths[entry[0]]
    return dozens[entry[1]] + (unities[entry[0]] !== 'zero' ? '-' + unities[entry[0]] : '')
  }
  return unities[entry[0]]
}

console.log(getEnglishDozen(reversedEntry))




module.exports = {
  validatesEntryValue,
  unities,
  tenths,
  dozens,
  parseEntry,
  reverseEntry,
  getEnglishDozen
}