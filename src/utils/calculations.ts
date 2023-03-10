import { OperationType } from '../app/appSlice'
import { PATH } from '../constants/maxDisplayNumer.enum'

import { decimalAdjust } from './decimalAdjust'

export const calculations = (operation: OperationType, numberOne: string, numberTwo: string) => {
  let result = 0

  if (numberTwo === '0' && operation === '/') {
    return 'Не определено'
  }

  switch (operation) {
    case '/':
      result = +numberOne / +numberTwo
      break
    case 'x':
      result = +numberOne * +numberTwo
      break
    case '-':
      result = +numberOne - +numberTwo
      break
    case '+':
      result = +numberOne + +numberTwo
      break
    default:
      result = 0
  }

  const convertResult = () => {
    const value = parseFloat(result.toPrecision(15)) + ''

    if (value.length > PATH.MAX) {
      const difference = 16 - value.split('.')[0].length

      return decimalAdjust(+value, -difference) + ''
    } else return value
  }

  return convertResult()
}
