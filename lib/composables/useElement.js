import { computed, ref, watch, nextTick } from 'vue'

const elementRefs = ref({})

export default (id, element) => {
  if (id?.value && element) {
    elementRefs.value[id.value] = element
  }
  return {
    refs: (id) => elementRefs.value[id],
  }
}
