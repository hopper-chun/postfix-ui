<script setup>
import { ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const basicDialogRef = ref(null)
const sizeDialogRef = ref(null)
const slotDialogRef = ref(null)
const guardedDialogRef = ref(null)
const customDialogRef = ref(null)
const selectedSize = ref('sm')
const eventMessage = ref('다이얼로그를 열어보세요.')
const canClose = ref(false)

const openSizeDialog = (size) => {
  selectedSize.value = size
  sizeDialogRef.value?.open()
}

const basicCode = `const dialogRef = ref(null)

<PxButton @click="dialogRef?.open()">다이얼로그 열기</PxButton>

<PxDialog
  ref="dialogRef"
  title="회원 정보"
  size="sm"
  @onOpen="handleOpen"
  @onClose="handleClose"
>
  <template #default="{ closeDialog, isActive }">
    <div>
      <div class="px-dialog--contents">
        다이얼로그 본문 · {{ isActive ? '열림' : '닫힘' }}
      </div>
      <div class="px-dialog--buttons">
        <div>
          <PxButton isWide color="gray_border" @click="closeDialog">
            닫기
          </PxButton>
        </div>
      </div>
    </div>
  </template>
</PxDialog>`

const sizeCode = `<PxDialog ref="dialogRef" size="sm">...</PxDialog>

<!-- Select처럼 다이얼로그 영역 밖으로 펼쳐지는 요소가 있을 때 -->
<div class="select-dialog">
  <PxDialog ref="selectDialogRef" size="overflow">
    ...
  </PxDialog>
</div>

<style>
.select-dialog .px-dialog--container {
  width: 520px;
  height: 420px;
}
</style>

<!-- size 값 -->
<!-- sm | md | lg | xl | full | overflow -->`

const slotLocationCode = `<PxDialog ref="dialogRef" title="HEADER" size="md">
  <template #default="{ closeDialog, isActive }">
    <div>
      <div class="px-dialog--contents">
        DEFAULT SLOT
        <p>px-dialog--contents · 스크롤 본문</p>
        <p>isActive: {{ isActive }}</p>
      </div>

      <div class="px-dialog--buttons">
        <div>
          <PxButton isWide @click="closeDialog">BUTTONS · 닫기</PxButton>
        </div>
      </div>
    </div>
  </template>
</PxDialog>`

const closeControlCode = `const canClose = ref(false)

const checkBeforeClose = () => canClose.value

<PxDialog
  ref="dialogRef"
  title="작성 중인 내용"
  size="sm"
  :closeClickOutside="false"
  :fnBeforeClose="checkBeforeClose"
>
  <!-- fnBeforeClose가 false면 닫지 않고 기본 경고창을 표시합니다. -->
</PxDialog>`

const customClassCode = `<div class="project-dialog-theme">
  <PxDialog ref="dialogRef" title="프로젝트 다이얼로그" size="md">
    <template #default="{ closeDialog }">
      <div>
        <div class="px-dialog--contents">
          프로젝트 전용 콘텐츠
        </div>
        <div class="px-dialog--buttons">
          <div>
            <PxButton isWide color="gray_border" @click="closeDialog">취소</PxButton>
          </div>
          <div>
            <PxButton isWide @click="closeDialog">저장</PxButton>
          </div>
        </div>
      </div>
    </template>
  </PxDialog>
</div>

<style>
.project-dialog-theme .px-dialog {
  background-color: rgba(15, 23, 42, 0.72);
  backdrop-filter: blur(8px);
}

.project-dialog-theme .px-dialog--container {
  overflow: hidden;
  border: 1px solid #c4b5fd;
  border-radius: 20px;
  box-shadow: 0 28px 70px rgba(30, 41, 59, 0.36);
}

.project-dialog-theme .px-dialog--header {
  height: 76px;
  border: 0;
  background: linear-gradient(135deg, #4c1d95, #7c3aed, #db2777);
}

.project-dialog-theme .px-dialog--header .title {
  color: #ffffff;
  font-size: 21px;
  font-weight: 800;
}

.project-dialog-theme .px-dialog--body {
  background-color: #faf5ff;
}

.project-dialog-theme .px-dialog--contents {
  padding: 28px;
}
</style>`

const propHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'type', label: '타입' },
  { field: 'defaultValue', label: '기본값' },
  { field: 'description', label: '설명', html: true },
]

