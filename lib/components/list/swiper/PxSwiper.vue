<script setup>
import { computed, ref, onMounted, watch } from 'vue'

const props = defineProps({
  params: { type: Object },
  options: { type: [Array, Number], reqruied: true },
  useNavigation: { type: Boolean },
  styles: { type: [Array, Object] },
  maxWidth: { type: String },
  custom: { type: Boolean },
})

const emit = defineEmits(['onChangeSlide'])

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
      on: {
        init: function () {
          const nextButton = document.querySelector('.next_btn' + randomKey)
          const prevButton = document.querySelector('.prev_btn' + randomKey)
          nextButton.addEventListener('click', function (event) {
            event.stopPropagation()
            event.preventDefault()
          })
          prevButton.addEventListener('click', function (event) {
            event.stopPropagation()
            event.preventDefault()
          })
        },
      },
    }
  } else
    return {
      ...props.params,
      on: {
        slideChangeTransitionEnd: handleSlideChange,
      },
    }
})

const handleSlideChange = () => {
  // 슬라이드 change가 끝났을 때 호출
  const swiper = swiperRef.value?.swiper

  emit('onChangeSlide', swiper?.realIndex)
}

const loadSwiper = () => {
  Object.assign(swiperRef.value, swiperParams.value)
  swiperRef.value.initialize()
}

onMounted(() => {
  loadSwiper()
})

watch(() => props.options, loadSwiper)

const handleSlideTo = (index) => {
  swiperRef.value.swiper.slideTo(index)
}

const handleUpdate = () => {
  swiperRef.value.swiper.update()
}

const handleTranslateTo = (translate, speed, runCallbacks, translateBounds) => {
  swiperRef.value.swiper.translateTo(translate, speed, runCallbacks, translateBounds)
}

defineExpose({ handleSlideTo, handleUpdate, handleTranslateTo })
</script>
<template>
  <div class="px-swiper">
    <template v-if="custom">
      <swiper-container init="false" ref="swiperRef" class="mySwiper" :style="[{ maxWidth: maxWidth }]"> <slot :options="options"></slot> </swiper-container
    ></template>
    <template v-else>
      <swiper-container init="false" ref="swiperRef" class="mySwiper" :style="[{ maxWidth: maxWidth }]">
        <swiper-slide v-for="(option, index) in options" class="px-swiper--slide">
          <slot :option="option" :index="index"></slot>
        </swiper-slide>
      </swiper-container>
    </template>
    <template v-if="useNavigation">
      <div class="px-swiper--nav px-swiper--next" :class="`next_btn${randomKey}`"></div>
      <div class="px-swiper--nav px-swiper--prev" :class="`prev_btn${randomKey}`"></div>
    </template>
  </div>
</template>
