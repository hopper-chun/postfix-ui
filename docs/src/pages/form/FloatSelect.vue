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
];
const selectedCategory = ref("");
const disabledCategory = ref("backend");

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

<PxFloatSelect
  v-model="selectedTeam"
  label="담당 팀"
  :options="teamOptions"
>
  <template #checked>
    <PxIcon name="icon-check" />
  </template>
</PxFloatSelect>`;

const objectOptionCode = `const categoryOptions = [
  { value: 'frontend', label: '프론트엔드' },
  { value: 'backend', label: '백엔드' },
  { value: 'design', label: '디자인' },
]

const selectedCategory = ref('')

<PxFloatSelect
  v-model="selectedCategory"
  label="카테고리"
  :options="categoryOptions"
  :optionsLabel="(option) => option?.label"
  :optionsValue="(option) => option?.value"
>
  <template #checked>
    <PxIcon name="icon-check" />
  </template>
</PxFloatSelect>

<!-- v-model에는 선택한 객체의 value가 저장됩니다. -->`;

const stateCode = `<PxFloatSelect
  v-model="category"
  label="카테고리"
  helperText="서비스를 분류할 카테고리입니다."
  required
  :options="categoryOptions"
  :optionsLabel="(option) => option?.label"
  :optionsValue="(option) => option?.value"
>
  <template #checked>
    <PxIcon name="icon-check" />
  </template>
</PxFloatSelect>

<PxFloatSelect
  v-model="disabledCategory"
  label="변경 불가"
  disabled
  :options="categoryOptions"
  :optionsLabel="(option) => option?.label"
  :optionsValue="(option) => option?.value"
/>`;

const slotCode = `<PxFloatSelect
  v-model="priority"
  label="우선순위"
  helperText="업무의 처리 순서를 선택해주세요."
  :options="priorityOptions"
  :optionsLabel="(option) => option?.label"
  :optionsValue="(option) => option?.value"
>
  <template #header="{ localValue }">
    <span v-if="localValue" class="priority-option">
      <span
        class="priority-option__dot"
        :style="{ backgroundColor: localValue.color }"
      ></span>
      {{ localValue.label }}
    </span>
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
</PxFloatSelect>`;

const customClassCode = `<PxFloatSelect
  v-model="value"
  class="project-float-select"
  label="프로젝트 카테고리"
  :options="categoryOptions"
  :optionsLabel="(option) => option?.label"
  :optionsValue="(option) => option?.value"
>
  <template #checked>
    <PxIcon name="icon-check" />
  </template>
</PxFloatSelect>

<style>
.px-floatSelect.project-float-select .px-input--field {
  height: 56px;
  padding-right: 40px;
  padding-left: 18px;
  border: 2px solid #d97706;
  border-radius: 12px;
  background-color: #fffbeb;
  box-shadow: 0 8px 20px rgba(217, 119, 6, 0.2);
  color: #78350f;
  font-size: 15px;
}

.px-floatSelect.project-float-select .px-select--header {
  padding-top: 16px;
}

.px-floatSelect.project-float-select .px-floatSelect--label {
  padding-right: 18px;
  padding-left: 18px;
  color: #b45309;
  font-weight: 700;
}

.px-floatSelect.project-float-select .px-floatSelect--label.isFloating {
  transform: translateY(-12px);
}

.px-floatSelect.project-float-select .px-select--options {
  margin-top: 6px;
  border: 2px solid #d97706;
  border-radius: 12px;
  box-shadow: 0 12px 28px rgba(217, 119, 6, 0.22);
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
    description: "선택창 내부의 플로팅 라벨",
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
    name: "disabled",
    type: "Boolean",
    defaultValue: "false",
    description: "선택창 비활성화",
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
    description:
      "필수 입력 여부. 현재 기본 템플릿에서는 별도 표시를 렌더링하지 않습니다.",
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
];

const classHeaders = [
  { field: "category", label: "구분" },
  { field: "className", label: "클래스", html: true },
  { field: "description", label: "용도" },
];

