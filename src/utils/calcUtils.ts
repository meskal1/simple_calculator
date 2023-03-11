export const convertValue = (
  currentValue: string,
  typedValue: string,
  calcNumbersArray: string[]
) => {
  const ifValuesAreSame = calcNumbersArray[0] === calcNumbersArray[2] ? '.' : ''
  const convertedValue =
    typedValue === ',' && currentValue.indexOf('.') !== -1
      ? ifValuesAreSame
      : typedValue.replace(',', '.')

  return convertedValue
}

export const replaceZero = (currentValue: string, typedValue: string) => {
  return currentValue === '0' && typedValue !== '.' ? '' : currentValue
}

export const emptyAfterDot = (currentValue: string) => {
  return currentValue.at(-1) === '.' ? currentValue.slice(0, -1) : currentValue
}
