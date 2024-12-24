import { format, parse, parseISO } from 'date-fns'

const date14 = (value) => {
  if (value) {
    const v =
      typeof value !== 'string' && !(value instanceof String) ? value : value.length === 14 ? parse(value, 'yyyyMMddHHmmss', new Date()) : parseISO(value)

    return format(v, 'yyyy-MM-dd HH:mm:ss')
  }
  return value
}

const date12 = (value) => {
  if (value) {
    const v = typeof value !== 'string' && !(value instanceof String) ? value : value.length === 12 ? parse(value, 'yyyyMMddHHmm', new Date()) : parseISO(value)

    return format(v, 'yyyy-MM-dd HH:mm')
  }
  return value
}

const date8 = (value) => {
  if (value) {
    const v = typeof value !== 'string' && !(value instanceof String) ? value : value.length === 8 ? parse(value, 'yyyyMMdd', new Date()) : parseISO(value)

    return format(v, 'yyyy-MM-dd')
  }
  return value
}

const date6 = (value) => {
  if (value) {
    const v = typeof value !== 'string' && !(value instanceof String) ? value : value.length === 6 ? parse(value, 'yyyyMM', new Date()) : parseISO(value)

    return format(v, 'yyyy-MM')
  }
  return value
}

const date4 = (value) => {
  if (value) {
    const v = typeof value !== 'string' && !(value instanceof String) ? value : value.length === 4 ? parse(value, 'yyyy', new Date()) : parseISO(value)

    return format(v, 'MM-dd')
  }
  return value
}

const date_mdhms = (value) => {
  if (value) {
    const v = typeof value !== 'string' && !(value instanceof String) ? value : value.length === 10 ? parse(value, 'MMddHHmmss', new Date()) : parseISO(value)

    return format(v, 'MM-dd HH:mm:ss')
  }
  return value
}

// parseISO: function (value) {
//   if (value) {
//     return parseISO(value)
//   }
//   return value
// },

export { date14, date12, date8, date6, date4, date_mdhms }
