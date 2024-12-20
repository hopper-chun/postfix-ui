<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useFunctionRef, useResize } from '@/composables'

const props = defineProps({
  direction: { type: String },
  hover: { type: Boolean },
  options: { type: [Array, Object] },
  optionsLabel: { type: Function, default: (option) => option },
  optionsValue: { type: Function, default: (option) => option },
})
const emit = defineEmits(['update:modelValue'])
const { functionRef, element } = useFunctionRef()
const { clientScreenWidth } = useResize()
const open = ref(false)

const isClosing = ref(false)

const containerRef = ref(null)

const listRef = ref(null)

const handleClick = () => {
  if (!props.hover) {
    open.value = !open.value
  }
}

const handleHover = (value) => {
  if (props.hover) {
    if (value === 'on') {
      open.value = true
    } else {
      open.value = false
    }
  }
}

const direction = computed(() => {
  if (!props.direction) {
    // 버튼의 뷰포트 상의 left값과, 리스트 width의 합이 뷰포트를 넘어서면 (리스트가 화면 밖으로 넘어갈 여지가 생기면) 리스트가 오른쪽으로 붙음
    const left = containerRef?.value?.getBoundingClientRect().left || 0
    const width = listRef?.value?.getBoundingClientRect().width || 0
    if (left + width > clientScreenWidth.value) {
      return 'right'
    } else {
      return 'left'
    }
  } else {
    // 필요하다면 방향을 임의로 지정할 수 있음
    return props.direction
  }
})

const clickHandler = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click'

const outsideClick = (e) => {
  if (!element.value.contains(e.target)) {
    open.value = false
  }
}

const handleSelect = (option) => {
  emit('update:modelValue', props.optionsValue(option))
  if (props.hover) {
    open.value = false

    // 선택하여 닫는 애니메이션 중간에 다시 호버가 되어 오픈 상태가 유지되는걸 방지
    isClosing.value = true
    setTimeout(() => {
      isClosing.value = false
    }, 200)
  }
}
onMounted(() => {
  window.addEventListener(clickHandler, outsideClick)
})

onUnmounted(() => {
  window.removeEventListener(clickHandler, outsideClick)
})
</script>

<template>
  <div class="px-dropdown" :ref="functionRef">
    <div ref="containerRef" @click="handleClick" @mouseover="handleHover('on')" @mouseleave="handleHover('off')" class="px-dropdown--container">
      <slot></slot>
      <!-- 옵션이 있다면 -->
      <div v-if="props.options && options.length > 0" ref="listRef" class="px-dropdown--lists" :class="[direction, { open }]">
        <div class="expandable">
          <div class="px-dropdown--list" v-for="option in options" @click="handleSelect(option)">
            <slot name="content" :option="option" :optionsLabel="optionsLabel(option)" :optionsValue="optionsValue(option)">
              <div>
                {{ optionsLabel(option) }}
              </div>
            </slot>
          </div>
        </div>
      </div>
      <!-- 옵션이 없다면 -->
      <div v-else ref="listRef" class="px-dropdown--lists" :class="[direction, { open }]">
        <div class="expandable">
          <div class="px-dropdown--list" @click="handleSelect()">
            <slot name="content"> </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
