<script setup>
import { reactive, ref } from 'vue'
import { RmButton, RmSmIconButton } from '@/components/element/button'
import { RmDividedSelect } from '@/components/form/select'
import { RmListbox, RmCustomListbox } from '@/components/list/listbox'
import { IconApi } from '@/components/icon'
import ToC from '@/layout/ToC.vue'
import SectionWrapper from '@/components/layout/SectionWrapper.vue'
import origin from './seed.js'

const listSample = ref([
  { id: 1, name: 'My Account', icon: 'UserIcon' },
  { id: 2, name: 'Company', icon: 'OfficeBuildingIcon' },
  { id: 3, name: 'Team Members', icon: 'UsersIcon' },
  { id: 4, name: 'Billing', icon: 'CreditCardIcon' },
])

const people = [
  {
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    department: 'Optimization',
    role: 'Admin',
    email: 'jane.cooper@example.com',
    $display: {
      email: 'DISPLAY-jane.cooper@example.com',
    },
    products: [
      { p1: 'aaaaaaa1', p2: 'bbbbbbb1', p3: 'ccccccc1' },
      { p1: 'aaaaaaa2', p2: 'bbbbbbb2', p3: 'ccccccc2' },
    ],
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Cody Fisher',
    title: 'Product Directives Officer',
    department: 'Intranet',
    role: 'Owner',
    email: 'cody.fisher@example.com',
    $display: {
      email: 'DISPLAY-cody.fisher@example.com',
    },
    products: [
      { p1: 'aaaaaaa1', p2: 'bbbbbbb1', p3: 'ccccccc1' },
      { p1: 'aaaaaaa2', p2: 'bbbbbbb2', p3: 'ccccccc2' },
      { p1: 'aaaaaaa3', p2: 'bbbbbbb3', p3: 'ccccccc3' },
    ],
    image:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Esther Howard',
    title: 'Forward Response Developer',
    department: 'Directives',
    role: 'Member',
    email: 'esther.howard@example.com',
    $display: {
      email: 'DISPLAY-esther.howard@example.com',
    },
    products: [{ p1: 'aaaaaaa1', p2: 'bbbbbbb1', p3: 'ccccccc1' }],
    image:
      'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jenny Wilson',
    title: 'Central Security Manager',
    department: 'Program',
    role: 'Member',
    email: 'jenny.wilson@example.com',
    $display: {
      email: 'DISPLAY-jenny.wilson@example.com',
    },
    products: [
      { p1: 'aaaaaaa1', p2: 'bbbbbbb1', p3: 'ccccccc1' },
      { p1: 'aaaaaaa2', p2: 'bbbbbbb2', p3: 'ccccccc2' },
      { p1: 'aaaaaaa3', p2: 'bbbbbbb3', p3: 'ccccccc3' },
      { p1: 'aaaaaaa4', p2: 'bbbbbbb4', p3: 'ccccccc4' },
    ],
    image:
      'https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Kristin Watson',
    title: 'Lead Implementation Liaison',
    department: 'Mobility',
    role: 'Admin',
    email: 'kristin.watson@example.com',
    $display: {
      email: 'DISPLAY-kristin.watson@example.com',
    },
    products: [{ p1: 'aaaaaaa1', p2: 'bbbbbbb1', p3: 'ccccccc1' }],
    image:
      'https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Cameron Williamson',
    title: 'Internal Applications Engineer',
    department: 'Security',
    role: 'Member',
    email: 'cameron.williamson@example.com',
    $display: {
      email: 'DISPLAY-cameron.williamson@example.com',
    },
    products: [{ p1: 'aaaaaaa1', p2: 'bbbbbbb1', p3: 'ccccccc1' }],
    image:
      'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  // More people...
]

const listboxOptions = ref({
  selected: '',
  inline: false,
  vertical: false,
  hideButton: false,
})

const elements = ref({})
const functionRefs = (label) => (el) => {
  elements.value[label] = el
}
const nowObserving = ref(null)
const handleIntersection = (data) => {
  nowObserving.value = data
}

const handleSelected = (value) => {
  listboxOptions.value.selected = value.item
}

const handleClick = (option) => {
  listboxOptions.value[option] = !listboxOptions.value[option]
}

const handleRemoveConfirm = () => confirm('지울래?')

const handleRemove = (value) => {
  console.log('onRemove', value)
  listSample.value.splice(value.index, 1)
}

const handleEdit = (value) => {
  console.log('onEdit', value)
}
</script>
<template>
  <div class="relative flex w-full">
    <div class="max-w-[950px] flex-1">
      <div class="font-bold text-slate-500">List</div>
      <div class="mt-[8px] text-[32px] font-bold text-slate-700">Listbox</div>
      <div class="mt-[16px] w-[800px] text-[16px] text-slate-700">about menu description.</div>
      <div class="mt-[16px] w-[800px] text-[16px] text-slate-700">프로퍼티 : 인라인, 버튼 비활성화, disabled, vertical</div>
      <div class="mt-[60px]">
        <div class="space-y-[80px]">
          <div>
            <SectionWrapper label="usage" :ref="functionRefs('usage')" @onIntersection="handleIntersection">
              <template #contents>
                <div>
                  listbox는 기본 상태에서 label과 value를 읽어온다. 단순 리스트를 가져오는건 어렵고 반드시 label과 value를 분리해야 함. <br />
                  슬롯을 사용하게 되면 받은 리스트를 그대로 넘겨주며, 이 경우에도 라벨과 값을 모두 분류해놓아야 기능을 사용할 수 있다. <br />
                  onSelect, onEidt, onRemove 등의 이벤트를 사용할 수 있으며, 컴포넌트 내부가 아닌 외부에서 이벤트를 정의해야 함
                  <div class=""></div>
                </div>
              </template>
              <div class="space-y-[20px]">
                <div>
                  <div class="flex justify-center space-x-[8px] border-b pb-[20px]">
                    <div class="w-[70px]">
                      <RmButton size="sm" :isFull="true" :color="listboxOptions.inline ? 'pri' : 'transparent'" @click="handleClick('inline')">
                        inline
                      </RmButton>
                    </div>
                    <div class="w-[70px]">
                      <RmButton size="sm" :isFull="true" :color="listboxOptions.vertical ? 'pri' : 'transparent'" @click="handleClick('vertical')">
                        vertical
                      </RmButton>
                    </div>
                    <div class="w-[120px]">
                      <RmButton size="sm" :isFull="true" :color="listboxOptions.hideButton ? 'pri' : 'transparent'" @click="handleClick('hideButton')">
                        hideButton
                      </RmButton>
                    </div>
                  </div>
                  <div class="my-[20px] space-y-[20px]">
                    <div>
                      <div class="pb-[20px] text-center text-[12px]">current Selceted : {{ listboxOptions.selected }}</div>
                      <div>
                        <RmListbox
                          :selectedItem="listboxOptions.selected"
                          :list="listSample"
                          :itemLabel="(item) => item.name"
                          :itemValue="(item) => item.id"
                          :isInline="listboxOptions.inline"
                          :isRow="listboxOptions.vertical"
                          isModify
                          isRemove
                          @onSelect="handleSelected"
                          @onRemove="handleRemove"
                          @onEdit="handleEdit"
                          :removeConfirm="handleRemoveConfirm"
                        ></RmListbox>
                        <RmCustomListbox
                          class="mt-[40px]"
                          :selectedItem="listboxOptions.selected"
                          :list="listSample"
                          :itemLabel="(item) => item.name"
                          :itemValue="(item) => item.id"
                          :inline="listboxOptions.inline"
                          :vertical="listboxOptions.vertical"
                          :hideButton="listboxOptions.hideButton"
                          @onSelect="handleSelected"
                          @onRemove="handleRemove"
                          @onEdit="handleEdit"
                          :removeConfirm="handleRemoveConfirm"
                          classes="space-y-[10px]"
                          activeClasses="bg-slate-600 text-white"
                          inactiveClasses="bg-slate-100"
                          innerClasses=" border border-slate-300 rounded-[8px] text-[14px] h-[40px] pl-[10px]"
                        ></RmCustomListbox>
                      </div>
                    </div>
                    <div>
                      <RmListbox
                        :selectedItem="listboxOptions.selected"
                        :list="people"
                        :itemLabel="(item) => item.name"
                        :itemValue="(item) => item.email"
                        :inline="listboxOptions.inline"
                        :vertical="listboxOptions.vertical"
                        :hideButton="listboxOptions.hideButton"
                        @onSelect="handleSelected"
                      >
                        <template v-slot="{ item }">
                          <div class="flex items-center space-x-[12px] py-[12px]">
                            <div class="shrink-0">
                              <img class="h-[40px] w-[40px] rounded-full" :src="item.image" />
                            </div>
                            <div class="text-[14px]">
                              <div>{{ item.name }}</div>
                              <div class="text-[12px] text-slate-600">{{ item.department }}</div>
                            </div>
                          </div></template
                        >
                      </RmListbox>
                    </div>
                  </div>
                </div>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </div>
    </div>
    <ToC :list="elements" :state="nowObserving"></ToC>
  </div>
</template>
