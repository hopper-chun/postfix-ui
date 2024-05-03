const useFlag = (value) => {
  if (value) {
    if (value === 'Y') {
      return '사용중'
    }
    if (value === 'N') {
      return '중지'
    }
  }
  return value
}
const trim = (value, length) => {
  if (value && value.length > length) {
    return value.substring(0, length) + '...'
  }
  return value
}
const number = (value) => {
  if (value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return value
}

// const currency = (value, { fixed } = { fixed: 2 }) => {
//   if (value) {
//     if (fixed) {
//       return parseFloat(parseFloat(value).toFixed(fixed)).toLocaleString()
//     }
//     return parseInt(value).toLocaleString()
//   }
//   // 빈문자열인 경우 아무것도 안나오면 이상해서..  통화니까 문자열 '0'으로 바꿔준다.
//   return '0'
//   // return value
// }

const currency = (value) => {
  if (value) {
    const ret = parseFloat(value)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    if (ret.endsWith('.00')) {
      return ret.substring(0, ret.length - 3) // 소수점 포함 삭제
    } else if (ret.endsWith('0')) {
      return ret.substring(0, ret.length - 1) // 마지막 0만 삭제
    } else {
      return ret
    }
  }

  // 빈문자열인 경우 아무것도 안나오면 이상해서..  통화니까 문자열 '0'으로 바꿔준다.
  return '0'
}

const displaySeconds = (value) => {
  if (value > 3600) {
    const hour = parseInt(value / 60)
    const min = parseInt(hour / 60)
    const seconds = value % 60
    return (hour + '').padStart(2, '0') + ':' + (min + '').padStart(2, '0') + ':' + (seconds + '').padStart(2, '0')
  } else {
    const min = parseInt(value / 60)
    const seconds = value % 60
    return (min + '').padStart(2, '0') + ':' + (seconds + '').padStart(2, '0')
  }
}

// currency: function

// percent: function (value) {
//   if (value) {
//     return parseFloat(value).toFixed(2) + '%'
//   }
//   return value
// },

export { useFlag, trim, number, currency, displaySeconds }