const propRows = [
  { name: 'header', type: 'Boolean', defaultValue: 'true', description: '내장 헤더 표시 여부' },
  { name: 'title', type: 'String', defaultValue: '-', description: '내장 헤더 제목' },
  { name: 'closeButton', type: 'Boolean', defaultValue: 'true', description: '내장 헤더의 닫기 버튼 표시 여부' },
  { name: 'closeClickOutside', type: 'Boolean', defaultValue: 'true', description: '배경을 눌렀다 놓았을 때 닫을지 여부' },
  { name: 'fnBeforeClose', type: 'Function', defaultValue: '-', description: '닫기 직전 실행. 동기적으로 <code>false</code>를 반환하면 닫지 않고 기본 alert 표시' },
  { name: 'size', type: 'String', defaultValue: '-', description: '<code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, <code>full</code>, <code>overflow</code>' },
]

const sizeHeaders = [
  { field: 'name', label: 'size', code: true },
  { field: 'dimension', label: '기본 크기' },
  { field: 'description', label: '설명' },
]

const sizeRows = [
  { name: 'sm', dimension: '400 × 300px', description: '작은 입력 및 확인 화면' },
  { name: 'md', dimension: '600 × 500px', description: '일반적인 폼 다이얼로그' },
  { name: 'lg', dimension: '900 × 800px', description: '큰 편집 화면' },
  { name: 'xl', dimension: '1200px × 화면 높이 - 50px', description: '넓은 상세 화면' },
  { name: 'full', dimension: '화면 너비·높이 - 50px', description: '전체 화면에 가까운 다이얼로그' },
  { name: 'overflow', dimension: '직접 지정 또는 콘텐츠 기준', description: '본문과 콘텐츠의 overflow 제한을 풀어 바깥으로 펼쳐지는 요소를 허용' },
]

const methodHeaders = [
  { field: 'name', label: '메서드', code: true },
  { field: 'description', label: '설명' },
]

const methodRows = [
  { name: 'open()', description: '다이얼로그를 열고 onOpen 발생' },
  { name: 'close()', description: 'fnBeforeClose 검사 후 닫고 onClose 발생' },
]

const eventHeaders = [
  { field: 'name', label: '이벤트', code: true },
  { field: 'description', label: '설명' },
]

const eventRows = [
  { name: 'onOpen', description: 'open()으로 다이얼로그가 열릴 때 발생' },
  { name: 'onClose', description: '닫기 버튼, 외부 클릭 또는 close()로 닫힐 때 발생' },
]

const slotHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'scope', label: '슬롯 Props', code: true },
  { field: 'description', label: '설명' },
]

const slotRows = [
  { name: 'default', scope: '{ closeDialog, isActive }', description: '다이얼로그 본문 전체. closeDialog는 내부 close 메서드' },
]

const classHeaders = [
  { field: 'category', label: '구분' },
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도' },
]

