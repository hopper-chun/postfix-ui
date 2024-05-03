<script setup>
import { ref } from 'vue'
import { RmSectionWrapper } from '@/components/wrapper'
import { RmInput, RmFormForView, RmTextarea, RmSelect } from '@/components'
import { useTheme, useThemeDefault } from '@/composables'

const theme = useTheme({
  //   gap: { all: 'gap-[100px]' },
  //   fontSize: 'text-[200px]',
  //   primary: {
  //     border: 'border-red-100',
  //   },
})

// const { setTheme, defaultTheme } = useThemeDefault()
// setTheme({
//   gap: { all: 'gap-[100px]' },
//   fontSize: 'text-[200px]',
//   primary: {
//     border: 'border-red-300',
//   },
// })

// console.log(theme.value)
const svgRef = ref('')

const stattatata = ref(false)
const handleEdit = () => {
  stattatata.value = !stattatata.value
}
const emptyvalue = ref('')

const handleClick = () => {
  console.log(svgRef.value.children[4].rotate)
}
</script>
<template>
  <div>
    <div class="w-[360px]">
      <RmSectionWrapper label="- 사용이 완료된 내역만 조회됩니다. ( 현재 발송중인 서비스 확인 불가 )"></RmSectionWrapper>
    </div>
    <template v-if="false">
      <div class="h-[400px] w-[1200px]">
        <div class="mb-[40px] h-[40px] w-[40px] cursor-pointer bg-lime-400" @click="handleClick"></div>
        <div class="bbb font-bold">컬러테스트</div>
        <svg class="aaa h-full w-full" ref="svgRef">
          <defs>
            <radialGradient id="yr-rg" cx="50%" cy="50%" r="50%" fx="20%" fy="20%">
              <stop offset="0%" stop-color="#ffc054" />
              <stop offset="100%" stop-color="#ff614b" />
            </radialGradient>
          </defs>
          <rect width="480" height="200" x="20" y="40" fill="url(#yr-rg)" rx="20" ry="20"></rect>
          <!-- <circle cx="100" cy="100" r="100" fill="#172042"></circle> -->
          <circle cx="120" cy="120" r="100" fill="none" stroke-width="20" stroke="#172042"></circle>
          <ellipse cx="300" cy="200" rx="50" ry="100" fill="#dac984" stroke-width="30" stroke="#b5691a"></ellipse>
          <line x1="0" y1="0" x2="400" y2="200" stroke-width="5" stroke="#777777"></line>
          <defs>
            <path id="text-line" d="M100,300 Q200,200 350,300 Q550,450 700,300" />
          </defs>
          <text x="30" y="100" font-weight="700" font-size="60" rotate="4, 8, 0, -8, -4, -20, -24, 48">
            <textPath xlink:href="#text-line">이거 신기하네요</textPath>
          </text>
        </svg>
      </div>
    </template>
  </div>
</template>
<style scoped>
.aaa text {
  fill: rgba(72, 138, 204, 1);
  animation: stroke 5s infinite alternate;
}

.bbb {
}

@keyframes stroke {
  0% {
    stroke-dashoffset: 25%;
    stroke-dasharray: 0 50%;
    fill: rgba(72, 138, 204, 0);
    stroke: rgba(54, 95, 160, 1);
    stroke-width: 2;
  }
  70% {
    fill: rgba(72, 138, 204, 0);
    stroke: rgba(54, 95, 160, 1);
  }
  80% {
    fill: rgba(72, 138, 204, 0);
    stroke: rgba(54, 95, 160, 1);
  }
  100% {
    stroke-dashoffset: -25%;
    stroke-dasharray: 50% 0;
    fill: rgba(72, 138, 204, 1);
    stroke: rgba(54, 95, 160, 0);
    stroke-width: 0;
  }
}
</style>
