<script setup>
import { toRefs, nextTick, ref, watch, computed } from 'vue'
import { useError, useTheme } from '@/composables'

const props = defineProps({
  id: { type: String },
  staticErrorMessage: { type: String },
  isFocusable: { type: Boolean },
})
const { id } = toRefs(props)

const { error } = useError(id)
const theme = useTheme(computed(() => {}))
const mySelf = ref(null)

// 필요한 경우 RmError 자체에 focus가 될 수 있도록 tabindex를 0을 주고 ref 에 focus를 준다
if (props.isFocusable && props.id) {
  watch(error, () => {
    if (error.value) {
      // error.value를 검사 안하면 없으질 때도 focus를 주려고 한다
      nextTick(() => {
        // v-if로 생성하는거라 dom이 없을 수 도 있다
        mySelf.value && mySelf.value.focus()
      })
    }
  })
}
</script>
<template>
  <p v-if="error" class="rm-error" :tabindex="isFocusable ? 0 : -1" ref="mySelf">
    {{ staticErrorMessage || error }}
  </p>
</template>
