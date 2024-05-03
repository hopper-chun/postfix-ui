import 'highlight.js/styles/stackoverflow-dark.css'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'

import hljsVuePlugin from '@highlightjs/vue-plugin'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('xml', xml)

export default {
  install: (app) => {
    app.use(hljsVuePlugin)
  },
}
