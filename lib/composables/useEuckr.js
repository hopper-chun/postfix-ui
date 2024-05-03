const contentLength = (content) => {
  const ALLOWED = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@*_+-./,'

  let codeByte = 0
  for (let idx = 0; idx < content.length; idx++) {
    const oneChar = content.charAt(idx)

    if (ALLOWED.indexOf(oneChar) != -1) {
      codeByte++
    } else {
      const oneCharCode = content.charCodeAt(idx)
      if (oneCharCode < 256) {
        codeByte++
      } else {
        codeByte += 2
      }
    }
  }
  return codeByte
}

const substr = (content, length) => {
  const ALLOWED = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@*_+-./,'

  let codeByte = 0
  for (let idx = 0; idx < content.length; idx++) {
    const oneChar = content.charAt(idx)

    if (ALLOWED.indexOf(oneChar) != -1) {
      codeByte++
    } else {
      const oneCharCode = content.charCodeAt(idx)
      if (oneCharCode < 256) {
        codeByte++
      } else {
        codeByte += 2
      }
    }

    if (codeByte > length) {
      return content.substring(0, idx - 1)
    }
  }
  return content
}

export default () => {
  return { contentLength, substr }
}
