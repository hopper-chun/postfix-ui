<script setup>
import { ref } from "vue";
import CodeBlock from "../../components/CodeBlock.vue";
import DocsTable from "../../components/DocsTable.vue";

const teamOptions = ["개발", "디자인", "기획"];
const selectedTeam = ref("");

const categoryOptions = [
  { value: "frontend", label: "프론트엔드" },
  { value: "backend", label: "백엔드" },
  { value: "design", label: "디자인" },
  { value: "legacy", label: "레거시" },
];
const selectedCategory = ref("");

const statusOptions = [
  { value: "active", label: "사용 중" },
  { value: "paused", label: "일시 중지" },
  { value: "closed", label: "종료" },
];
const selectedStatus = ref("active");
const disabledStatus = ref("paused");

const priorityOptions = [
  { value: "urgent", label: "긴급", color: "#dc2626" },
  { value: "normal", label: "보통", color: "#2563eb" },
  { value: "low", label: "낮음", color: "#64748b" },
];
const selectedPriority = ref("");
const customValue = ref("frontend");

const optionLabel = (option) => option?.label;
const optionValue = (option) => option?.value;

const basicCode = `const teamOptions = ['개발', '디자인', '기획']
const selectedTeam = ref('')

<PxSelect
  v-model="selectedTeam"
  label="담당 팀"
  :options="teamOptions"
  defaultLabel="팀을 선택해주세요"
/>`;

const objectOptionCode = `const categoryOptions = [
  { value: 'frontend', label: '프론트엔드' },
  { value: 'backend', label: '백엔드' },
  { value: 'design', label: '디자인' },
  { value: 'legacy', label: '레거시' },
]

const selectedCategory = ref('')

<PxSelect
  v-model="selectedCategory"
  label="카테고리"
  :options="categoryOptions"
  :optionsLabel="(option) => option?.label"
  :optionsValue="(option) => option?.value"
  :disabledValue="['legacy']"
  defaultLabel="카테고리를 선택해주세요"
/>

<!-- v-model에는 선택한 객체의 value가 저장됩니다. -->`;

const stateCode = `<PxSelect
  v-model="status"
  label="공개 상태"
  labelHelper="필수"
  helperText="현재 서비스의 공개 상태입니다."
  required
  :options="statusOptions"
  :optionsLabel="(option) => option?.label"
  :optionsValue="(option) => option?.value"
  md="**공개 상태**는 사용자 화면의 노출 여부를 결정합니다."
/>

<PxSelect
  v-model="disabledStatus"
  label="변경 불가"
  :options="statusOptions"
  :optionsLabel="(option) => option?.label"
  :optionsValue="(option) => option?.value"
  disabled
/>

<PxSelect
  v-model="status"
  label="조회 모드"
  :options="statusOptions"
  :optionsLabel="(option) => option?.label"
  :optionsValue="(option) => option?.value"
  viewMode
/>

<!-- md 도움말을 사용하는 페이지에 한 번 배치합니다. -->
<PxDialogTooltip />`;

const slotCode = `<PxSelect
  v-model="priority"
  label="우선순위"
  helperText="업무의 처리 순서를 선택해주세요."
  :options="priorityOptions"
  :optionsLabel="(option) => option?.label"
  :optionsValue="(option) => option?.value"
  defaultLabel="우선순위를 선택해주세요"
>
  <template #tooltip>
    업무 영향도와 처리 기한을 기준으로 선택합니다.
  </template>

  <template #header="{ localValue }">
    <span v-if="localValue" class="priority-option">
      <span
        class="priority-option__dot"
        :style="{ backgroundColor: localValue.color }"
      ></span>
      {{ localValue.label }}
    </span>
    <span v-else>우선순위를 선택해주세요</span>
  </template>

  <template #option="{ option }">
    <span class="priority-option">
      <span
        class="priority-option__dot"
        :style="{ backgroundColor: option.color }"
      ></span>
      {{ option.label }}
    </span>
  </template>

  <template #expand>
    <PxIcon name="icon-chevron-down-bold" />
  </template>

  <template #checked>
    <PxIcon name="icon-check-circle" />
  </template>

  <template #helperIcon>
    <PxIcon name="icon-information-circle" />
  </template>
</PxSelect>`;

