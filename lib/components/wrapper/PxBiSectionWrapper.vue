<script setup>
import { reactive, computed, ref, useSlots } from 'vue'
import { useTooltipDialog } from '@/composables'
const { setTooltip } = useTooltipDialog()

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
  useGrid: { type: Boolean, default: undefined },
  md: { type: String },
})
const emit = defineEmits(['onEdit', 'onSave', 'onClickTooltip'])

const slots = useSlots()

const tooltipContentRef = ref(null)

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
  if (props.useGrid === undefined && isEdit.value) {
    return false
  } else if (props.useGrid === true) {
    return true
  } else if (props.useGrid === false) {
    return false
  } else {
    return true
  }

  // if (!props.useGrid === false || isEdit.value) {
  //   return false
  // } else {
  //   return true
  // }
})

const accContainer = ref()
const handleClick = () => {
  acc.state = !acc.state
}

const handleEdit = () => {
  emit('onEdit')
}

const handleTooltipClick = () => {
  if (props.md) {
    setTooltip(tooltipContentRef.value.innerHTML)
  } else {
    emit('onClickTooltip', tooltipContentRef.value.innerHTML)
  }
}

const isExapnd = ref(false)

const handleClickMargin = () => {
  isExapnd.value = !isExapnd.value
}
</script>
<template>
  <div class="px-biSectionWrapper" :class="{ 'overflow-hidden': acc.state }">
    <div class="px-sectionWrapper--header">
      <div class="px-sectionWrapper--title">
        <div style="display: flex; align-items: center; flex-shrink: 0">
          <div class="px-sectionWrapper--label">
            {{ label }}
            <span v-if="required" class="required"></span>
          </div>

          <div v-if="!!slots.tooltip || md" class="px-sectionWrapper--tooltip">
            <button class="px-sectionWrapper--tooltipIcon" @click="handleTooltipClick"></button>
            <div ref="tooltipContentRef" style="display: none">
              <slot name="tooltip">{{ md }}</slot>
            </div>
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

        <PxButton v-if="mode === 'view' && !isReadOnly" size="sm" color="pri_border" @click="handleEdit" class="bg-white" style="font-weight: 700">{{
          useLocale ? 'edit' : '수정'
        }}</PxButton>

        <button v-if="isFold" class="px-sectionWrapper--fold" @click="handleClick">
          <PxIcon name="icon-chevron-right" class="fold__icon" :class="[{ isActive: acc.state }]"></PxIcon>
        </button>

        <slot name="TOP-RIGHT"></slot>
      </div>
    </div>
    <div ref="accContainer" class="px-sectionWrapper-accContainer">
      <div class="px-sectionWrapper--body" :class="[{ isWide }, { isGrid }]">
        <slot :viewMode="!isEdit"></slot>
        <slot v-if="isExapnd" name="expand" :viewMode="!isEdit"></slot>
      </div>
    </div>
    <div class="absolute inset-y-0 opacity-0 right-[10px] w-[10px] h-full" @dblclick="handleClickMargin"></div>
  </div>
</template>
