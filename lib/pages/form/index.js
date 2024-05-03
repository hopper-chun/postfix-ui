import Input from './Input.vue'
import TextArea from './TextArea.vue'
import FloatingForm from './FloatingForm.vue'
import DividedForm from './DividedForm.vue'
import Select from './Select.vue'
import Checkbox from './Checkbox.vue'
import Radio from './Radio.vue'
import Toggle from './Toggle.vue'
import Texteditor from './TextEditor.vue'
import Validate from './Validate.vue'

export default [
  { name: 'Input', path: '/input', component: Input },
  { name: 'TextArea', path: '/textArea', component: TextArea },
  { name: 'Floating Form', path: '/floatingForm', component: FloatingForm },
  { name: 'Divided Form', path: '/dividedForm', component: DividedForm },
  { name: 'Select', path: '/select', component: Select },
  { name: 'Checkbox', path: '/checkbox', component: Checkbox },
  { name: 'Radio', path: '/radio', component: Radio },
  { name: 'Toggle', path: '/toggle', component: Toggle },
  { name: 'Text editor', path: '/texteditor', component: Texteditor },
  { name: 'Validate', path: '/validate', component: Validate },
]