const classRows = [
  { category: '배경', className: '<code>px-dialog</code>', description: '화면 전체 오버레이와 size 클래스 영역' },
  { category: '창', className: '<code>px-dialog--container</code>', description: '실제 다이얼로그 박스' },
  { category: '헤더', className: '<code>px-dialog--header</code>', description: '제목과 닫기 버튼 영역' },
  { category: '제목', className: '<code>title</code>', description: '헤더 제목' },
  { category: '닫기', className: '<code>close</code>', description: '헤더 닫기 버튼' },
  { category: '본문', className: '<code>px-dialog--body</code>', description: '기본 슬롯이 삽입되는 영역' },
  { category: '스크롤 콘텐츠', className: '<code>px-dialog--contents</code>', description: '슬롯에서 선택적으로 사용하는 스크롤 본문 클래스' },
  { category: '하단 버튼', className: '<code>px-dialog--buttons</code>', description: '슬롯에서 선택적으로 사용하는 버튼 정렬 클래스' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">DIALOG</p>
    <h1>PxDialog</h1>
    <p class="docs-lead">ref로 열고 닫으며 헤더, 본문, 크기와 닫기 조건을 직접 구성하는 기본 다이얼로그입니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <div>
          <PxButton @click="basicDialogRef?.open()">다이얼로그 열기</PxButton>
          <p class="mb-[0px] mt-[12px] text-[13px] text-[#69707e]">{{ eventMessage }}</p>
        </div>
        <PxDialog
          ref="basicDialogRef"
          title="회원 정보"
          size="sm"
          @onOpen="eventMessage = 'onOpen 이벤트가 발생했습니다.'"
          @onClose="eventMessage = 'onClose 이벤트가 발생했습니다.'"
        >
          <template #default="{ closeDialog, isActive }">
            <div>
              <div class="px-dialog--contents">
                <strong class="text-[16px] text-[#242832]">김민준</strong>
                <p class="mb-[0px] mt-[8px] text-[13px] text-[#69707e]">다이얼로그 상태: {{ isActive ? '열림' : '닫힘' }}</p>
              </div>
              <div class="px-dialog--buttons">
                <div><PxButton isWide color="gray_border" @click="closeDialog">닫기</PxButton></div>
              </div>
            </div>
          </template>
        </PxDialog>
      </div>
      <CodeBlock :code="basicCode" />
      <p class="docs-note"><code>v-model</code>은 제공하지 않습니다. 컴포넌트 ref에서 노출된 <code>open()</code>과 <code>close()</code>를 호출합니다.</p>
    </section>

    <section class="docs-section">
      <h2>크기</h2>
      <div class="example-preview example-preview--row">
        <PxButton v-for="size in ['sm', 'md', 'lg', 'xl', 'full', 'overflow']" :key="size" size="xs" color="gray_border" @click="openSizeDialog(size)">
          {{ size }}
        </PxButton>
        <PxDialog ref="sizeDialogRef" :title="`size: ${selectedSize}`" :size="selectedSize">
          <template #default="{ closeDialog }">
            <div>
              <div class="px-dialog--contents">
                <p class="m-[0px] text-[14px] leading-[1.7] text-[#4e5563]">현재 <strong>{{ selectedSize }}</strong> 크기입니다.</p>
              </div>
              <div class="px-dialog--buttons">
                <div><PxButton isWide @click="closeDialog">확인</PxButton></div>
              </div>
            </div>
          </template>
        </PxDialog>
      </div>
      <CodeBlock :code="sizeCode" />
      <DocsTable :headers="sizeHeaders" :rows="sizeRows" />
      <p class="docs-note">
        <code>PxSelect</code>의 옵션 목록처럼 다이얼로그 경계를 넘어 펼쳐지는 콘텐츠가 있다면 <code>size="overflow"</code>를 사용합니다.
        일반 size의 본문과 콘텐츠에는 overflow가 적용되지만, <code>overflow</code>는 이 제한을 풀어 바깥 영역까지 표시합니다. 고정된 기본 크기가 없으므로 필요한 너비와 높이는
        <code>px-dialog--container</code> 클래스에 직접 지정할 수 있습니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>슬롯 위치와 본문 구조</h2>
      <p class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]">
        PxDialog는 기본 슬롯 내부의 구조를 예제와 동일하게 맞추는 것이 중요합니다. 최상위 <code>div</code> 안에 <code>px-dialog--contents</code>를 넣고,
        하단 버튼을 사용할 때는 <code>px-dialog--buttons</code>를 콘텐츠 안이 아닌 같은 위계의 형제 요소로 배치합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <PxButton color="sec" @click="slotDialogRef?.open()">슬롯 위치 보기</PxButton>
        <PxDialog ref="slotDialogRef" title="HEADER · title / closeButton" size="md">
          <template #default="{ closeDialog, isActive }">
            <div>
              <div class="px-dialog--contents">
                <div class="rounded-[12px] border-[1px] border-dashed border-[#8b5cf6] bg-[#faf5ff] p-[18px]">
                  <PxTag color="pri_border">DEFAULT SLOT</PxTag>
                  <p class="mb-[0px] mt-[12px] text-[14px] font-bold text-[#4c1d95]">px-dialog--contents · 스크롤 본문</p>
                  <p class="mb-[0px] mt-[6px] text-[13px] text-[#6b7280]">isActive: {{ isActive }}</p>
                </div>
              </div>
              <div class="px-dialog--buttons border-t-[1px] border-[#ede9fe] bg-white">
                <div><PxButton isWide color="gray_border" @click="closeDialog">BUTTONS · 닫기</PxButton></div>
              </div>
            </div>
          </template>
        </PxDialog>
      </div>
      <CodeBlock :code="slotLocationCode" />
      <DocsTable :headers="slotHeaders" :rows="slotRows" />
      <p class="docs-note">
        기본 CSS는 슬롯의 첫 요소인 <code>div</code>가 높이를 채우고 내부를 세로로 배치하도록 작성되어 있습니다.
        <code>px-dialog--contents</code>와 <code>px-dialog--buttons</code>의 위계가 달라지면 본문 스크롤과 하단 버튼 배치가 의도대로 동작하지 않을 수 있습니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>닫기 조건</h2>
      <div class="example-preview">
        <div>
          <PxButton @click="guardedDialogRef?.open()">닫기 조건 확인</PxButton>
          <p class="mb-[0px] mt-[12px] text-[13px] text-[#69707e]">닫기 허용: {{ canClose ? '예' : '아니오' }}</p>
        </div>
        <PxDialog
          ref="guardedDialogRef"
          title="작성 중인 내용"
          size="sm"
          :closeClickOutside="false"
          :fnBeforeClose="() => canClose"
        >
          <template #default="{ closeDialog }">
            <div>
              <div class="px-dialog--contents">
                <p class="m-[0px] text-[14px] leading-[1.7] text-[#4e5563]">허용 상태를 바꾼 뒤 닫기 버튼을 눌러보세요.</p>
              </div>
              <div class="px-dialog--buttons">
                <div><PxButton isWide color="gray_border" @click="canClose = !canClose">허용 상태 변경</PxButton></div>
                <div><PxButton isWide @click="closeDialog">닫기 시도</PxButton></div>
              </div>
            </div>
          </template>
        </PxDialog>
      </div>
      <CodeBlock :code="closeControlCode" />
      <p class="docs-note">
        바깥 클릭 닫기는 <code>closeClickOutside</code>와 주입값 <code>DIALOG_CLICK_OUTSIDE</code>가 모두 true일 때만 동작합니다. 다이얼로그 안에서 드래그를 시작해 바깥에서 놓은 경우에는 닫히지 않습니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>Props, 메서드와 Events</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
      <DocsTable class="mt-[14px]" :headers="methodHeaders" :rows="methodRows" />
      <DocsTable class="mt-[14px]" :headers="eventHeaders" :rows="eventRows" />
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <DocsTable :headers="classHeaders" :rows="classRows" />
      <div class="example-preview mt-[20px]">
        <div class="project-dialog-theme">
          <PxButton color="ter" @click="customDialogRef?.open()">커스텀 다이얼로그 열기</PxButton>
          <PxDialog ref="customDialogRef" title="프로젝트 다이얼로그" size="md">
            <template #default="{ closeDialog }">
              <div>
                <div class="px-dialog--contents">
                  <PxTag class="project-dialog-tag">CUSTOM</PxTag>
                  <h3 class="mb-[0px] mt-[18px] text-[22px] font-extrabold text-[#3b0764]">새로운 워크스페이스</h3>
                  <p class="mb-[0px] mt-[8px] text-[14px] leading-[1.7] text-[#6b5479]">프로젝트 전용 헤더와 본문 스타일을 적용한 예제입니다.</p>
                </div>
                <div class="px-dialog--buttons border-t-[1px] border-[#e9d5ff] bg-white">
                  <div><PxButton isWide color="gray_border" @click="closeDialog">취소</PxButton></div>
                  <div><PxButton isWide @click="closeDialog">저장</PxButton></div>
                </div>
              </div>
            </template>
          </PxDialog>
        </div>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>
  </article>
</template>

<style>
.project-dialog-theme .px-dialog {
  background-color: rgba(15, 23, 42, 0.72);
  backdrop-filter: blur(8px);
}

.project-dialog-theme .px-dialog--container {
  overflow: hidden;
  border: 1px solid #c4b5fd;
  border-radius: 20px;
  box-shadow: 0 28px 70px rgba(30, 41, 59, 0.36);
}

.project-dialog-theme .px-dialog--header {
  height: 76px;
  border: 0;
  background: linear-gradient(135deg, #4c1d95, #7c3aed, #db2777);
}

.project-dialog-theme .px-dialog--header .title {
  color: #ffffff;
  font-size: 21px;
  font-weight: 800;
}

.project-dialog-theme .px-dialog--header .close {
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.82);
}

.project-dialog-theme .px-dialog--body {
  background-color: #faf5ff;
}

.project-dialog-theme .px-dialog--contents {
  padding: 28px;
}

.project-dialog-theme .project-dialog-tag.px-tag {
  border: 0;
  background: linear-gradient(135deg, #7c3aed, #db2777);
  color: #ffffff;
  font-weight: 800;
}
</style>
