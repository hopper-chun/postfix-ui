// const phone = (value) => {
//   if (!value) {
//     return value
//   }
//   value = value.replace(/[^0-9]/g, '')

//   if (value.length === 12) {
//     return value.replace(/^(\d{4})(\d{4})(\d{4})$/g, '$1-$2-$3')
//   } else if (value.length === 11) {
//     return value.replace(/^(\d{3})(\d{4})(\d{4})$/g, '$1-$2-$3')
//   } else if (value.length === 10) {
//     if (value.startsWith('02')) {
//       return value.replace(/^(\d{2})(\d{4})(\d{4})$/g, '$1-$2-$3')
//     } else {
//       return value.replace(/^(\d{3})(\d{3})(\d{4})$/g, '$1-$2-$3')
//     }
//   } else if (value.length === 9) {
//     return value.replace(/^(\d{2})(\d{3})(\d{4})$/g, '$1-$2-$3')
//   } else if (value.length === 8) {
//     return value.replace(/^(\d{4})(\d{4})$/g, '$1-$2')
//   }
//   return value
// }

// 마스킹 된 애들 때문에 수정한다.
const phone = (value) => {
  if (!value) {
    return value
  }
  value = value.replace(/[^0-9*]/g, '')

  if (value.length === 12) {
    return value.slice(0, 4) + '-' + value.slice(4, 8) + '-' + value.slice(8)
  } else if (value.length === 11) {
    return value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7)
  } else if (value.length === 10) {
    if (value.startsWith('02')) {
      return value.slice(0, 2) + '-' + value.slice(2, 6) + '-' + value.slice(6)
    } else {
      return value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6)
    }
  } else if (value.length === 9) {
    return value.slice(0, 2) + '-' + value.slice(2, 5) + '-' + value.slice(5)
  } else if (value.length === 8) {
    return value.slice(0, 4) + '-' + value.slice(4)
  }
  return value
}

const businessNo = (value) => {
  if (!value) {
    return value
  }
  value = value.replace(/[^0-9]/g, '')
  if (value.length === 10) {
    return value.replace(/^(\d{3})(\d{2})(\d{5})$/g, '$1-$2-$3')
  }
  return value
}

const corporationNo = (value) => {
  if (!value) {
    return value
  }
  value = value.replace(/[^0-9]/g, '')
  if (value.length === 13) {
    return value.replace(/^(\d{6})(\d{7})$/g, '$1-$2')
  }
  return value
}

export { phone, businessNo, corporationNo }
