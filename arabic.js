/**
 * Constants to be used as pattern by the code.
 * As they will be iterated considering the index of the context,
 * some of the first items were given white spaces.
 */
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
const decimalUnities = ['', 'thousand', 'million', 'billion']

/**
 * It was detected that the Console was being printed during the tests.
 * printConsole function checks if the command is being called by Jest, using the
 * argument 'test' and only prints the messages when not testing.
 *
 * @param {String} message
 */
const printConsole = message => {
  if (!entry || entry !== 'test') console.log(message)
}

/**
 * Validates the value typed by the user. If this value does not follow the patterns
 * defined below, the system returns a message according.
 *
 * @param {String} entryValue The value entered by the user, in a string format.
 *
 * @returns {Number} The previous string entered, converted in Number format.
 */
const validatesEntryValue = entryValue => {
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

/**
 * Gets the entered value (supposing it has been already validated) as an integer
 * and splits it, creating an array. While that, the characters are converted to Numbers.
 *
 * @param {Number} entry
 *
 * @returns {[Number]} An array of numbers.
 */
const parseEntry = entry => {
  const splittedString = entry.toString().split('')
  return splittedString.map(x => parseInt(x))
}

/**
 * Receives an array of numbers an reverses it.
 *
 * @param {[Number]} entry An array of numbers.
 *
 * @returns {[Number]} The same array of numbers, reversed.
 */
const reverseEntry = entry => {
  return entry.reverse()
}

/**
 * Receives as parameter an array of numbers, (previously reversed) and separates
 * it on groups of 3, which will be used next to build the hundreds.
 *
 * @param {[Number]} entry An array of numbers.
 *
 * @returns {[[Number]]} An array containing groups(arrays) of numbers.
 */
const separateDecimalUnity = entry => {
  const decimalQuantity = Math.ceil(entry.length / 3)
  const separated = []
  for (let i = 0; i < decimalQuantity; i++) {
    separated[i] = entry.slice(0, 3)
    entry.splice(0, 3)
  }
  return separated
}

/**
 * Receives the entered numbers and formats the names for the two first characters
 * (the dozen). Example: 45 should return 'forty-five'.
 *
 * @param {[Number]} entry An array of numbers.
 *
 * @returns {String} The string format of the entered numbers.
 */
const getEnglishDozen = entry => {
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

/**
 * Receives the entered numbers, gets the dozen for these numbers and defines
 * the hundred name, returning the complete hundred name.
 * Example: 134 should return 'one hundred and thirty-four'.
 *
 * @param {[Number]} entry An array of numbers.
 *
 * @returns {String} The string format of the entered numbers.
 */
const getEnglishHundred = entry => {
  const dozen = getEnglishDozen(entry)
  if (entry.length > 2) {
    return (
      unities[entry[2]] + ' hundred' + (dozen !== '' ? ' and ' + dozen : '')
    )
  }
  return dozen
}

/**
 * This is the main function, which uses all the previous ones declared.
 * It receives the entered value by the user, validates it, then parses it,
 * reverses it and separates in decimal unity groups. After that it iterates
 * on each item of the groups, returning its hundred values as strings.
 * With these values, we are able to define the thousands and the millions,
 * and it is what is returned.
 *
 * Example: 123456789 should return:
 * 'one hundred and twenty-three million four hundred and fifty-six thousand seven hundred and eighty-nine'.
 *
 * @param {String} entry The value entered by the user, as a string format.
 *
 * @returns {String} The name of the complete entered number, in its string format.
 */
const returnEnglishNumeral = entry => {
  const entryValue = validatesEntryValue(entry)
  if (entryValue) {
    const parsedEntry = parseEntry(entryValue)
    const reversedEntry = reverseEntry(parsedEntry)
    const separatedDecimalUnity = separateDecimalUnity(reversedEntry)

    let sentence = ''
    separatedDecimalUnity.map((unity, index) => {
      sentence =
        getEnglishHundred(unity) + ' ' + decimalUnities[index] + ' ' + sentence
    })
    return sentence.trim()
  }
}

const entry = process.argv[2]
printConsole(returnEnglishNumeral(entry))

/**
 * Exports files.
 */
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
  returnEnglishNumeral,
}
