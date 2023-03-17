// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/round

export const decimalAdjust = (value: any, exp?: number) => {
  if (typeof exp === 'undefined' || Number(exp) === 0) {
    return Math.round(value)
  }
  value = Number(value)
  exp = Number(exp)
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN
  }
  value = value.toString().split('e')
  value = Math.round(Number(value[0] + 'e' + (value[1] ? Number(value[1]) - exp : -exp)))
  value = value.toString().split('e')

  return Number(value[0] + 'e' + (value[1] ? Number(value[1]) + exp : exp))
}
