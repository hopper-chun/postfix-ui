<script setup>
import { ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const currentPage = ref(4)
const customPage = ref(7)

const basicCode = `const currentPage = ref(1)

<PxPagination
  :limit="10"
  :total="187"
  :currentPage="currentPage"
  @onChangePage="currentPage = $event"
/>`

const customClassCode = `<PxPagination
  class="project-pagination"
  :limit="10"
  :total="240"
  :currentPage="currentPage"
  @onChangePage="currentPage = $event"
/>

<style>
.project-pagination .px-pagination--nav {
  border: 2px solid #7c3aed;
  background-color: #f5f3ff;
}

.project-pagination .px-pagination--range .page {
  min-width: 32px;
  height: 32px;
  border-radius: 8px;
  color: #6d28d9;
  font-weight: 700;
}

.project-pagination .px-pagination--range .page.current {
  border-color: #7c3aed;
  background: linear-gradient(135deg, #7c3aed, #db2777);
  box-shadow: 0 8px 18px rgba(124, 58, 237, 0.28);
  color: #ffffff;
}
</style>`

const propHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'type', label: '타입' },
  { field: 'defaultValue', label: '기본값' },
  { field: 'description', label: '설명', html: true },
]

const propRows = [
  { name: 'limit', type: 'Number', defaultValue: '-', description: '한 페이지에 표시할 항목 수. 필수값' },
  { name: 'total', type: 'Number', defaultValue: '-', description: '전체 항목 수. 필수값' },
  { name: 'currentPage', type: 'Number', defaultValue: '-', description: '현재 페이지 번호. 필수값' },
  { name: 'isNarrow', type: 'Boolean', defaultValue: 'true', description: '좁은 화면용 클래스 적용 여부' },
  { name: 'align', type: 'String', defaultValue: '-', description: '현재 컴포넌트 내부에서는 사용하지 않는 호환용 Prop' },
]

const eventHeaders = [
  { field: 'name', label: '이벤트', code: true },
  { field: 'payload', label: '전달값', code: true },
  { field: 'description', label: '설명' },
]

const eventRows = [
  { name: 'onChangePage', payload: 'page: Number', description: '페이지 번호나 이전·다음 버튼을 눌렀을 때 이동할 페이지 전달' },
]

const classHeaders = [
  { field: 'category', label: '구분' },
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도' },
]

const classRows = [
  { category: '최상위', className: '<code>px-pagination</code>', description: '페이지네이션 전체 영역' },
  { category: '이동 버튼', className: '<code>px-pagination--nav</code>', description: '이전·다음 버튼' },
  { category: '이동 방향', className: '<code>prev</code> / <code>next</code>', description: '이전 또는 다음 버튼 구분' },
  { category: '이동 가능', className: '<code>active</code>', description: '실제로 이동할 수 있는 이전·다음 버튼' },
  { category: '번호 영역', className: '<code>px-pagination--range</code>', description: '페이지 번호와 줄임표 영역' },
  { category: '페이지 번호', className: '<code>page</code>', description: '클릭 가능한 개별 페이지 번호' },
  { category: '현재 페이지', className: '<code>current</code>', description: '현재 선택된 페이지 번호' },
  { category: '줄임표', className: '<code>reduce</code>', description: '생략된 페이지를 표시하는 줄임표' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">LIST</p>
    <h1>PxPagination</h1>
    <p class="docs-lead">전체 항목 수를 기준으로 페이지 번호를 계산하고 이전·다음 이동을 제공하는 페이지네이션입니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        컴포넌트가 현재 페이지를 직접 변경하지 않습니다. <code>onChangePage</code>로 받은 값을 상태에 반영해야 합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div>
          <p class="m-[0px] text-[13px] font-bold text-[#343a46]">현재 {{ currentPage }}페이지</p>
          <PxPagination
            :limit="10"
            :total="187"
            :currentPage="currentPage"
            @onChangePage="currentPage = $event"
          />
        </div>
      </div>
      <CodeBlock :code="basicCode" />
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        번호, 현재 페이지, 이전·다음 버튼 클래스를 조합해 프로젝트의 페이지네이션 스타일을 만들 수 있습니다.
      </p>
      <div class="example-preview mt-[20px]">
        <PxPagination
          class="project-pagination"
          :limit="10"
          :total="240"
          :currentPage="customPage"
          @onChangePage="customPage = $event"
        />
      </div>
      <CodeBlock :code="customClassCode" />
    </section>

    <section class="docs-section">
      <h2>주요 Props</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
    </section>

    <section class="docs-section">
      <h2>Events</h2>
      <DocsTable :headers="eventHeaders" :rows="eventRows" />
    </section>

    <section class="docs-section">
      <h2>Classes</h2>
      <DocsTable :headers="classHeaders" :rows="classRows" />
    </section>
  </article>
</template>

<style scoped>
.project-pagination .px-pagination--nav {
  @apply border-[2px] border-[#7c3aed] bg-[#f5f3ff];
}

.project-pagination .px-pagination--range .page {
  @apply h-[32px] min-w-[32px] rounded-[8px] font-bold text-[#6d28d9];
}

.project-pagination .px-pagination--range .page.current {
  @apply border-[#7c3aed] text-white shadow-[0_8px_18px_rgba(124,58,237,0.28)];
  background: linear-gradient(135deg, #7c3aed, #db2777);
}
</style>
