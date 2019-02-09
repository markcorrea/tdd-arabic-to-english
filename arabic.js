const entry = process.argv[2]
const unities = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
]
const tenths = [
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
]
const dozens = [
  '',
  '',
  'twenty',
  'thirty',
  'fourty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety',
]

const decimalUnities = [
  '',
  'thousand',
  'million'
]

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

function parseEntry(entry) {
  let splittedString = entry.toString().split('')
  return splittedString.map(x => parseInt(x))
}

function reverseEntry(entry) {
  return entry.reverse()
}

function separateDecimalUnity(entry) {
  let decimalQuantity = Math.ceil(entry.length/3)
  let separated = []
  for(let i = 0; i < decimalQuantity; i++) {
    separated[i] = entry.slice(0, 3)
    entry.splice(0, 3)
  }
  return separated
}

function getEnglishDozen(entry) {
  if (entry.length > 1) {
    if (entry[1] === 1) return tenths[entry[0]]
    if (entry[1] === 0) return entry[0] !== 0 ? unities[entry[0]] : ''
    return (
      dozens[entry[1]] +
      (unities[entry[0]] !== 'zero' ? '-' + unities[entry[0]] : '')
    )
  }
  return unities[entry[0]]
}

function getEnglishHundred(entry) {
  let dozen = getEnglishDozen(entry)
  if (entry.length > 2) {
    return (
      unities[entry[2]] + ' hundred' + (dozen !== '' ? ' and ' + dozen : '')
    )
  }
  return dozen
}

function returnEnglishNumeral(entry) {
  const entryValue = validatesEntryValue(entry)
  const parsedEntry = parseEntry(entryValue)
  const reversedEntry = reverseEntry(parsedEntry)
  const separatedDecimalUnity = separateDecimalUnity(reversedEntry)

  let sentence = ''
  
  separatedDecimalUnity.map((unity, index) => {
    sentence = getEnglishHundred(unity) + ' ' + decimalUnities[index] + ' ' + sentence
  })

  return sentence.trim()
}

printConsole(returnEnglishNumeral(entry))




module.exports = {
  validatesEntryValue,
  unities,
  tenths,
  dozens,
  parseEntry,
  reverseEntry,
  getEnglishDozen,
  getEnglishHundred,
  separateDecimalUnity,
  returnEnglishNumeral
}
