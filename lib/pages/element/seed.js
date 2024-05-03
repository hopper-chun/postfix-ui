const button = {
  RmSmIconButton: `
<script setup>
import { computed } from 'vue'
const props = defineProps({
  type: { type: String, default: 'button' },
  textAlign: { type: String },
  size: {
    type: String,
    default: 'md',
  },
})

const align = computed(() => {
  if (props.size === 'md') {
    if (props.textAlign === 'center') {
      return 'text-[12px] px-[6px]'
    } else if (props.textAlign === 'centerRight') {
      return 'text-[12px] px-[6px]'
    } else if (props.textAlign === 'left') {
      return 'text-[12px] pr-[8px]'
    } else if (props.textAlign === 'right') {
      return 'text-[12px] pl-[8px]'
    }
  } else if (props.size === 'lg') {
    if (props.textAlign === 'center') {
      return 'text-[13px] px-[12px]'
    } else if (props.textAlign === 'centerRight') {
      return 'text-[13px] px-[12px]'
    } else if (props.textAlign === 'left') {
      return 'text-[13px] pr-[16px]'
    } else if (props.textAlign === 'right') {
      return 'text-[13px] pl-[16px]'
    }
  }
})

const order = computed(() => {
  if (props.textAlign === 'right') {
    return 'order-3'
  } else if (props.textAlign === 'centerRight') {
    return 'order-3'
  } else {
    return 'order-1'
  }
})

const size = computed(() => {
  if (props.size === 'md') {
    return 'h-[24px]  w-[24px] '
  } else if (props.size === 'lg') {
    return 'h-[32px]  w-[32px]  text-[13px]'
  }
})
</script>

<template>
  <button :type="type" class="inline-flex items-center rounded-[4px] bg-[#E5E7EB] text-[#4B5563] focus:outline-none">
    <div :class="[size, order]" class="flex items-center justify-center">
      <slot name="icon"></slot>
    </div>
    <div class="order-2" :class="[align]">
      <slot></slot>
    </div>
  </button>
</template>
`,
  roundedButton: `
<div class="w-[32px]">
  <RmButton color="pri" isFull size="sm" :styles="{ radius: 'rounded-full' }">
    <IconApi class="w-[18px]"></IconApi>
  </RmButton>
</div>

<div class="w-[40px]">
  <RmButton color="pri" isFull :styles="{ radius: 'rounded-full' }">
    <IconApi class="w-[21px]"></IconApi>
  </RmButton>
</div>

<div class="w-[48px]">
  <RmButton color="pri" isFull size="lg" :styles="{ radius: 'rounded-full' }">
    <IconApi class="w-[24px]"></IconApi>
  </RmButton>
</div>
`,
}

const tag = {
  clickEvent: `<RmTag @handleClick="handleRemove">default</RmTag>`,
  icon: `
<RmTag>
  <div class="flex items-center space-x-[8px]">
    <span><IconSettings class="w-[20px]"></IconSettings></span>
    <span>Default</span>
  </div>
</RmTag>`,
}

const badge = {}
const dropdown = {
  simple: {
    trigger: '드랍다운 버튼',
    menu: ['메뉴1', '메뉴2', '메뉴3', '메뉴4'],
  },
  simple2: {
    menu: ['메뉴1', '메뉴2', '메뉴3', '메뉴4'],
  },
  multi: {
    trigger: '멀티 드랍다운',
    menu: ['메뉴1', { trigger: '메뉴2', menu: ['메뉴2-1', '메뉴2-4', '메뉴2-3'] }, '메뉴3', '메뉴4'],
  },
}
export default { button, tag, badge, dropdown }
