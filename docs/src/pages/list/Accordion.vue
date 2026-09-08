<script setup>
import { ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const accordionRef = ref(null)

const faqItems = [
  {
    question: 'currentState는 외부 상태와 계속 동기화되나요?',
    answer: '아니요. 마운트될 때의 초기 열림 상태로만 사용됩니다.',
  },
  {
    question: 'header 전체를 클릭하면 열리고 닫히나요?',
    answer: '네. header 슬롯에서 handleClickAcc를 직접 사용하지 않았다면 헤더 영역 전체가 토글 버튼으로 동작합니다.',
  },
  {
    question: '열기와 닫기 버튼을 따로 만들 수 있나요?',
    answer: "handleClickAcc('on')과 handleClickAcc('off')를 사용하면 됩니다.",
  },
]

const basicCode = `<PxAccordion>
  <template #header="{ isOpen }">
    <button type="button" :aria-expanded="isOpen">
      자주 묻는 질문
      <span>{{ isOpen ? '−' : '+' }}</span>
    </button>
  </template>

  <template #body>
    <p>헤더를 클릭하면 이 내용이 열리고 닫힙니다.</p>
  </template>
</PxAccordion>`

const initialCode = `<PxAccordion currentState :duration="350">
  <template #header="{ isOpen }">
    <button type="button" :aria-expanded="isOpen">
      처음부터 열린 아코디언
    </button>
  </template>

  <template #body>
    currentState는 최초 상태, duration은 전환 시간(ms)입니다.
  </template>
</PxAccordion>`

const slotControlCode = `<PxAccordion>
  <template #header="{ isOpen, handleClickAcc }">
    <div>
      <strong>슬롯에서 직접 제어</strong>
      <PxButton size="xs" @click="handleClickAcc('on')">열기</PxButton>
      <PxButton size="xs" @click="handleClickAcc('off')">닫기</PxButton>
      <PxButton size="xs" @click="handleClickAcc()">
        {{ isOpen ? '접기' : '펼치기' }}
      </PxButton>
    </div>
  </template>

  <template #body="{ handleClickAcc }">
    <p>본문에서도 같은 함수를 사용할 수 있습니다.</p>
    <PxButton size="xs" @click="handleClickAcc('off')">본문 닫기</PxButton>
  </template>
</PxAccordion>`

const exposeCode = `const accordionRef = ref(null)

<div>
  <PxButton @click="accordionRef?.handleClickAcc('on')">외부에서 열기</PxButton>
  <PxButton @click="accordionRef?.handleClickAcc('off')">외부에서 닫기</PxButton>
</div>

<PxAccordion ref="accordionRef">
  <template #header="{ isOpen }">
    <button type="button" :aria-expanded="isOpen">외부 제어 예제</button>
  </template>
  <template #body>아코디언 본문</template>
</PxAccordion>`

const customClassCode = `<PxAccordion class="project-accordion" currentState>
  <template #header="{ isOpen }">
    <button type="button" :aria-expanded="isOpen">
      프로젝트 스타일
      <span>{{ isOpen ? '−' : '+' }}</span>
    </button>
  </template>
  <template #body>
    <div class="project-accordion-content">재정의된 본문입니다.</div>
  </template>
</PxAccordion>

<style>
/* Postfix UI 스타일시트 뒤에 불러옵니다. */
.project-accordion.px-accordion {
  overflow: hidden;
  border: 2px solid #4f46e5;
  border-radius: 16px;
  box-shadow: 0 14px 30px rgba(79, 70, 229, 0.24);
}

.project-accordion .px-accordion--header button {
  width: 100%;
  padding: 16px 18px;
  background: linear-gradient(135deg, #312e81, #7c3aed);
  color: #ffffff;
  font-size: 15px;
  font-weight: 800;
}

.project-accordion .project-accordion-content {
  padding: 18px;
  background-color: #eef2ff;
  color: #312e81;
  font-weight: 700;
}
</style>`

const propHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'type', label: '타입' },
  { field: 'defaultValue', label: '기본값' },
  { field: 'description', label: '설명', html: true },
]

const propRows = [
  {
    name: 'duration',
    type: 'Number | String',
    defaultValue: '200',
    description: '열림·닫힘 전환 시간(ms). 내부에서 <code>ms</code>를 붙이므로 숫자 또는 숫자 문자열 사용',
  },
  {
    name: 'currentState',
    type: 'Boolean',
    defaultValue: 'false',
    description: '마운트 시 최초 열림 상태. 이후 Prop 변경과 내부 상태는 동기화되지 않음',
  },
]

const slotHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'scope', label: '슬롯 Props', code: true },
  { field: 'description', label: '설명', html: true },
]

const slotRows = [
  {
    name: 'header',
    scope: '{ isOpen, handleClickAcc }',
    description: '클릭 가능한 헤더 콘텐츠. 직접 제어하지 않으면 헤더 전체 클릭으로 토글',
  },
  {
    name: 'body',
    scope: '{ isOpen, handleClickAcc }',
    description: '열리고 닫히는 본문 콘텐츠',
  },
]

const methodHeaders = [
  { field: 'call', label: '호출', code: true },
  { field: 'description', label: '동작' },
]

const methodRows = [
  { call: "handleClickAcc('on')", description: '본문 열기' },
  { call: "handleClickAcc('off')", description: '본문 닫기' },
  { call: 'handleClickAcc()', description: '현재 상태 반전' },
]

const classHeaders = [
  { field: 'category', label: '구분' },
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도' },
]

const classRows = [
  { category: '최상위', className: '<code>px-accordion</code>', description: '헤더와 본문 전체 영역' },
  { category: '헤더', className: '<code>px-accordion--header</code>', description: '클릭 이벤트가 연결된 header 슬롯 영역' },
  { category: '본문', className: '<code>px-accordion--body</code>', description: 'Grid 전환으로 높이가 변하는 body 슬롯 영역' },
  { category: '열림 상태', className: '<code>open</code>', description: '본문이 열린 상태에서 px-accordion--body에 추가' },
  { category: '본문 내부', className: '<code>expandable</code>', description: '실제 body 슬롯을 감싸는 내부 영역' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">LIST</p>
    <h1>PxAccordion</h1>
    <p class="docs-lead">header와 body 슬롯으로 구성하며, 내부 상태로 콘텐츠를 부드럽게 열고 닫는 아코디언입니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        header 슬롯 전체에 클릭 이벤트가 연결됩니다. 슬롯으로 받은 <code>isOpen</code>을 사용하면 아이콘과
        <code>aria-expanded</code>를 현재 상태에 맞출 수 있습니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[720px] overflow-hidden rounded-[8px] border-[1px] border-[#e2e6ed] bg-white">
          <PxAccordion v-for="(item, index) in faqItems" :key="item.question" :currentState="index === 0">
            <template #header="{ isOpen }">
              <button
                type="button"
                class="flex w-full items-center justify-between px-[18px] py-[15px] text-left text-[14px] font-bold text-[#303540]"
                :aria-expanded="isOpen"
              >
                <span>{{ item.question }}</span>
                <span class="ml-[18px] text-[18px] font-normal text-[var(--px-pri-600)]" aria-hidden="true">{{ isOpen ? '−' : '+' }}</span>
              </button>
            </template>
            <template #body>
              <p class="m-[0px] border-t-[1px] border-[#edf0f4] bg-[#fafbfc] px-[18px] py-[15px] text-[13px] leading-[1.7] text-[#69707e]">
                {{ item.answer }}
              </p>
            </template>
          </PxAccordion>
        </div>
      </div>
      <CodeBlock :code="basicCode" />
    </section>

    <section class="docs-section">
      <h2>초기 상태와 전환 시간</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        <code>currentState</code>는 최초 상태만 결정합니다. 외부 값과 계속 동기화해야 한다면 ref로 메서드를 호출하거나 슬롯 제어 함수를 사용합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[720px] rounded-[8px] border-[1px] border-[#e2e6ed] bg-white">
          <PxAccordion currentState :duration="350">
            <template #header="{ isOpen }">
              <button
                type="button"
                class="flex w-full items-center justify-between px-[18px] py-[15px] text-left text-[14px] font-bold text-[#303540]"
                :aria-expanded="isOpen"
              >
                처음부터 열린 아코디언
                <span class="text-[18px] font-normal text-[var(--px-pri-600)]">{{ isOpen ? '−' : '+' }}</span>
              </button>
            </template>
            <template #body>
              <p class="m-[0px] border-t-[1px] border-[#edf0f4] px-[18px] py-[15px] text-[13px] text-[#69707e]">
                350ms 동안 열림과 닫힘 상태가 전환됩니다.
              </p>
            </template>
          </PxAccordion>
        </div>
      </div>
      <CodeBlock :code="initialCode" />
    </section>

    <section class="docs-section">
      <h2>슬롯에서 직접 제어</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        <code>handleClickAcc</code>를 슬롯에서 한 번이라도 사용하면 헤더 전체의 자동 토글은 멈추고, 지정한 버튼으로만 상태를 제어합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[720px] rounded-[8px] border-[1px] border-[#e2e6ed] bg-white">
          <PxAccordion>
            <template #header="{ isOpen, handleClickAcc }">
              <div class="flex flex-wrap items-center justify-between gap-[12px] px-[18px] py-[14px]">
                <strong class="text-[14px] text-[#303540]">현재 상태: {{ isOpen ? '열림' : '닫힘' }}</strong>
                <div class="flex flex-wrap gap-[6px]">
                  <PxButton size="xs" color="gray_border" @click="handleClickAcc('on')">열기</PxButton>
                  <PxButton size="xs" color="gray_border" @click="handleClickAcc('off')">닫기</PxButton>
                  <PxButton size="xs" @click="handleClickAcc()">토글</PxButton>
                </div>
              </div>
            </template>
            <template #body="{ handleClickAcc }">
              <div class="border-t-[1px] border-[#edf0f4] bg-[#fafbfc] px-[18px] py-[15px]">
                <p class="m-[0px] text-[13px] leading-[1.7] text-[#69707e]">본문에서도 닫기 함수를 호출할 수 있습니다.</p>
                <PxButton class="mt-[12px]" size="xs" color="gray_border" @click="handleClickAcc('off')">본문 닫기</PxButton>
              </div>
            </template>
          </PxAccordion>
        </div>
      </div>
      <CodeBlock :code="slotControlCode" />
    </section>

    <section class="docs-section">
      <h2>외부에서 제어</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        컴포넌트 ref에서도 <code>handleClickAcc</code>가 노출됩니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[720px]">
          <div class="mb-[12px] flex flex-wrap gap-[6px]">
            <PxButton size="xs" @click="accordionRef?.handleClickAcc('on')">외부에서 열기</PxButton>
            <PxButton size="xs" color="gray_border" @click="accordionRef?.handleClickAcc('off')">외부에서 닫기</PxButton>
            <PxButton size="xs" color="gray_border" @click="accordionRef?.handleClickAcc()">외부에서 토글</PxButton>
          </div>
          <div class="rounded-[8px] border-[1px] border-[#e2e6ed] bg-white">
            <PxAccordion ref="accordionRef">
              <template #header="{ isOpen }">
                <button
                  type="button"
                  class="flex w-full items-center justify-between px-[18px] py-[15px] text-left text-[14px] font-bold text-[#303540]"
                  :aria-expanded="isOpen"
                >
                  외부 제어 예제
                  <span class="text-[18px] font-normal text-[var(--px-pri-600)]">{{ isOpen ? '−' : '+' }}</span>
                </button>
              </template>
              <template #body>
                <p class="m-[0px] border-t-[1px] border-[#edf0f4] px-[18px] py-[15px] text-[13px] text-[#69707e]">ref를 통해 열린 본문입니다.</p>
              </template>
            </PxAccordion>
          </div>
        </div>
      </div>
      <CodeBlock :code="exposeCode" />
      <DocsTable :headers="methodHeaders" :rows="methodRows" />
    </section>

    <section class="docs-section">
      <h2>Slots</h2>
      <DocsTable :headers="slotHeaders" :rows="slotRows" />
    </section>

    <section class="docs-section">
      <h2>주요 Props</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <DocsTable :headers="classHeaders" :rows="classRows" />
      <h3 class="mb-[12px] mt-[28px] text-[17px] font-bold text-[#242832]">사용자 클래스 추가</h3>
      <div class="example-preview">
        <div class="w-full max-w-[720px]">
          <PxAccordion class="project-accordion" currentState>
            <template #header="{ isOpen }">
              <button type="button" :aria-expanded="isOpen">
                프로젝트 스타일
                <span>{{ isOpen ? '−' : '+' }}</span>
              </button>
            </template>
            <template #body>
              <div class="project-accordion-content">재정의된 본문입니다.</div>
            </template>
          </PxAccordion>
        </div>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>
  </article>
</template>

<style>
.project-accordion.px-accordion {
  overflow: hidden;
  border: 2px solid #4f46e5;
  border-radius: 16px;
  box-shadow: 0 14px 30px rgba(79, 70, 229, 0.24);
}

.project-accordion .px-accordion--header button {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  border: 0;
  background: linear-gradient(135deg, #312e81, #7c3aed);
  color: #ffffff;
  font-size: 15px;
  font-weight: 800;
  text-align: left;
  cursor: pointer;
}

.project-accordion .project-accordion-content {
  padding: 18px;
  background-color: #eef2ff;
  color: #312e81;
  font-size: 13px;
  font-weight: 700;
}
</style>
