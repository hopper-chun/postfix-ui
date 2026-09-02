<script setup>
import CodeBlock from '../components/CodeBlock.vue'

const installCode = `yarn add @postfix/ui axios`

const setupCode = `import { createApp } from 'vue'
import axios from 'axios'
import * as PostfixUI from '@postfix/ui'
import '@postfix/ui/dist/style.css'
import App from './App.vue'

const app = createApp(App)
const httpClient = axios.create({ baseURL: '/api' })

app.use(PostfixUI, httpClient)
app.mount('#app')`
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">GUIDE</p>
    <h1>시작하기</h1>
    <p class="docs-lead">현재 배포 API를 기준으로 Postfix UI를 프로젝트에 연결합니다.</p>

    <section class="docs-section">
      <h2>1. 패키지 설치</h2>
      <CodeBlock :code="installCode" />
    </section>

    <section class="docs-section">
      <h2>2. 애플리케이션에 등록</h2>
      <CodeBlock :code="setupCode" />
      <div class="docs-note">
        현재 버전은 설치 시 HTTP 클라이언트를 요구합니다. 이 제약이 변경되면 가이드도 함께 수정합니다.
      </div>
    </section>
  </article>
</template>
