<script setup>
import { nextTick, reactive, computed, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { RmButton } from '../element'
import { RmIcon } from '../Icon'

const props = defineProps({
  useLocale: { type: Boolean },
  label: { type: String },
  required: { type: Boolean },
  mode: { type: String, default: 'view' },
  isReadOnly: { type: Boolean },
  isFold: { type: Boolean },
  isWide: { type: Boolean },
  badge: { type: String },
  helperText: { type: String },
  useGrid: { type: Boolean },
})
const emit = defineEmits(['onEdit', 'onSave'])

const acc = reactive({
  state: false,
  height: 0,
})

const isEdit = computed(() => {
  if (props.mode === 'view' || props.mode === 'read') {
    return false
  } else {
    return true
  }
})

const accContainer = ref()
const handleClick = () => {
  acc.state = !acc.state
}

const handleEdit = () => {
  emit('onEdit')
}

// let resizeObserver
// let mutateObserver

// onMounted(() => {
//   resizeObserver = new ResizeObserver((entries) => {
//     // entries.forEach((entry) => {

//     calcHeight()

//     // acc.height = entry.contentRect.height
//     // })
//   })
//   resizeObserver.observe(accContainer.value)

//   mutateObserver = new MutationObserver((entries) => {
//     // entries.forEach((entry) => {
//     // console.log('entry', entries)
//     calcHeight()

//     // acc.height = entry.contentRect.height
//     // })
//   })
//   mutateObserver.observe(accContainer.value, { childList: true, subtree: true })
// })

// onBeforeUnmount(() => {
//   resizeObserver.disconnect()
//   mutateObserver.disconnect()
// })

// const calcHeight = () => {
//   acc.height = accContainer?.value?.scrollHeight
// }
</script>
<template>
  <div class="rm-sectionWrapper" :class="{ 'overflow-hidden': acc.state }">
    <div class="rm-sectionWrapper--header">
      <div class="rm-sectionWrapper--title">
        <div style="display: flex; align-items: center; flex-shrink: 0">
          <div class="rm-sectionWrapper--label">
            {{ label }}
            <span v-if="required" class="required"></span>
          </div>

          <div v-if="badge" class="rm-sectionWrapper--badge">
            {{ badge }}
          </div>
        </div>
        <div style="display: flex; align-items: center">
          <div v-if="helperText" class="rm-sectionWrapper--helperText">
            {{ helperText }}
          </div>
          <slot name="button"></slot>
        </div>
      </div>

      <div style="display: flex; align-items: center">
        <slot name="TOP-RIGHT-L" :viewMode="!isEdit"></slot>

        <RmButton v-if="mode === 'view' && !isReadOnly" size="sm" color="pri_border" @click="handleEdit" style="font-weight: 700">{{
          useLocale ? 'edit' : '편집'
        }}</RmButton>

        <button v-if="isFold" class="rm-sectionWrapper--fold" @click="handleClick">
          <RmIcon name="icon-chevron-right" class="fold__icon" :class="[{ isActive: acc.state }]"></RmIcon>
        </button>

        <slot name="TOP-RIGHT"></slot>
      </div>
    </div>
    <div class="" ref="accContainer" :style="acc.state ? 'max-height:0px' : 'max-height:100%; margin:16px 0'">
      <div class="rm-sectionWrapper--body" :class="[{ isWide }, { isGrid: useGrid || !isEdit }]">
        <slot :viewMode="!isEdit"></slot>
      </div>
    </div>
  </div>
</template>