const classRows = [
  {
    category: "최상위",
    className: "<code>px-floatSelect</code>",
    description: "전체 Float Select 컴포넌트",
  },
  {
    category: "선택창",
    className: "<code>px-input--field</code>, <code>px-select--header</code>",
    description: "현재 선택값 표시 영역",
  },
  {
    category: "플로팅 라벨",
    className: "<code>px-floatSelect--label</code>, <code>isFloating</code>",
    description: "라벨과 라벨이 위로 이동한 상태",
  },
  {
    category: "펼침 아이콘",
    className: "<code>px-select--expand</code>",
    description: "선택창 오른쪽 아이콘",
  },
  {
    category: "옵션 목록",
    className:
      "<code>px-select--options</code>, <code>px-select--optionList</code>, <code>px-select--checked</code>",
    description: "펼쳐진 목록과 각 옵션",
  },
  {
    category: "옵션 상태",
    className: "<code>selected</code>",
    description: "현재 선택된 옵션",
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
    <h1>PxFloatSelect</h1>
    <p class="docs-lead">
      선택창을 열거나 값이 선택되면 라벨이 위로 이동하는 셀렉트 컴포넌트입니다.
    </p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <p
        class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]"
      >
        선택값이 없는 동안에는 플로팅 라벨이 안내 문구 역할을 합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[480px]">
          <PxFloatSelect
            v-model="selectedTeam"
            label="담당 팀"
            :options="teamOptions"
          >
            <template #checked>
              <PxIcon
                name="icon-check"
                class="h-[18px] w-[18px] [&_svg]:h-[18px] [&_svg]:w-[18px]"
              />
            </template>
          </PxFloatSelect>
        </div>
      </div>
      <CodeBlock :code="basicCode" />
    </section>

    <section class="docs-section">
      <h2>객체 옵션과 값 매핑</h2>
      <p
        class="m-[0px] max-w-[760px] text-[14px] leading-[1.75] text-[#69707e]"
      >
        객체 옵션에서는 <code>optionsLabel</code>과 <code>optionsValue</code>를
        지정합니다. 선택 전에는 빈 값도 함수에 전달되므로 optional chaining을
        사용하는 것이 안전합니다.
      </p>
      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[480px]">
          <PxFloatSelect
            v-model="selectedCategory"
            label="카테고리"
            :options="categoryOptions"
            :optionsLabel="optionLabel"
            :optionsValue="optionValue"
          >
            <template #checked>
              <PxIcon
                name="icon-check"
                class="h-[18px] w-[18px] [&_svg]:h-[18px] [&_svg]:w-[18px]"
              />
            </template>
          </PxFloatSelect>
          <p class="mb-[0px] mt-[12px] text-[13px] text-[#69707e]">
            현재 v-model: <code>{{ selectedCategory || "선택 전" }}</code>
          </p>
        </div>
      </div>
      <CodeBlock :code="objectOptionCode" />
    </section>

    <section class="docs-section">
      <h2>상태와 보조 문구</h2>
      <div class="example-preview">
        <div
          class="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[24px]"
        >
          <PxFloatSelect
            v-model="selectedCategory"
            label="카테고리"
            helperText="서비스를 분류할 카테고리입니다."
            required
            :options="categoryOptions"
            :optionsLabel="optionLabel"
            :optionsValue="optionValue"
          >
            <template #checked>
              <PxIcon
                name="icon-check"
                class="h-[18px] w-[18px] [&_svg]:h-[18px] [&_svg]:w-[18px]"
              />
            </template>
          </PxFloatSelect>
          <PxFloatSelect
            v-model="disabledCategory"
            label="변경 불가"
            disabled
            :options="categoryOptions"
            :optionsLabel="optionLabel"
            :optionsValue="optionValue"
          />
        </div>
      </div>
      <p class="docs-note">
        <code>required</code> prop은 존재하지만 현재 기본 템플릿에서는 필수
        표시를 별도로 렌더링하지 않습니다.
      </p>
      <CodeBlock :code="stateCode" />
    </section>

    <section class="docs-section">
      <h2>Slots</h2>
      <DocsTable :headers="slotHeaders" :rows="slotRows" />

      <div class="example-preview mt-[20px]">
        <div class="w-full max-w-[480px]">
          <PxFloatSelect
            v-model="selectedPriority"
            label="우선순위"
            helperText="업무의 처리 순서를 선택해주세요."
            :options="priorityOptions"
            :optionsLabel="optionLabel"
            :optionsValue="optionValue"
          >
            <template #header="{ localValue }">
              <span v-if="localValue" class="flex items-center gap-[8px]">
                <span
                  class="h-[8px] w-[8px] shrink-0 rounded-[4px]"
                  :style="{ backgroundColor: localValue.color }"
                ></span>
                {{ localValue.label }}
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
          </PxFloatSelect>
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
        <code>PxFloatSelect</code>에 사용자 클래스를 추가하고 플로팅 라벨,
        선택창, 옵션 목록을 함께 조정할 수 있습니다.
      </p>
      <DocsTable class="mt-[20px]" :headers="classHeaders" :rows="classRows" />

      <h3 class="mb-[12px] mt-[28px] text-[17px] font-bold text-[#242832]">
        여유 있는 높이로 재정의
      </h3>
      <div class="example-preview">
        <div class="w-full max-w-[480px]">
          <PxFloatSelect
            v-model="customValue"
            class="project-float-select"
            label="프로젝트 카테고리"
            :options="categoryOptions"
            :optionsLabel="optionLabel"
            :optionsValue="optionValue"
          >
            <template #checked>
              <PxIcon
                name="icon-check"
                class="h-[18px] w-[18px] [&_svg]:h-[18px] [&_svg]:w-[18px]"
              />
            </template>
          </PxFloatSelect>
        </div>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>
  </article>
</template>

<style>
.px-floatSelect.project-float-select .px-input--field {
  @apply h-[56px] rounded-[12px] border-[2px] border-[#d97706] bg-[#fffbeb] pl-[18px] pr-[40px] text-[15px] text-[#78350f] shadow-[0_8px_20px_rgba(217,119,6,0.2)];
}

.px-floatSelect.project-float-select .px-select--header {
  @apply pt-[16px];
}

.px-floatSelect.project-float-select .px-floatSelect--label {
  @apply px-[18px] font-bold text-[#b45309];
}

.px-floatSelect.project-float-select .px-floatSelect--label.isFloating {
  transform: translateY(-12px);
}

.px-floatSelect.project-float-select .px-select--options {
  @apply mt-[6px] rounded-[12px] border-[2px] border-[#d97706] shadow-[0_12px_28px_rgba(217,119,6,0.22)];
}
</style>
