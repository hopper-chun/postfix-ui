import { format, parse, isValid, parseISO } from 'date-fns'

const dateFormatStrA = 'yyyyMMddHHmmss'
const dateFormatStrB = 'yyyy-MM-dd HH:mm:ss'

const mapLen = { 14: 19, 12: 16, 10: 13, 8: 10, 6: 7, 4: 4 }

const dateNN = (value, NN) => {
  if (typeof value !== 'string' || !(value instanceof String)) {
    const valueLen = mapLen[NN]
    if (valueLen) {
      try {
        return format(value, dateFormatStrB.substring(0, valueLen))
      } catch (ex) {}
    }
    return value
  }

  const keyLen = NN || value?.length
  const valueLen = mapLen[keyLen]

  if (valueLen) {
    try {
      return format(parse(value, dateFormatStrA.substring(0, keyLen), new Date()), dateFormatStrB.substring(0, valueLen))
    } catch (ex) {}
  }
  return value
}

const date14 = (dateStr) => dateNN(dateStr, 14)
const date12 = (dateStr) => dateNN(dateStr, 12)
const date10 = (dateStr) => dateNN(dateStr, 10)
const date8 = (dateStr) => dateNN(dateStr, 8)
const date6 = (dateStr) => dateNN(dateStr, 6)
const date4 = (dateStr) => dateNN(dateStr, 4)
const date_mdhms = (dateStr) => {
  try {
    // 'MM-dd HH:mm:ss'
    return dateNN(dateStr, 14).substring(5)
  } catch (ex) {
    return dateStr
  }
}

// parseISO: function (value) {
//   if (value) {
//     return parseISO(value)
//   }
//   return value
// },

export { date14, date12, date10, date8, date6, date4, date_mdhms }
