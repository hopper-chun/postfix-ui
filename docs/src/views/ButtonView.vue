<script setup>
import { ref } from 'vue'
import CodeBlock from '../components/CodeBlock.vue'

const count = ref(0)
const exampleCode = `<PxButton color="pri" @click="count += 1">
  클릭 {{ count }}
</PxButton>`
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">COMPONENTS</p>
    <h1>Button</h1>
    <p class="docs-lead">사용자의 주요 동작을 실행하는 기본 버튼입니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <PxButton color="pri" @click="count += 1">클릭 {{ count }}</PxButton>
      </div>
      <CodeBlock :code="exampleCode" />
    </section>

    <section class="docs-section">
      <h2>색상</h2>
      <div class="example-preview example-preview--row">
        <PxButton color="pri">Primary</PxButton>
        <PxButton color="sec">Secondary</PxButton>
        <PxButton color="ter">Tertiary</PxButton>
        <PxButton color="black">Black</PxButton>
      </div>
    </section>

    <section class="docs-section">
      <h2>주요 Props</h2>
      <div class="docs-table-wrap">
        <table class="docs-table">
          <thead>
            <tr><th>이름</th><th>타입</th><th>기본값</th><th>설명</th></tr>
          </thead>
          <tbody>
            <tr><td>color</td><td>String</td><td>pri</td><td>버튼 색상</td></tr>
            <tr><td>size</td><td>String</td><td>md</td><td>xs, sm, md, lg, xl</td></tr>
            <tr><td>disabled</td><td>Boolean</td><td>false</td><td>버튼 비활성화</td></tr>
            <tr><td>isWide</td><td>Boolean</td><td>false</td><td>부모 너비에 맞춤</td></tr>
            <tr><td>isDoing</td><td>Boolean</td><td>false</td><td>처리 중 상태 표시</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </article>
</template>
