export const convertValue = (
  currentValue: string,
  typedValue: string,
  calcNumbersArray: string[]
) => {
  const value = typedValue.replace(',', '.')
  const arrayLength = calcNumbersArray.length
  const isIncludeComma = value === '.' && currentValue.includes('.')

  if (arrayLength === 1 && isIncludeComma) return ''

  if (arrayLength === 3 && isIncludeComma && calcNumbersArray[0] !== calcNumbersArray[2]) return ''

  if (arrayLength === 4 && currentValue === '0' && typedValue === '0') return ''

  return value
}

export const replaceZero = (currentValue: string, convertedValue: string) => {
  return currentValue === '0' && convertedValue !== '.' ? '' : currentValue
}

export const addZero1 = (currentValue: string, convertedValue: string) => {
  return convertedValue === '.' && currentValue !== '0' ? '0.' : convertedValue
}

export const emptyAfterDot = (currentValue: string) => {
  return currentValue?.at(-1) === '.' ? currentValue.slice(0, -1) : currentValue
}
