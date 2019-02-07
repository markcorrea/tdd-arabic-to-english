var {
  validatesEntryValue,
  unities,
  tenths,
  dozens,
  parseEntry
} = require('./arabic')

function checkArrayOfStrings(array) {
  return !array.some(item => typeof(item) !== 'string')
}

describe('Validates the input given number', () => {
  test('Sould return an item given on the command line.', () => {
    expect(validatesEntryValue(2)).toBe(2)
  })

  test('Should return false if the number was not given', () => {
    expect(validatesEntryValue()).toBe(false)
  })

  test('Should return an advice if the given number is not the format Number', () => {
    expect(validatesEntryValue('s')).toBe(false)
  })
})

describe('Validates the number declaration arrays', () => {
  test('Returns true if unities array only contains strings', () => {
    expect(checkArrayOfStrings(unities)).toBe(true)
  })

  test('Returns true if tenths array only contains strings', () => {
    expect(checkArrayOfStrings(tenths)).toBe(true)
  })

  test('Returns true if dozens array only contains strings', () => {
    expect(checkArrayOfStrings(dozens)).toBe(true)
  })
})

describe('Prepares the entry value before mounting english numerals.', () => {
  test('Should return the entered numeral as an array of strings for each letter', () => {
    expect(parseEntry(12345)).toEqual([1, 2, 3, 4, 5])
  })
})