const phone = (value) => {
  if (!value) {
    return value
  }
  value = value.replace(/[^0-9]/g, '')

  if (value.length === 12) {
    return value.replace(/^(\d{4})(\d{4})(\d{4})$/g, '$1-$2-$3')
  } else if (value.length === 11) {
    return value.replace(/^(\d{3})(\d{4})(\d{4})$/g, '$1-$2-$3')
  } else if (value.length === 10) {
    if (value.startsWith('02')) {
      return value.replace(/^(\d{2})(\d{4})(\d{4})$/g, '$1-$2-$3')
    } else {
      return value.replace(/^(\d{3})(\d{3})(\d{4})$/g, '$1-$2-$3')
    }
  } else if (value.length === 9) {
    return value.replace(/^(\d{2})(\d{3})(\d{4})$/g, '$1-$2-$3')
  } else if (value.length === 8) {
    return value.replace(/^(\d{4})(\d{4})$/g, '$1-$2')
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
