import { format, parse, parseISO } from 'date-fns'

const date14 = (value) => {
  try {
    if (value) {
      const v =
        typeof value !== 'string' && !(value instanceof String) ? value : value.length === 14 ? parse(value, 'yyyyMMddHHmmss', new Date()) : parseISO(value)

      return format(v, 'yyyy-MM-dd HH:mm:ss')
    }
  } catch (ex) {}
  return value
}

const date12 = (value) => {
  try {
    if (value) {
      const v =
        typeof value !== 'string' && !(value instanceof String) ? value : value.length === 12 ? parse(value, 'yyyyMMddHHmm', new Date()) : parseISO(value)

      return format(v, 'yyyy-MM-dd HH:mm')
    }
  } catch (ex) {}
  return value
}

const date8 = (value) => {
  try {
    if (value) {
      const v = typeof value !== 'string' && !(value instanceof String) ? value : value.length === 8 ? parse(value, 'yyyyMMdd', new Date()) : parseISO(value)

      return format(v, 'yyyy-MM-dd')
    }
  } catch (ex) {}
  return value
}

const date6 = (value) => {
  try {
    if (value) {
      const v = typeof value !== 'string' && !(value instanceof String) ? value : value.length === 6 ? parse(value, 'yyyyMM', new Date()) : parseISO(value)

      return format(v, 'yyyy-MM')
    }
  } catch (ex) {}
  return value
}

const date4 = (value) => {
  try {
    if (value) {
      const v = typeof value !== 'string' && !(value instanceof String) ? value : value.length === 4 ? parse(value, 'yyyy', new Date()) : parseISO(value)

      return format(v, 'MM-dd')
    }
  } catch (ex) {}
  return value
}

const date_mdhms = (value) => {
  try {
    if (value) {
      const v = typeof value !== 'string' && !(value instanceof String) ? value : value.length === 10 ? parse(value, 'MMddHHmmss', new Date()) : parseISO(value)

      return format(v, 'MM-dd HH:mm:ss')
    }
  } catch (ex) {}
  return value
}

// parseISO: function (value) {
//   if (value) {
//     return parseISO(value)
//   }
//   return value
// },

export { date14, date12, date8, date6, date4, date_mdhms }
