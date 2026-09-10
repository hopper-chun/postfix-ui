<script setup>
import { nextTick, ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const swiperRef = ref(null)
const eventSwiperRef = ref(null)
const currentIndex = ref(0)
const nextSlideNumber = ref(5)

const slides = ref([
  { title: '새로운 기능', description: '주요 업데이트를 카드로 소개합니다.', background: 'linear-gradient(135deg, #312e81, #7c3aed)' },
  { title: '사용 가이드', description: '필요한 사용법을 빠르게 확인합니다.', background: 'linear-gradient(135deg, #0f766e, #06b6d4)' },
  { title: '디자인 시스템', description: '프로젝트 UI의 일관성을 유지합니다.', background: 'linear-gradient(135deg, #9f1239, #f43f5e)' },
  { title: '업데이트 내역', description: '최근 변경된 기능을 확인합니다.', background: 'linear-gradient(135deg, #9a3412, #f59e0b)' },
])

const previewSlides = slides.value.slice(0, 3)
const classSlides = [
  ...slides.value,
  { title: '스와이프 확인' },
  { title: '마지막 카드' },
]

const basicParams = {
  slidesPerView: 'auto',
  spaceBetween: 12,
  speed: 300,
}

const eventParams = {
  slidesPerView: 1,
  speed: 300,
}

const loopParams = {
  slidesPerView: 1,
  speed: 500,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
}

const paginationParams = {
  slidesPerView: 1,
  speed: 300,
  pagination: {
    el: '.docs-swiper-pagination',
    clickable: true,
  },
}

const addSlide = async () => {
  const number = nextSlideNumber.value++
  slides.value.push({
    title: `추가 카드 ${number}`,
    description: '배열을 변경한 뒤 handleUpdate()를 호출했습니다.',
    background: 'linear-gradient(135deg, #164e63, #0284c7)',
  })
  await nextTick()
  swiperRef.value?.handleUpdate()
}

const basicCode = `const slides = ref([
  { title: '새로운 기능' },
  { title: '사용 가이드' },
  { title: '디자인 시스템' }
])

const swiperParams = {
  slidesPerView: 'auto',
  spaceBetween: 12,
  speed: 300
}

<PxSwiper
  ref="swiperRef"
  :options="slides"
  :params="swiperParams"
  useNavigation
>
  <template #default="{ option, index }">
    <article class="h-[160px] w-[220px]">
      <span>{{ index + 1 }}</span>
      <strong>{{ option.title }}</strong>
    </article>
  </template>
</PxSwiper>`

const setupCode = `// main.js
import { createApp } from 'vue'
import { register } from 'swiper/element/bundle'

register()

createApp(App).mount('#app')`

const tabCode = `const swiperParams = {
  slidesPerView: 'auto',
  speed: 300
}

<PxSwiper :options="tabs" :params="swiperParams">
  <template #default="{ option }">
    <router-link :to="option.path" class="shrink-0">
      {{ option.title }}
    </router-link>
  </template>
</PxSwiper>`

const methodCode = `const swiperRef = ref(null)

const addSlide = async () => {
  slides.value.push(newSlide)

  await nextTick()
  swiperRef.value?.handleUpdate()
}

swiperRef.value?.handleSlideTo(2)
swiperRef.value?.handleTranslateTo(20)`

const eventCode = `<PxSwiper
  ref="swiperRef"
  :options="slides"
  :params="{ slidesPerView: 1, speed: 300 }"
  @onChangeSlide="currentIndex = $event"
>
  <template #default="{ option }">
    <div class="mx-[8px] w-[calc(100%-16px)]">
      {{ option.title }}
    </div>
  </template>
</PxSwiper>

<PxButton @click="swiperRef?.handleSlideTo(2)">
  세 번째 슬라이드
</PxButton>`

const loopCode = `const loopParams = {
  slidesPerView: 1,
  speed: 500,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  }
}

<PxSwiper :options="slides" :params="loopParams" useNavigation>
  <template #default="{ option, index }">
    <article class="mx-[8px] h-[180px] w-[calc(100%-16px)]">
      <span>{{ index + 1 }}</span>
      <strong>{{ option.title }}</strong>
    </article>
  </template>
</PxSwiper>`

const paginationCode = `const paginationParams = {
  slidesPerView: 1,
  speed: 300,
  pagination: {
    el: '.project-swiper-pagination',
    clickable: true
  }
}

<div>
  <PxSwiper :options="slides" :params="paginationParams">
    <template #default="{ option }">
      <article class="mx-[8px] w-[calc(100%-16px)]">
        {{ option.title }}
      </article>
    </template>
  </PxSwiper>
  <div class="project-swiper-pagination"></div>
</div>

<style>
.project-swiper-pagination {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 14px;
}

.project-swiper-pagination .swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: #cbd5e1;
  cursor: pointer;
}

.project-swiper-pagination .swiper-pagination-bullet-active {
  width: 22px;
  background-color: #334155;
}
</style>`

const customSlotCode = `<PxSwiper :options="slides" :params="swiperParams" custom>
  <template #default="{ options }">
    <swiper-slide v-for="(option, index) in options" :key="index">
      {{ option.title }}
    </swiper-slide>
  </template>
</PxSwiper>`

const customClassCode = `const classSlides = [
  { title: '새로운 기능' },
  { title: '사용 가이드' },
  { title: '디자인 시스템' },
  { title: '업데이트 내역' },
  { title: '스와이프 확인' },
  { title: '마지막 카드' }
]

<div class="project-swiper">
  <PxSwiper :options="classSlides" :params="swiperParams" useNavigation>
    <template #default="{ option }">
      <div class="project-swiper-card">{{ option.title }}</div>
    </template>
  </PxSwiper>
</div>

<style>
.project-swiper .px-swiper {
  padding: 20px 48px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background-color: #f8fafc;
}

.project-swiper .px-swiper--nav {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-image: none;
  background-color: #334155;
  color: #ffffff;
  font-size: 24px;
  line-height: 1;
}

.project-swiper .px-swiper--next::before {
  content: '›';
}

.project-swiper .px-swiper--prev::before {
  content: '‹';
}

.project-swiper-card {
  width: 220px;
  padding: 20px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background-color: #ffffff;
  color: #334155;
  font-weight: 700;
}
</style>`

const propHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'type', label: '타입' },
  { field: 'defaultValue', label: '기본값' },
  { field: 'description', label: '설명' },
]

