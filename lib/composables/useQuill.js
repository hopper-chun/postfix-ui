import { Quill } from '@vueup/vue-quill'
// import VideoResponsive from 'quill-video-responsive'

const BlockEmbed = Quill.import('blots/block/embed')
const Link = Quill.import('formats/link')

class VideoResponsive extends BlockEmbed {
  static blotName = 'video'
  static tagName = 'div'

  static create(value) {
    const node = super.create(value)

    // // 노드를 cut & paste 하면 src가 없는 wrapper들이 딸려온다
    if (!value) {
      return node
    }
    node.classList.add('ql-video-wrapper')

    // const innerChild = document.createElement('div')
    // innerChild.classList.add('ql-video-inner')
    // node.appendChild(innerChild)

    const child = document.createElement('iframe')
    child.setAttribute('frameborder', '0')
    child.setAttribute('allowfullscreen', true)
    child.setAttribute('src', this.sanitize(value))
    // innerChild.appendChild(child)
    child.setAttribute('class', 'ql-video-inner')
    node.appendChild(child)

    return node
  }

  static sanitize(url) {
    return Link.sanitize(url)
  }

  static value(domNode) {
    const iframe = domNode.querySelector('iframe')
    return iframe ? iframe.getAttribute('src') : ''
  }
}

let isInit = false

export default () => {
  if (isInit) {
    return
  }

  isInit = true
  //   Quill.register(VideoResponsive)
}
