<script setup>
import { onMounted, nextTick, ref } from 'vue'
import _ from 'lodash'
import CheckboxDropdown from './CheckboxDropdown.vue'
import { RmToggle } from '@/components/form'

const props = defineProps({
  modelValue: { type: Object, required: true },
})

// const options = ref([])

// const load = () => {
//   options.value = _.cloneDeep(props.tableConfig.state.headers)
// }

// const handleSave = () => {
//   console.log('save to localstorage')
//   props.tableConfig.saveHeaders(options.value)
// }

// const handleReset = () => {
//   console.log('reset localstorage')
//   props.tableConfig.saveHeaders()

//   load()
// }
// load()
</script>
<template>
  <div class="rm-boardListConfig">
    <div v-for="option in modelValue.state.headers" class="option">
      <RmToggle
        :label="option.label"
        :id="option.field"
        :modelValue="option.using"
        :disabled="option.essential"
        @update:modelValue="
          ($event) => {
            option.using = $event
            $emit('onToggle')
          }
        "
      ></RmToggle>
    </div>
  </div>
</template>