const propRows = [
  { name: 'options', type: 'Array | Number', defaultValue: '필수', description: '슬라이드로 반복할 데이터 또는 반복 횟수' },
  { name: 'params', type: 'Object', defaultValue: '-', description: 'Swiper Element에 전달할 초기화 설정' },
  { name: 'useNavigation', type: 'Boolean', defaultValue: 'false', description: '컴포넌트 양쪽의 이전·다음 버튼 사용' },
  { name: 'maxWidth', type: 'String', defaultValue: '-', description: '내부 swiper-container의 max-width 인라인 스타일' },
  { name: 'custom', type: 'Boolean', defaultValue: 'false', description: '자동 swiper-slide 생성을 끄고 슬롯에서 전체 슬라이드 구조 작성' },
]

const slotHeaders = [
  { field: 'mode', label: '모드' },
  { field: 'scope', label: '슬롯 Props', code: true },
  { field: 'description', label: '설명' },
]

const slotRows = [
  { mode: '기본', scope: '{ option, index }', description: '각 option을 자동 생성된 swiper-slide 안에 렌더링' },
  { mode: 'custom', scope: '{ options }', description: '전체 배열을 전달하며 swiper-slide까지 직접 작성' },
]

const methodHeaders = [
  { field: 'name', label: '메서드', code: true },
  { field: 'argument', label: '인자', code: true },
  { field: 'description', label: '설명' },
]

const methodRows = [
  { name: 'handleSlideTo', argument: 'index', description: '지정한 슬라이드 인덱스로 이동' },
  { name: 'handleUpdate', argument: '-', description: '슬라이드 개수나 크기가 바뀐 뒤 Swiper 다시 계산' },
  { name: 'handleTranslateTo', argument: 'translate, speed?, runCallbacks?, translateBounds?', description: 'Swiper translate 값을 직접 이동' },
]

const eventHeaders = [
  { field: 'name', label: '이벤트', code: true },
  { field: 'payload', label: '전달값', code: true },
  { field: 'description', label: '설명' },
]

const eventRows = [{ name: 'onChangeSlide', payload: 'realIndex', description: '슬라이드 전환 애니메이션이 끝난 뒤 현재 실제 인덱스 전달' }]

const classHeaders = [
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도' },
]

