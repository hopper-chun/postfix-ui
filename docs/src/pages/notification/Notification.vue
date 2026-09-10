<script setup>
import { onBeforeUnmount } from 'vue'
import { useGlobalNoti } from '@postfix/ui'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const { setNoti, clearNoti } = useGlobalNoti()

const showNotification = () => {
  setNoti({
    title: '저장 완료',
    description: '변경한 설정을 저장했습니다.',
  })
}

onBeforeUnmount(clearNoti)

const installCode = `<script setup>
import { PxNotification } from '@postfix/ui'
<\/script>

<template>
  <RouterView />
  <!-- 앱 전체에서 하나만 유지합니다. -->
  <PxNotification :expireTime="3000" />
</template>`

const callCode = `<script setup>
import { useGlobalNoti } from '@postfix/ui'

const { setNoti } = useGlobalNoti()

const save = async () => {
  await saveData()
  setNoti({
    title: '저장 완료',
    description: '변경한 설정을 저장했습니다.',
  })
}
<\/script>`

const propHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'type', label: '타입' },
  { field: 'defaultValue', label: '기본값' },
  { field: 'description', label: '설명' },
]

const propRows = [
  {
    name: 'expireTime',
    type: 'Number',
    defaultValue: '3000',
    description: '알림이 자동으로 닫히기까지의 시간(ms)',
  },
]

const composableHeaders = [
  { field: 'name', label: '항목', code: true },
  { field: 'description', label: '설명' },
]

const composableRows = [
  { name: 'setNoti({ title, description })', description: '전역 알림 내용을 설정하고 알림을 표시' },
  { name: 'clearNoti()', description: '전역 알림 내용을 비우고 현재 알림을 닫음' },
  { name: 'noti', description: '현재 전역 알림 상태를 읽는 computed 값' },
]

const relationHeaders = [
  { field: 'component', label: '컴포넌트', code: true },
  { field: 'control', label: '상태 제어' },
  { field: 'placement', label: '권장 위치' },
]

const relationRows = [
  { component: 'PxNotification', control: 'useGlobalNoti()', placement: 'App.vue 등 앱 루트에 한 번' },
  { component: 'PxSimpleNotification', control: 'v-model', placement: '알림을 직접 제어할 화면' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">NOTIFICATION</p>
    <h1>PxNotification</h1>
    <p class="docs-lead">
      앱 어디서든 <code>useGlobalNoti()</code>로 호출할 수 있도록
      PxSimpleNotification과 전역 알림 상태를 연결하는 컴포넌트입니다.
    </p>

    <section class="docs-section">
      <h2>앱에 배치</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        페이지마다 반복하지 말고 <code>App.vue</code>처럼 라우트가 바뀌어도
        유지되는 위치에 한 번만 배치합니다.
      </p>
      <CodeBlock :code="installCode" />
    </section>

    <section class="docs-section">
      <h2>전역에서 호출</h2>
      <div class="example-preview">
        <div>
          <PxButton @click="showNotification">저장 완료 알림</PxButton>
          <p class="mb-[0px] mt-[12px] text-[13px] leading-[1.6] text-[#69707e]">
            버튼을 누르면 화면 오른쪽 위에 3초 동안 표시됩니다.
          </p>
        </div>
        <PxNotification :expireTime="3000" />
      </div>
      <CodeBlock :code="callCode" />
      <p class="docs-note">
        표시 여부는 <code>description</code> 값으로 판단합니다. 빈 문자열을
        전달하면 알림이 열리지 않으므로 실제 메시지를 넣어야 합니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>Props와 useGlobalNoti</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
      <DocsTable class="mt-[14px]" :headers="composableHeaders" :rows="composableRows" />
    </section>

    <section class="docs-section">
      <h2>PxSimpleNotification과의 차이</h2>
      <DocsTable :headers="relationHeaders" :rows="relationRows" />
      <p class="docs-note">
        PxNotification은 내부에서 PxSimpleNotification을 사용합니다. 여러 곳에서
        공통으로 알림을 띄울 때는 PxNotification, 한 화면의 로컬 상태로 직접
        제어할 때는 PxSimpleNotification을 사용합니다.
      </p>
    </section>
  </article>
</template>
