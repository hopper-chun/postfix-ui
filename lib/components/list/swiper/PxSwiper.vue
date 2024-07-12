<script setup>
import { computed, ref, onMounted, watch } from 'vue'

const props = defineProps({
  params: { type: Object },
  groups: { type: [Array, Number], reqruied: true },
  useNavigation: { type: Boolean },
  styles: { type: [Array, Object] },
  maxWidth: { type: String },
})

const swiperRef = ref('')

const randomKey = Math.floor(Math.random() * 1000000)

const swiperParams = computed(() => {
  if (props.useNavigation) {
    return {
      ...props.params,
      navigation: {
        nextEl: '.next_btn' + randomKey,
        prevEl: '.prev_btn' + randomKey,
      },
    }
  } else
    return {
      ...props.params,
    }
})

const loadSwiper = () => {
  Object.assign(swiperRef.value, swiperParams.value)
  swiperRef.value.initialize()
}

onMounted(() => {
  loadSwiper()
})

watch(() => props.groups, loadSwiper)
</script>
<template>
  <div class="px-swiper">
    <swiper-container init="false" ref="swiperRef" :style="[{ maxWidth: maxWidth }]">
      <swiper-slide v-for="(group, index) in groups" class="px-swiper--slide">
        <slot :group="group" :index="index"></slot>
      </swiper-slide>
    </swiper-container>
    <template v-if="useNavigation">
      <div class="px-swiper--nav px-swiper--next" :class="`next_btn${randomKey}`"></div>
      <div class="px-swiper--nav px-swiper--prev" :class="`prev_btn${randomKey}`"></div>
    </template>
  </div>
</template>