const customClassCode = `<PxSelect
  v-model="value"
  class="project-select"
  label="프로젝트 카테고리"
  :options="categoryOptions"
  :optionsLabel="(option) => option?.label"
  :optionsValue="(option) => option?.value"
/>

<style>
.px-select.project-select .px-input--field {
  height: 48px;
  padding-right: 40px;
  padding-left: 18px;
  border: 2px solid #059669;
  border-radius: 12px;
  background-color: #ecfdf5;
  box-shadow: 0 8px 20px rgba(5, 150, 105, 0.18);
  color: #064e3b;
  font-size: 15px;
}

.px-select.project-select .px-select--options {
  margin-top: 6px;
  border: 2px solid #059669;
  border-radius: 12px;
  box-shadow: 0 12px 28px rgba(5, 150, 105, 0.22);
}

.px-select.project-select .px-select--optionList {
  padding: 10px 18px;
}

.px-select.project-select .px-select--optionList:hover {
  background-color: #d1fae5;
  color: #065f46;
}
</style>`;

const slotHeaders = [
  { field: "name", label: "이름", code: true },
  { field: "payload", label: "전달값", code: true },
  { field: "description", label: "설명" },
];

const slotRows = [
  {
    name: "header",
    payload: "{ localValue }",
    description: "선택창에 표시되는 현재 선택값",
  },
  {
    name: "option",
    payload: "{ option }",
    description: "목록의 각 옵션 콘텐츠",
  },
  { name: "expand", payload: "-", description: "선택창 오른쪽의 펼침 아이콘" },
  {
    name: "checked",
    payload: "-",
    description: "선택된 옵션 오른쪽의 체크 아이콘",
  },
  {
    name: "tooltip",
    payload: "-",
    description: "라벨의 도움말 아이콘에 표시할 콘텐츠",
  },
  {
    name: "helperIcon",
    payload: "-",
    description: "선택창 아래 보조 문구 앞에 표시할 아이콘",
  },
];

const propHeaders = [
  { field: "name", label: "이름", code: true },
  { field: "type", label: "타입" },
  { field: "defaultValue", label: "기본값" },
  { field: "description", label: "설명", html: true },
];

const propRows = [
  {
    name: "label",
    type: "String",
    defaultValue: "-",
    description: "선택창 위에 표시할 라벨",
  },
  {
    name: "id",
    type: "String",
    defaultValue: "-",
    description: "선택 요소와 에러를 식별하는 ID",
  },
  {
    name: "modelValue",
    type: "String | Number | Object",
    defaultValue: "-",
    description: "<code>v-model</code>로 연결되는 선택값",
  },
  {
    name: "options",
    type: "Array",
    defaultValue: "-",
    description: "선택 가능한 옵션 배열",
  },
  {
    name: "optionsLabel",
    type: "Function",
    defaultValue: "option => option",
    description: "옵션에서 화면에 표시할 값을 반환",
  },
  {
    name: "optionsValue",
    type: "Function",
    defaultValue: "option => option",
    description: "옵션에서 <code>v-model</code>에 저장할 값을 반환",
  },
  {
    name: "defaultLabel",
    type: "String",
    defaultValue: "카테고리를 선택해주세요",
    description: "선택값이 없을 때 표시할 문구",
  },
  {
    name: "disabled",
    type: "Boolean",
    defaultValue: "false",
    description: "선택창 전체 비활성화",
  },
  {
    name: "disabledValue",
    type: "Array",
    defaultValue: "-",
    description: "목록에서 선택할 수 없게 만들 값의 배열",
  },
  {
    name: "labelHelper",
    type: "String",
    defaultValue: "-",
    description: "라벨 옆 보조 문구",
  },
  {
    name: "helperText",
    type: "String",
    defaultValue: "-",
    description: "선택창 아래 보조 문구",
  },
  {
    name: "required",
    type: "Boolean",
    defaultValue: "false",
    description: "라벨에 필수 표시",
  },
  {
    name: "viewMode",
    type: "Boolean",
    defaultValue: "false",
    description: "선택창 대신 조회용 텍스트로 표시",
  },
  {
    name: "hover",
    type: "Boolean",
    defaultValue: "true",
    description: "라벨 툴팁의 hover 동작 여부",
  },
  {
    name: "md",
    type: "String",
    defaultValue: "-",
    description: "라벨 툴팁 다이얼로그에 표시할 콘텐츠",
  },
];

