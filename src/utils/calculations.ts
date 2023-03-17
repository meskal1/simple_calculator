import { OperationType } from '../app/appSlice'
import { DISPLAY } from '../constants/maxDisplayNumer.enum'

import { emptyAfterDot } from './calcUtils'
import { decimalAdjust } from './decimalAdjust'

export const calculations = (calcNumbers: string[]) => {
  const numberOne = Number(emptyAfterDot(calcNumbers[0]))
  const numberTwo = Number(emptyAfterDot(calcNumbers[2]))
  const operation = calcNumbers[1] as OperationType
  let result = 0

  if (numberTwo === 0 && operation === '/') {
    return 'Не определено'
  }

  switch (operation) {
    case '/':
      result = numberOne / numberTwo
      break
    case 'x':
      result = numberOne * numberTwo
      break
    case '-':
      result = numberOne - numberTwo
      break
    case '+':
      result = numberOne + numberTwo
      break
    default:
      result = 0
  }

  const roundResult = () => {
    const stringResult = result.toString()
    const roundedResult = parseFloat(result.toPrecision(DISPLAY.MAX - 2)).toString()
    const eNotationResult = result.toExponential()

    if (stringResult.length > DISPLAY.MAX && !stringResult.includes('.')) {
      if (eNotationResult.length > DISPLAY.MAX) {
        const secondPartOfResult = eNotationResult.split('.')[1] || stringResult
        const withENotation = secondPartOfResult.split('e')[1] || eNotationResult.split('e')[1]
        const roundNumber =
          DISPLAY.MAX - withENotation.length - eNotationResult.split('.')[0].length - 2

        return result.toExponential(roundNumber)
      }

      return eNotationResult
    }

    if (stringResult.includes('e')) {
      const secondPartOfResult = stringResult.split('.')[1] || stringResult
      const withENotation = secondPartOfResult.split('e')[1]
      const roundNumber = DISPLAY.MAX - 3 - withENotation.length

      return result.toExponential(roundNumber)
    }

    if (roundedResult.length > DISPLAY.MAX) {
      const difference = DISPLAY.MAX - 1 - roundedResult.split('.')[0].length

      return decimalAdjust(Number(roundedResult), -difference).toString()
    }

    return roundedResult
  }

  return roundResult()
}
// 277777777.75 / 6
// 0.7-0.4
//0.89874236036201 - 77777 = -77776.10125763963
//88888833333222222 - 88888833333222222
