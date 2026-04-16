// const contentLength = (content) => {
//   const ALLOWED = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@*_+-./,'

//   let codeByte = 0
//   for (let idx = 0; idx < content.length; idx++) {
//     const oneChar = content.charAt(idx)

//     if (ALLOWED.indexOf(oneChar) != -1) {
//       codeByte++
//     } else {
//       const oneCharCode = content.charCodeAt(idx)
//       if (oneCharCode < 256) {
//         codeByte++
//       } else {
//         codeByte += 2
//       }
//     }
//   }
//   return codeByte
// }

// const substr = (content, length) => {
//   const ALLOWED = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@*_+-./,'

//   let codeByte = 0
//   for (let idx = 0; idx < content.length; idx++) {
//     const oneChar = content.charAt(idx)

//     if (ALLOWED.indexOf(oneChar) != -1) {
//       codeByte++
//     } else {
//       const oneCharCode = content.charCodeAt(idx)
//       if (oneCharCode < 256) {
//         codeByte++
//       } else {
//         codeByte += 2
//       }
//     }

//     if (codeByte > length) {
//       return content.substring(0, idx - 1)
//     }
//   }
//   return content
// }

const contentLength = (content) => {
  const ALLOWED = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@*_+-./,'

  let codeByte = 0
  for (const oneChar of content) {
    // for...of: surrogate pair 올바르게 처리
    if (ALLOWED.includes(oneChar)) {
      codeByte++
    } else {
      const cp = oneChar.codePointAt(0)
      // EUC-KR: ASCII 제어문자 + 기본 ASCII(0x00~0x7F)만 1바이트
      // 나머지(특수문자 포함 0x80 이상)는 2바이트
      if (cp < 0x80) {
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
  let charCount = 0 // 실제 문자(surrogate pair 포함) 인덱스 추적

  for (const oneChar of content) {
    // surrogate pair 올바르게 처리
    const cp = oneChar.codePointAt(0)
    let charByte = 0

    if (ALLOWED.includes(oneChar)) {
      charByte = 1
    } else if (cp < 0x80) {
      charByte = 1
    } else {
      charByte = 2
    }

    if (codeByte + charByte > length) {
      // 이 문자를 추가하면 초과 → 여기서 자름
      return [...content].slice(0, charCount).join('')
    }

    codeByte += charByte
    charCount++
  }

  return content
}

export default () => {
  return { contentLength, substr }
}
