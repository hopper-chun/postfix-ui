export default {
  channelUrl: (channelType, channelId) => {
    if (channelType === 'blog') {
      return `https://blog.naver.com/${channelId}`
    } else if (channelType === 'instagram') {
      return `https://www.instagram.com/${channelId}`
    } else if (channelType === 'youtube') {
      return `https://www.youtube.com/channel/${channelId}`
    } else {
      return ``
    }
  },
  trim: (str, length) => {
    if (str.length > length) {
      return str.substring(0, length) + '...'
    }
    return str
  },
}