const classRows = [
  { className: '<code>px-swiper</code>', description: '컴포넌트 최상위 및 내비게이션 기준 영역' },
  { className: '<code>mySwiper</code>', description: '내부 swiper-container' },
  { className: '<code>px-swiper--slide</code>', description: '기본 모드에서 자동 생성되는 swiper-slide' },
  { className: '<code>px-swiper--nav</code>', description: '이전·다음 버튼 공통' },
  { className: '<code>px-swiper--next</code>', description: '다음 버튼' },
  { className: '<code>px-swiper--prev</code>', description: '이전 버튼' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">LIST</p>
    <h1>PxSwiper</h1>
    <p class="docs-lead">Swiper Element를 감싸 데이터 반복, 이전·다음 버튼과 외부 제어 메서드를 제공하는 슬라이더입니다.</p>

    <section class="docs-section">
      <h2>사용 전 등록</h2>
      <CodeBlock :code="setupCode" />
      <p class="docs-note">
        <code>PxSwiper</code>는 <code>swiper-container</code> Web Component를 사용합니다. 앱이 시작될 때 <code>register()</code>를 한 번 호출하지 않으면 초기화할 수 없습니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <PxSwiper ref="swiperRef" :options="slides" :params="basicParams" useNavigation maxWidth="720px">
          <template #default="{ option, index }">
            <article
              class="flex h-[160px] w-[220px] flex-col justify-end rounded-[16px] p-[20px] text-white shadow-[0_12px_28px_rgba(15,23,42,0.18)]"
              :style="{ background: option.background }"
            >
              <span class="text-[12px] font-bold opacity-70">SLIDE {{ index + 1 }}</span>
              <strong class="mt-[8px] text-[19px]">{{ option.title }}</strong>
              <span class="mt-[6px] text-[12px] leading-[1.5] opacity-80">{{ option.description }}</span>
            </article>
          </template>
        </PxSwiper>
        <div class="mt-[16px] flex flex-wrap gap-[8px]">
          <PxButton size="xs" color="gray_border" @click="swiperRef?.handleSlideTo(0)">첫 슬라이드</PxButton>
          <PxButton size="xs" color="gray_border" @click="swiperRef?.handleSlideTo(2)">세 번째 슬라이드</PxButton>
          <PxButton size="xs" @click="addSlide">슬라이드 추가</PxButton>
        </div>
      </div>
      <CodeBlock :code="basicCode" />
      <p class="docs-note">
        실제 캐러셀 미리보기에서도 <code>slidesPerView: 'auto'</code>와 고정 너비의 슬롯 콘텐츠를 조합합니다. <code>useNavigation</code>을 사용하면 좌우 이동 버튼이 자동으로 연결됩니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>가로 탭 사용</h2>
      <CodeBlock :code="tabCode" />
      <p class="docs-note">항목 너비를 콘텐츠에 맡긴 <code>slidesPerView: 'auto'</code> 구성은 화면 폭이 좁을 때 가로로 넘기는 탭 목록에도 사용할 수 있습니다.</p>
    </section>

    <section class="docs-section">
      <h2>슬라이드 변경 이벤트</h2>
      <div class="example-preview">
        <PxSwiper ref="eventSwiperRef" :options="previewSlides" :params="eventParams" @onChangeSlide="currentIndex = $event" maxWidth="520px">
          <template #default="{ option, index }">
            <div class="mx-[8px] flex h-[120px] w-[calc(100%-16px)] items-center justify-center rounded-[14px] bg-[#111827] text-[20px] font-extrabold text-white">
              {{ index + 1 }} · {{ option.title }}
            </div>
          </template>
        </PxSwiper>
        <div class="mt-[14px] flex flex-wrap items-center gap-[8px]">
          <PxButton v-for="index in 3" :key="index" size="xs" color="gray_border" @click="eventSwiperRef?.handleSlideTo(index - 1)">{{ index }}번</PxButton>
          <PxTag color="pri_border">realIndex: {{ currentIndex }}</PxTag>
        </div>
      </div>
      <CodeBlock :code="eventCode" />
      <DocsTable class="mt-[14px]" :headers="eventHeaders" :rows="eventRows" />
      <p class="docs-note">
        현재 구현에서는 <code>useNavigation</code>을 켜면 내부에서 <code>params.on</code>을 내비게이션 초기화용으로 교체합니다. 따라서 <code>onChangeSlide</code>와 직접 전달한
        <code>params.on</code> 콜백이 필요하다면 <code>useNavigation</code> 없이 외부 버튼이나 스와이프로 이동합니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>동적 목록과 외부 제어</h2>
      <CodeBlock :code="methodCode" />
      <DocsTable :headers="methodHeaders" :rows="methodRows" />
      <p class="docs-note">
        배열을 통째로 교체하면 options watcher가 실행되지만, <code>push()</code>나 <code>splice()</code>처럼 같은 배열을 변경한 경우에는 DOM 갱신 후
        <code>handleUpdate()</code>를 호출합니다. 슬라이드 크기 변경 후 위치가 어긋날 때도 같은 방식으로 다시 계산할 수 있습니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>Loop 스와이퍼</h2>
      <div class="example-preview">
        <PxSwiper :options="previewSlides" :params="loopParams" useNavigation maxWidth="720px">
          <template #default="{ option, index }">
            <article
              class="mx-[8px] flex h-[180px] w-[calc(100%-16px)] flex-col items-center justify-center rounded-[18px] px-[56px] text-center text-white shadow-[0_16px_36px_rgba(15,23,42,0.2)]"
              :style="{ background: option.background }"
            >
              <span class="text-[12px] font-bold tracking-[0.16em] opacity-70">LOOP {{ index + 1 }}</span>
              <strong class="mt-[10px] text-[24px]">{{ option.title }}</strong>
              <span class="mt-[7px] text-[13px] opacity-80">{{ option.description }}</span>
            </article>
          </template>
        </PxSwiper>
      </div>
      <CodeBlock :code="loopCode" />
      <p class="docs-note"><code>loop: true</code>로 끝에서 처음으로 자연스럽게 이어지며, <code>autoplay</code>와 함께 배너처럼 자동 순환하는 구성으로 사용할 수 있습니다.</p>
      <div class="mt-[14px] rounded-[8px] border border-[#f59e0b] bg-[#fffbeb] px-[16px] py-[14px] text-[13px] leading-[1.6] text-[#78350f]">
        <strong class="block text-[14px]">Loop 카드 수 주의</strong>
        <p class="mt-[4px]">
          <code>slidesPerView</code>가 2 이상이면 슬라이드 수를 <strong><code>slidesPerView × 2</code> 이상</strong>으로 구성하는 것을 권장합니다. 수가 부족하면 루프 중 빈 영역이 나오거나 내비게이션·드래그 조작이 깨질 수 있습니다.
          예: <code>slidesPerView: 2</code>는 4개 이상, <code>slidesPerView: 3</code>은 6개 이상.
        </p>
      </div>
    </section>

    <section class="docs-section">
      <h2>Pagination</h2>
      <div class="example-preview">
        <div class="mx-auto w-full max-w-[720px]">
          <PxSwiper :options="previewSlides" :params="paginationParams">
            <template #default="{ option, index }">
              <article class="mx-[8px] flex h-[150px] w-[calc(100%-16px)] flex-col justify-center rounded-[10px] border border-[#cbd5e1] bg-[#f8fafc] px-[28px]">
                <span class="text-[12px] font-bold text-[#64748b]">PAGE {{ index + 1 }}</span>
                <strong class="mt-[8px] text-[20px] text-[#1e293b]">{{ option.title }}</strong>
                <span class="mt-[5px] text-[13px] text-[#64748b]">{{ option.description }}</span>
              </article>
            </template>
          </PxSwiper>
          <div class="docs-swiper-pagination"></div>
        </div>
      </div>
      <CodeBlock :code="paginationCode" />
      <p class="docs-note">
        <code>pagination.el</code>에 지정한 selector와 같은 클래스의 요소를 <code>PxSwiper</code> 밖에 놓습니다. <code>clickable: true</code>를 설정하면 표시점을 눌러 이동할 수 있습니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>Props와 Slot</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
      <DocsTable class="mt-[14px]" :headers="slotHeaders" :rows="slotRows" />
    </section>

    <section class="docs-section">
      <h2>Custom 슬롯</h2>
      <CodeBlock :code="customSlotCode" />
      <p class="docs-note">
        <code>custom</code>을 사용하면 PxSwiper가 <code>swiper-slide</code>를 자동 생성하지 않습니다. 슬롯에서 전달받은 전체 options를 반복하며 슬라이드 태그까지 직접 작성해야 합니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <DocsTable :headers="classHeaders" :rows="classRows" />
      <div class="example-preview mt-[20px]">
        <div class="project-swiper">
          <PxSwiper :options="classSlides" :params="basicParams" useNavigation>
            <template #default="{ option }">
              <div class="project-swiper-card">{{ option.title }}</div>
            </template>
          </PxSwiper>
        </div>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>
  </article>
</template>

<style>
.project-swiper .px-swiper {
  padding: 20px 48px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background-color: #f8fafc;
}

.project-swiper .px-swiper--nav {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-image: none;
  background-color: #334155;
  color: #ffffff;
  font-size: 24px;
  line-height: 1;
}

.project-swiper .px-swiper--next::before {
  content: '›';
}

.project-swiper .px-swiper--prev::before {
  content: '‹';
}

.project-swiper .project-swiper-card {
  width: 220px;
  padding: 20px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background-color: #ffffff;
  color: #334155;
  font-weight: 700;
}

.docs-swiper-pagination {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 14px;
}

.docs-swiper-pagination .swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: #cbd5e1;
  cursor: pointer;
}

.docs-swiper-pagination .swiper-pagination-bullet-active {
  width: 22px;
  background-color: #334155;
}
</style>
