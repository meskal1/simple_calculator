import { OperationType } from '../app/appSlice'
import { DISPLAY } from '../constants/maxDisplayNumer.enum'

import { emptyAfterDot } from './calcUtils'
import { decimalAdjust } from './decimalAdjust'

export const calculations = (calcNumbers: string[]) => {
  const numberOne = +emptyAfterDot(calcNumbers[0])
  const numberTwo = +emptyAfterDot(calcNumbers[2])
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
    const stringResult = result + ''
    const roundedResult = parseFloat(result.toPrecision(DISPLAY.MAX - 2)) + ''

    if (stringResult.length > DISPLAY.MAX && !stringResult.includes('.')) {
      if (+result.toExponential() > DISPLAY.MAX) {
        const secondPartOfResult = result.toExponential().split('.')[1] || stringResult
        const withENotation =
          secondPartOfResult.split('e')[1] || result.toExponential().split('e')[1]
        const roundNumber = DISPLAY.MAX - 3 - withENotation.length

        return result.toExponential(roundNumber)
      }

      return result.toExponential()
    }

    if (stringResult.includes('e')) {
      const secondPartOfResult = stringResult.split('.')[1] || stringResult
      const withENotation = secondPartOfResult.split('e')[1]
      const roundNumber = DISPLAY.MAX - 3 - withENotation.length

      return result.toExponential(roundNumber)
    }

    if (roundedResult.length > DISPLAY.MAX) {
      const difference = DISPLAY.MAX - 1 - roundedResult.split('.')[0].length

      return decimalAdjust(+roundedResult, -difference) + ''
    }

    return roundedResult
  }

  return roundResult()
}
// 277777777.75 / 6
// 0.7-0.4
//0.89874236036201 - 77777 = -77776.10125763963