const eventHeaders = [
  { field: "name", label: "이름", code: true },
  { field: "payload", label: "전달값", code: true },
  { field: "description", label: "설명", html: true },
];

const eventRows = [
  {
    name: "update:modelValue",
    payload: "optionsValue(option)",
    description: "옵션을 선택할 때 발생하며 <code>v-model</code>에 사용됩니다.",
  },
  {
    name: "onClickTooltip",
    payload: "String",
    description:
      "<code>tooltip</code> 슬롯의 도움말 아이콘을 누를 때 발생합니다.",
  },
];

const classHeaders = [
  { field: "category", label: "구분" },
  { field: "className", label: "클래스", html: true },
  { field: "description", label: "용도", html: true },
];

const classRows = [
  {
    category: "최상위",
    className: "<code>px-select</code>",
    description: "전체 Select 컴포넌트",
  },
  {
    category: "편집 영역",
    className:
      "<code>px-select--edit</code>, <code>px-select--wrapper</code>, <code>px-select--input_wrapper</code>",
    description: "라벨과 선택 영역 전체",
  },
  {
    category: "선택창",
    className:
      "<code>px-input--field</code>, <code>px-select--header</code>, <code>placeholder</code>, <code>px-select--expand</code>",
    description: "현재 선택값과 펼침 버튼",
  },
  {
    category: "옵션 목록",
    className:
      "<code>px-select--options</code>, <code>px-select--optionList</code>, <code>px-select--checked</code>",
    description: "펼쳐진 목록과 각 옵션",
  },
  {
    category: "옵션 상태",
    className:
      "<code>selected</code>, <code>selectDisabled</code>, <code>reverse</code>",
    description: "선택됨, 선택 불가, 위쪽으로 펼쳐진 상태",
  },
  {
    category: "조회 모드",
    className:
      "<code>px-select--view</code>, <code>px-input--view_text</code>, <code>viewMode</code>",
    description: "<code>viewMode</code> 표시 영역",
  },
  {
    category: "보조 문구",
    className:
      "<code>px-helperText</code>, <code>px-helperText--icon</code>, <code>px-helperText--text</code>",
    description: "설명과 에러 표시",
  },
];
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">FORM</p>
    <h1>PxSelect</h1>
    <p class="docs-lead">
      문자열 또는 객체 옵션을 표시하고 선택한 값을 <code>v-model</code>로
      전달하는 셀렉트 컴포넌트입니다.
    </p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <p
        class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]"
      >
        문자열 배열은 별도의 매핑 함수 없이 바로 사용할 수 있습니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[480px]">
          <PxSelect
            v-model="selectedTeam"
            label="담당 팀"
            :options="teamOptions"
            defaultLabel="팀을 선택해주세요"
          />
        </div>
      </div>
      <CodeBlock :code="basicCode" />
    </section>

    <section class="docs-section">
      <h2>객체 옵션과 값 매핑</h2>
      <p
        class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]"
      >
        객체 배열에서는 <code>optionsLabel</code>로 화면에 표시할 값을,
        <code>optionsValue</code>로 <code>v-model</code>에 저장할 값을
        지정합니다. <code>disabledValue</code>에는 선택하지 못하게 할 값을
        배열로 전달합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[480px]">
          <PxSelect
            v-model="selectedCategory"
            label="카테고리"
            :options="categoryOptions"
            :optionsLabel="optionLabel"
            :optionsValue="optionValue"
            :disabledValue="['legacy']"
            defaultLabel="카테고리를 선택해주세요"
          />
          <p class="mb-[0px] mt-[12px] text-[13px] text-[#69707e]">
            현재 v-model: <code>{{ selectedCategory || "선택 전" }}</code>
          </p>
        </div>
      </div>
      <CodeBlock :code="objectOptionCode" />
    </section>

    <section class="docs-section">
      <h2>상태와 보조 정보</h2>
      <div class="example-preview">
        <div
          class="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[24px]"
        >
          <PxSelect
            v-model="selectedStatus"
            label="공개 상태"
            labelHelper="필수"
            helperText="현재 서비스의 공개 상태입니다."
            required
            :options="statusOptions"
            :optionsLabel="optionLabel"
            :optionsValue="optionValue"
            md="**공개 상태**는 사용자 화면의 노출 여부를 결정합니다."
          />
          <PxSelect
            v-model="disabledStatus"
            label="변경 불가"
            :options="statusOptions"
            :optionsLabel="optionLabel"
            :optionsValue="optionValue"
            disabled
          />
          <PxSelect
            v-model="selectedStatus"
            label="조회 모드"
            :options="statusOptions"
            :optionsLabel="optionLabel"
            :optionsValue="optionValue"
            viewMode
          />
        </div>
      </div>
      <CodeBlock :code="stateCode" />
    </section>

    <section class="docs-section">
      <h2>Slots</h2>
      <DocsTable :headers="slotHeaders" :rows="slotRows" />

      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[480px]">
          <PxSelect
            v-model="selectedPriority"
            label="우선순위"
            helperText="업무의 처리 순서를 선택해주세요."
            :options="priorityOptions"
            :optionsLabel="optionLabel"
            :optionsValue="optionValue"
            defaultLabel="우선순위를 선택해주세요"
          >
            <template #tooltip>
              업무 영향도와 처리 기한을 기준으로 선택합니다.
            </template>

            <template #header="{ localValue }">
              <span v-if="localValue" class="flex items-center gap-[8px]">
                <span
                  class="h-[8px] w-[8px] shrink-0 rounded-[4px]"
                  :style="{ backgroundColor: localValue.color }"
                ></span>
                {{ localValue.label }}
              </span>
              <span v-else class="text-[#a1a1aa]">
                우선순위를 선택해주세요
              </span>
            </template>

            <template #option="{ option }">
              <span class="flex items-center gap-[8px]">
                <span
                  class="h-[8px] w-[8px] shrink-0 rounded-[4px]"
                  :style="{ backgroundColor: option.color }"
                ></span>
                {{ option.label }}
              </span>
            </template>

            <template #expand>
              <PxIcon
                name="icon-chevron-down-bold"
                class="h-[16px] w-[16px] text-[#69707e] [&_svg]:h-[16px] [&_svg]:w-[16px]"
              />
            </template>

            <template #checked>
              <PxIcon
                name="icon-check-circle"
                class="h-[18px] w-[18px] [&_svg]:h-[18px] [&_svg]:w-[18px]"
              />
            </template>

            <template #helperIcon>
              <PxIcon
                name="icon-information-circle"
                class="h-[15px] w-[15px] text-[#69707e] [&_svg]:h-[15px] [&_svg]:w-[15px]"
              />
            </template>
          </PxSelect>
        </div>
      </div>
      <CodeBlock :code="slotCode" />
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
      <h2>Class로 스타일 재정의</h2>
      <p
        class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]"
      >
        <code>PxSelect</code>에 사용자 클래스를 추가하고 공개된 내부 클래스와
        조합해 선택창과 옵션 목록의 스타일을 재정의할 수 있습니다.
      </p>

      <DocsTable class="mt-[20px]" :headers="classHeaders" :rows="classRows" />

      <h3 class="mb-[12px] mt-[28px] text-[17px] font-bold text-[#242832]">
        사용자 클래스 추가
      </h3>
      <div class="example-preview">
        <div class="w-full max-w-[480px]">
          <PxSelect
            v-model="customValue"
            class="project-select"
            label="프로젝트 카테고리"
            :options="categoryOptions"
            :optionsLabel="optionLabel"
            :optionsValue="optionValue"
          />
        </div>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>

    <PxDialogTooltip />
  </article>
</template>

<style>
.px-select.project-select .px-input--field {
  @apply h-[48px] rounded-[12px] border-[2px] border-[#059669] bg-[#ecfdf5] pl-[18px] pr-[40px] text-[15px] text-[#064e3b] shadow-[0_8px_20px_rgba(5,150,105,0.18)];
}

.px-select.project-select .px-select--options {
  @apply mt-[6px] rounded-[12px] border-[2px] border-[#059669] shadow-[0_12px_28px_rgba(5,150,105,0.22)];
}

.px-select.project-select .px-select--optionList {
  @apply px-[18px] py-[10px];
}

.px-select.project-select .px-select--optionList:hover {
  @apply bg-[#d1fae5] text-[#065f46];
}
</style>
