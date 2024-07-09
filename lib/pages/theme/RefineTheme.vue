<script setup>
import { reactive, ref } from 'vue'
import { PxButton, RmSmIconButton } from '@/components/element/button'
import { RmDividedSelect } from '@/components/form/select'
import { IconApi } from '@/components/icon'

import ToC from '@/layout/ToC.vue'
import SectionWrapper from '@/components/layout/SectionWrapper.vue'
import origin from './seed.js'

const elements = ref({})
const functionRefs = (label) => (el) => (elements.value[label] = el)

const nowObserving = ref(null)
const handleIntersection = (data) => {
  nowObserving.value = data
}
</script>
<template>
  <div class="relative flex w-full">
    <div class="max-w-[950px] flex-1">
      <div class="font-bold text-slate-500">theme</div>
      <div class="mt-[8px] text-[32px] font-bold text-slate-700">컴포넌트 재정의하기</div>
      <div class="mt-[16px] w-[800px] text-[15px] text-slate-700">
        각 컴포넌트는 클래스를 재정의하는 것으로 스타일을 변경할 수 있다. <br />
        라이브러리 안에선 css폴더의 common.css 에서 모든 클래스에 접근할 수 있다. <br />
        본 프로젝트에서는 App.vue 와 같은 위치에 default.css 를 만들어 재정의된 클래스를 관리하고 있다. <br />
        <br />
        <span class="font-bold">1. :root</span>
        <br />
        프로젝트를 시작하고, css 변수로 사용되는 공통 요소들을 재정의해주어야 한다. (primary color, 공통 radius 등)
        <br />
        이 요소들은 :root 안에 있으며, 최소한 secondary 컬러까지는 반드시 재정의해주셔야 한다. <br />
        대부분의 컴포넌트들이 primary와 secondary 컬러를 사용하고 있기 때문에, 재정의하지 않으면 뜬금없는 색상이 갑자기 튀어나올 수 있다.
        <br />
        필요할 경우 라이브러리 css파일에 새로운 :root 변수를 추가하는건 좋지만 수정은 위험하다.
        <br />
        <br />
        <span class="font-bold">2. 변종 컴포넌트</span>
        <br />
        단순히 재정의로 끝나는게 아니라, 하나의 인풋, 하나의 버튼을 두개 이상의 형태로 사용해야 할 경우가 있다.
        <br />
        예시로 두번째 input을 만들어야 한다 가정하면, 새로운 input2.vue 를 만들고, 내부에 RmInput을 div로 한번 감싼 다음 상위 클래스 또는 아이디로 마크한다.
        <br />
        이후, 일반적인 재정의 방식과 같은 방식으로 재정의하되, 재정의할 클래스의 가장 앞에 마크를 넣으면 input2의 RmInput만 재정의되는 식이다.
        <br />
        (ex ) #input2 .rm-input--field.error { 어쩌구 } )
        <br />
        너무 지저분하면 div로 감싸지 않고 재정의할 컴포넌트 자체에 클래스를 줘서 붙여 재정의해도 되지만, 위 방식이 보기에 깔끔하니까 그렇게 쓰는게 이득일 것
        같다. <br />
        단, div로 감싸는 만큼 속성은 block이 되니, 이 부분은 재정의할 때마다 컴포넌트 성격에 맞게 일일히 부여해야 한다. <br />
        만약 이 부분이 불합리하다면 붙여쓰는 방법으로 교체하도록 함.
      </div>
      <div class="mt-[60px]">
        <div class="space-y-[80px]">
          <div>
            <SectionWrapper label="Usage" :ref="functionRefs('Usage')" @onIntersection="handleIntersection">
              <template #contents></template>
            </SectionWrapper>
          </div>
        </div>
      </div>
    </div>
    <ToC :list="elements" :state="nowObserving"></ToC>
  </div>
</template>
