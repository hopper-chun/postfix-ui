<script setup>
import { reactive, computed, ref } from 'vue'

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
  useGrid: { type: Boolean, default: true },
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

const isGrid = computed(() => {
  if (!props.useGrid || isEdit.value) {
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
</script>
<template>
  <div class="px-sectionWrapper" :class="{ 'overflow-hidden': acc.state }">
    <div class="px-sectionWrapper--header">
      <div class="px-sectionWrapper--title">
        <div style="display: flex; align-items: center; flex-shrink: 0">
          <div class="px-sectionWrapper--label">
            {{ label }}
            <span v-if="required" class="required"></span>
          </div>

          <div v-if="badge" class="px-sectionWrapper--badge">
            {{ badge }}
          </div>
        </div>
        <div style="display: flex; align-items: center">
          <div v-if="helperText" class="px-sectionWrapper--helperText">
            {{ helperText }}
          </div>
          <slot name="button"></slot>
        </div>
      </div>

      <div style="display: flex; align-items: center">
        <slot name="TOP-RIGHT-L" :viewMode="!isEdit"></slot>

        <PxButton v-if="mode === 'view' && !isReadOnly" size="sm" color="pri_border" @click="handleEdit" style="font-weight: 700">{{
          useLocale ? 'edit' : '편집'
        }}</PxButton>

        <button v-if="isFold" class="px-sectionWrapper--fold" @click="handleClick">
          <PxIcon name="icon-chevron-right" class="fold__icon" :class="[{ isActive: acc.state }]"></PxIcon>
        </button>

        <slot name="TOP-RIGHT"></slot>
      </div>
    </div>
    <div class="" ref="accContainer" :style="acc.state ? 'max-height:0px' : 'max-height:100%; margin:16px 0'">
      <div class="px-sectionWrapper--body" :class="[{ isWide }, { isGrid }]">
        <slot :viewMode="!isEdit"></slot>
      </div>
    </div>
  </div>
</template>
