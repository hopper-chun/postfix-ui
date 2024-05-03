<template>
  <!-- <div>
    <HpSelectWithCheck
      size="xs"
      :options="options"
      :optionsValue="(o) => o.key + ''"
      :optionsLabel="(o) => o.label"
      v-model="localValue"
      @update:modelValue="handleCheckUpdate"
    ></HpSelectWithCheck>
  </div> -->
</template>

<script>
import { ref, watch } from 'vue'
export default {
  props: {
    filters: { type: Array, required: true },
    filterType: { type: String, required: true },

    options: {
      type: Array,
      required: true,
    },
  },
  setup(props, context) {
    const localValue = ref('')

    const reload = () => {
      const mapper = props.filters.reduce((acc, filter) => {
        acc[filter[0].key] = filter[1]
        return acc
      }, {})

      console.log('mapper[props.filterType]', mapper, mapper[props.filterType])

      localValue.value = mapper[props.filterType] || ''
    }
    watch(
      () => props.filters,
      () => reload()
    )
    reload()

    const handleCheckUpdate = () => {
      context.emit('onAppendQuerys', [{ key: props.filterType, value: localValue.value }])
    }

    return {
      localValue,
      handleCheckUpdate,
    }
  },
}
</script>
