<script setup>
import { ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const show = ref(false)
const expireTime = ref(3000)
const showCustom = ref(false)

const openNotification = (time) => {
  expireTime.value = time
  show.value = false
  requestAnimationFrame(() => {
    show.value = true
  })
}

const basicCode = `<script setup>
import { ref } from 'vue'

const show = ref(false)
<\/script>

<template>
  <PxButton @click="show = true">알림 열기</PxButton>

  <PxSimpleNotification
    v-model="show"
    title="저장 완료"
    desc="변경한 내용을 저장했습니다."
    :expireTime="3000"
  />
</template>`

const persistentCode = `<PxButton @click="show = false">현재 알림 닫기</PxButton>

<PxSimpleNotification
  v-model="show"
  title="확인이 필요합니다"
  desc="expireTime이 0이면 자동으로 닫히지 않습니다."
  :expireTime="0"
/>`

const customClassCode = `<PxSimpleNotification
  v-model="show"
  class="project-notification"
  title="배포 준비 완료"
  desc="검토 후 운영 환경에 반영할 수 있습니다."
  :expireTime="5000"
/>

<style>
.project-notification .px-simpleNotification--wrapper {
  pointer-events: auto;
  max-width: 420px;
  padding: 20px;
  border: 2px solid #67e8f9;
  border-radius: 14px;
  background: linear-gradient(135deg, #083344, #164e63);
  box-shadow: 0 20px 46px rgba(8, 51, 68, 0.32);
}

.project-notification .px-simpleNotification--title {
  color: #ecfeff;
  font-size: 15px;
  font-weight: 800;
}

.project-notification .px-simpleNotification--desc {
  color: #a5f3fc;
}

.project-notification .px-simpleNotification--close {
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.9);
}
</style>`

const propHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'type', label: '타입' },
  { field: 'defaultValue', label: '기본값' },
  { field: 'description', label: '설명', html: true },
]

const propRows = [
  { name: 'modelValue', type: 'Boolean', defaultValue: '필수', description: '알림 표시 요청 상태. <code>v-model</code>로 연결' },
  { name: 'expireTime', type: 'String | Number', defaultValue: '0', description: '자동으로 닫히기까지의 시간(ms). <code>0</code>이면 자동 종료하지 않음' },
  { name: 'title', type: 'String', defaultValue: '-', description: '알림 제목' },
  { name: 'desc', type: 'String', defaultValue: '-', description: '알림 설명' },
]

const eventHeaders = [
  { field: 'name', label: '이벤트', code: true },
  { field: 'description', label: '설명' },
]

const eventRows = [
  { name: 'update:modelValue', description: '자동 종료되거나 내부 상태가 닫힐 때 false 전달' },
]

const classHeaders = [
  { field: 'category', label: '구분' },
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도' },
]

const classRows = [
  { category: '최상위', className: '<code>px-simpleNotification</code>', description: '화면 전체에 고정되는 알림 레이어' },
  { category: '정렬', className: '<code>px-simpleNotification--container</code>', description: '알림 카드의 데스크톱·모바일 정렬 영역' },
  { category: '알림 카드', className: '<code>px-simpleNotification--wrapper</code>', description: '아이콘, 텍스트와 닫기 아이콘을 감싸는 실제 카드' },
  { category: '상태 아이콘', className: '<code>px-simpleNotification--icon</code>', description: '왼쪽 체크 아이콘' },
  { category: '텍스트', className: '<code>px-simpleNotification--text</code>', description: '제목과 설명 묶음' },
  { category: '제목', className: '<code>px-simpleNotification--title</code>', description: '알림 제목' },
  { category: '설명', className: '<code>px-simpleNotification--desc</code>', description: '알림 설명' },
  { category: '닫기', className: '<code>px-simpleNotification--close</code>', description: '오른쪽 닫기 아이콘' },
  { category: '전환', className: '<code>transition_enter_*</code>, <code>transition_leave_*</code>', description: '표시·종료 애니메이션' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">NOTIFICATION</p>
    <h1>PxSimpleNotification</h1>
    <p class="docs-lead">
      화면의 로컬 상태와 <code>v-model</code>로 직접 연결하여 제목과 설명을
      표시하는 알림 컴포넌트입니다.
    </p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview example-preview--row">
        <PxButton @click="openNotification(3000)">3초 알림 열기</PxButton>
        <PxButton color="gray_border" @click="openNotification(0)">자동 종료 없이 열기</PxButton>
        <PxButton color="gray_border" @click="show = false">현재 알림 닫기</PxButton>
        <PxSimpleNotification
          v-model="show"
          title="저장 완료"
          :desc="expireTime ? '3초 후 자동으로 닫힙니다.' : '외부에서 v-model을 false로 바꿀 때까지 유지됩니다.'"
          :expireTime="expireTime"
        />
      </div>
      <CodeBlock :code="basicCode" />
      <CodeBlock :code="persistentCode" />
      <p class="docs-note">
        내부 상태는 <code>modelValue</code>가 false에서 true로 바뀔 때 열립니다.
        처음부터 true로 마운트하기보다 false로 시작한 뒤 필요한 시점에 true로
        변경하세요.
      </p>
    </section>

    <section class="docs-section">
      <h2>Props와 Events</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
      <DocsTable class="mt-[14px]" :headers="eventHeaders" :rows="eventRows" />
      <p class="docs-note">
        현재 기본 스타일은 알림 카드에 <code>pointer-events: none</code>이 적용되어
        닫기 아이콘 클릭이 전달되지 않습니다. 기본 사용에서는
        <code>expireTime</code> 또는 외부 <code>v-model</code>로 닫고, 아이콘 클릭이
        필요하면 wrapper의 pointer-events를 재정의하세요.
      </p>
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <DocsTable :headers="classHeaders" :rows="classRows" />
      <div class="example-preview mt-[20px]">
        <PxButton color="ter" @click="showCustom = true">커스텀 알림 열기</PxButton>
        <PxSimpleNotification
          v-model="showCustom"
          class="project-notification"
          title="배포 준비 완료"
          desc="검토 후 운영 환경에 반영할 수 있습니다."
          :expireTime="5000"
        />
      </div>
      <CodeBlock :code="customClassCode" />
    </section>
  </article>
</template>

<style>
.project-notification .px-simpleNotification--wrapper {
  pointer-events: auto;
  max-width: 420px;
  padding: 20px;
  border: 2px solid #67e8f9;
  border-radius: 14px;
  background: linear-gradient(135deg, #083344, #164e63);
  box-shadow: 0 20px 46px rgba(8, 51, 68, 0.32);
}

.project-notification .px-simpleNotification--title {
  color: #ecfeff;
  font-size: 15px;
  font-weight: 800;
}

.project-notification .px-simpleNotification--desc {
  color: #a5f3fc;
}

.project-notification .px-simpleNotification--close {
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
