// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/round

export const decimalAdjust = (value: any, exp?: number) => {
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math.round(value)
  }
  value = +value
  exp = +exp
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN
  }
  value = value.toString().split('e')
  value = Math.round(+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)))
  value = value.toString().split('e')

  return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp))
}
