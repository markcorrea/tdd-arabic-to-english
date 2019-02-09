var {
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
} = require('./arabic')

describe.only('Validates the input given number', () => {
  test('Sould return an item given on the command line.', () => {
    expect(validatesEntryValue(2)).toBe(2)
  })

  test('Should return false if the number was not given', () => {
    expect(validatesEntryValue()).toBe(false)
  })

  test('Should return an advice if the given number is not the format Number', () => {
    expect(validatesEntryValue('s')).toBe(false)
  })

  test('If the number starts with zeros, they should be removed', () => {
    expect(validatesEntryValue('000001')).toEqual(1)
  })

  test('Should return an advice that the maximum allowed number of characters is twelve', () => {
    expect(validatesEntryValue('1234567891234')).toBe(false)
  })

  test('Should return an advice if the given number contains any strings.', () => {
    expect(validatesEntryValue('123456fdw')).toBe(false)
  })
})

const checkArrayOfStrings = (array) => {
  return !array.some(item => typeof item !== 'string')
}

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
  test('Should return the entered numeral as an array of integers', () => {
    expect(parseEntry(12345)).toEqual([1, 2, 3, 4, 5])
  })

  test('Should reverse the given array', () => {
    expect(reverseEntry([1, 2, 3, 4, 5])).toEqual([5, 4, 3, 2, 1])
  })
})

describe('Should separate the entry in groups of three', () => {
  test('Should return an array with two arrays of entry inside', () => {
    let reversedEntry = reverseEntry([1, 2, 3, 4, 5])
    expect(separateDecimalUnity(reversedEntry)).toEqual([[5, 4, 3], [2, 1]])
  })
})

describe('Builds the english dozens numeral structure', () => {
  test('Should build the dozen from the last two numbers of the array', () => {
    let reversedEntry = reverseEntry([1, 2, 3])
    expect(getEnglishDozen(reversedEntry)).toEqual('twenty-three')
  })

  test('Should return only one numeral when second digit is zero', () => {
    let reversedEntry = reverseEntry([1, 0, 2])
    expect(getEnglishDozen(reversedEntry)).toEqual('two')
  })

  test('Should return nothing, once the length is bigger than 3 and the last two digits are zero', () => {
    let reversedEntry = reverseEntry([1, 0, 0])
    expect(getEnglishDozen(reversedEntry)).toEqual('')
  })
})

describe('Builds the english Hundreds numeral structure', () => {
  test('Should build the hundreds from the last three numbers of the array', () => {
    let reversedEntry = reverseEntry([1, 2, 3])
    expect(getEnglishHundred(reversedEntry)).toEqual(
      'one hundred and twenty-three'
    )
  })

  test('Should return only the hundred name, without any dozen name', () => {
    let reversedEntry = reverseEntry([5, 0, 0])
    expect(getEnglishHundred(reversedEntry)).toEqual('five hundred')
  })

  test('Should return only the dozen name, even though is a hundred function', () => {
    let reversedEntry = reverseEntry([5, 6])
    expect(getEnglishHundred(reversedEntry)).toEqual('fifty-six')
  })
})

describe('Builds the final sentence', () => {
  test('Should return a thousand number', () => {
    expect(returnEnglishNumeral(1234)).toEqual(
      'one thousand two hundred and thirty-four'
    )
  })

  test('Should return a million number', () => {
    expect(returnEnglishNumeral(1234567)).toEqual(
      'one million two hundred and thirty-four thousand five hundred and sixty-seven'
    )
  })
})
