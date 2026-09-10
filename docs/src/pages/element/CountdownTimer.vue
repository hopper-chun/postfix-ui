<script setup>
import { ref } from "vue";
import CodeBlock from "../../components/CodeBlock.vue";
import DocsTable from "../../components/DocsTable.vue";

const timerRef = ref(null);

const restartTimer = () => {
  timerRef.value?.stop();
  timerRef.value?.start(15);
};

const stopTimer = () => {
  timerRef.value?.stop();
};

const basicCode = `const timerRef = ref(null)

const restartTimer = () => {
  timerRef.value?.stop()
  timerRef.value?.start(15)
}

<PxCountdownTimer ref="timerRef" />
<PxButton @click="restartTimer">15초 다시 시작</PxButton>
<PxButton @click="timerRef?.stop()">정지</PxButton>`;

const customClassCode = `<PxCountdownTimer class="project-countdown" />

<style>
.project-countdown.px-countdownTimer {
  display: inline-flex;
  min-width: 132px;
  height: 58px;
  align-items: center;
  justify-content: center;
  border: 3px solid #fb7185;
  border-radius: 16px;
  background: linear-gradient(135deg, #881337, #be123c);
  box-shadow: 0 12px 28px rgba(190, 18, 60, 0.3);
  color: #ffffff;
  font-size: 25px;
  font-weight: 900;
  letter-spacing: 0.08em;
}
</style>`;

const methodHeaders = [
  { field: "name", label: "메서드", code: true },
  { field: "argument", label: "인자", code: true },
  { field: "description", label: "설명" },
];

const methodRows = [
  { name: "start", argument: "seconds: Number", description: "지정한 초부터 1초 간격으로 카운트다운 시작" },
  { name: "stop", argument: "-", description: "현재 타이머 정지" },
];

const classHeaders = [
  { field: "category", label: "구분" },
  { field: "className", label: "클래스", html: true },
  { field: "description", label: "용도" },
];

const classRows = [{ category: "최상위", className: "<code>px-countdownTimer</code>", description: "시간 문자열 전체 영역" }];
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">ELEMENT</p>
    <h1>PxCountdownTimer</h1>
    <p class="docs-lead">남은 시간을 초 단위로 감소시키고 <code>MM:SS</code> 형식으로 표시하는 간단한 타이머입니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <div>
          <PxCountdownTimer ref="timerRef" class="project-countdown" />
          <div class="mt-[16px] flex flex-wrap gap-[8px]">
            <PxButton size="xs" @click="restartTimer">15초 다시 시작</PxButton>
            <PxButton size="xs" color="gray_border" @click="stopTimer">정지</PxButton>
          </div>
        </div>
      </div>
      <CodeBlock :code="basicCode" />
      <p class="docs-note">
        마운트되면 자동으로 180초부터 시작합니다. 실행 중 다시 시작하려면 중복 타이머를 막기 위해 <code>stop()</code>을 먼저 호출해야 합니다. 완료 이벤트는 제공하지 않습니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>노출 메서드</h2>
      <DocsTable :headers="methodHeaders" :rows="methodRows" />
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <DocsTable :headers="classHeaders" :rows="classRows" />
      <CodeBlock :code="customClassCode" />
    </section>
  </article>
</template>

<style scoped>
.project-countdown.px-countdownTimer {
  @apply inline-flex h-[58px] min-w-[132px] items-center justify-center rounded-[16px] border-[3px] border-[#fb7185] text-[25px] font-black tracking-[0.08em] text-white shadow-[0_12px_28px_rgba(190,18,60,0.3)];
  background: linear-gradient(135deg, #881337, #be123c);
}
</style>
