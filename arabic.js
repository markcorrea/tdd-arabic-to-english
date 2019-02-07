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

function mountDozen(entry) {
  let stringEntry = entry.toString()
  console.log(stringEntry.split(''))
}

mountDozen(21)



module.exports = {
  validatesEntryValue,
  unities,
  tenths,
  dozens
}