<script setup>
import { computed, ref } from 'vue'
import { PxButton, RmSmIconButton } from '@/components/element/button'
import { RmDividedSelect } from '@/components/form/select'
import { RmTable } from '@/components/list/table'
import { IconApi } from '@/components/icon'
import ToC from '@/layout/ToC.vue'
import SectionWrapper from '@/components/layout/SectionWrapper.vue'
import { useRoute, useRouter } from 'vue-router'
import origin from './seed.js'

const route = useRoute()
const router = useRouter()

const checkboxes = ref([])

const setSearchOrder = ({ orderField, orderType }) => {
  console.log('setSearchOrder', orderField, orderType)
  const route = router.currentRoute.value

  const query = {
    ...route.query,
  }

  if (orderType) {
    query.orderField = orderField
    query.orderType = orderType
  } else {
    delete query.orderField
    delete query.orderType
  }

  router.push({
    path: route.path,
    query,
  })
}

const handleClickHader = (header) => {
  console.log('handleClickHader', header)
  setSearchOrder(header)
}

const handleCheckAll = (checked) => {
  console.log('handleCheckAll', checked)
}
const handleCheck = ({ checked, row, rowIndex }) => {
  console.log('handleCheck', checked, rowIndex, people)
}

const show = () => {
  console.log('people', people.value)
}

const headers = ref([
  { slotId: 'NAME', field: 'name', label: '이름', sort: ['asc'] },
  // { field: 'name', label: '사용자ID', sort: ['asc'] },
  { field: 'title', label: '직무', sort: ['asc', 'desc'] },
  { field: 'department', label: '부서' },
  { field: 'role', label: '직급' },
  // { field: 'email', label: '요청일' },
  {
    component: {
      name: 'PxButton',
      label: '버튼',
      props: () => ({ size: 'smNw', color: 'secondary' }),
    },
  },
  { component: { name: 'HpTableCellLink', props: (row) => ({ label: 'View', routerLink: { path: '/elements/button', query: { name: row.name } } }) } },
  // {
  //   component: {
  //     name: 'HpTableCellLink',
  //     props: (row) => ({ label: ['Edit', 'Create'], textColor: ['text-red-500', 'text-green-500'] }),
  //     event: (row, rowIndex) => ({
  //       onClick: (index) => {
  //         const query = index ? { title: row.title } : { role: row.role }
  //         router.push({ path: '/elements/button', query })
  //       },
  //     }),
  //   },
  // },
])
const customHeaders = [
  {
    label: '정보',
    slotId: 'PERSON',
  },
  // { field: 'role', label: '상태' },
  { field: 'email', label: '이메일' },
  {
    label: '버튼',
    slotId: 'Buttonn',
  },
]
const temp = [
  {
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    department: 'Optimization',
    role: 'Admin',
    email: 'jane.cooper@example.com',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Cody Fisher',
    title: 'Product Directives Officer',
    department: 'Intranet',
    role: 'Owner',
    email: 'cody.fisher@example.com',
    image:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Esther Howard',
    title: 'Forward Response Developer',
    department: 'Directives',
    role: 'Member',
    email: 'esther.howard@example.com',
    image:
      'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jenny Wilson',
    title: 'Central Security Manager',
    department: 'Program',
    role: 'Member',
    email: 'jenny.wilson@example.com',
    image:
      'https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Kristin Watson',
    title: 'Lead Implementation Liaison',
    department: 'Mobility',
    role: 'Admin',
    email: 'kristin.watson@example.com',
    image:
      'https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Cameron Williamson',
    title: 'Internal Applications Engineer',
    department: 'Security',
    role: 'Member',
    email: 'cameron.williamson@example.com',
    image:
      'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },

  // More people...
]
const people = computed(() => {
  const { orderField, orderType } = route.query
  if (!orderField || !orderType) {
    return temp
  }
  if (orderType === 'asc') {
    return _.sortBy(temp, [(o) => o[orderField]])
  } else if (route.query.orderType === 'desc') {
    return _.sortBy(temp, [(o) => o[orderField]]).reverse()
  } else {
    return temp
  }
})
const options = ref({})

const elements = ref({})
const functionRefs = (label) => (el) => {
  elements.value[label] = el
}
const nowObserving = ref(null)
const handleIntersection = (data) => {
  nowObserving.value = data
}
</script>
<template>
  <div class="relative flex w-full">
    <div class="max-w-[950px] flex-1">
      <div class="font-bold text-slate-500">List</div>
      <div class="mt-[8px] text-[32px] font-bold text-slate-700">Table</div>
      <div class="mt-[16px] w-[800px] text-[16px] text-slate-700">about menu description.</div>
      <div>{{ checkboxes }}</div>
      <div class="mt-[60px]">
        <div class="space-y-[80px]">
          <div>
            <SectionWrapper label="Usage" :ref="functionRefs('Usage')" @onIntersection="handleIntersection">
              <template #contents></template>
              <div class="w-[900px] text-[13px]">
                <RmTable
                  :headers="headers"
                  :rows="people"
                  @onClickHeader="handleClickHader"
                  v-model:checkboxes="checkboxes"
                  @onCheckAll="handleCheckAll"
                  @onCheck="handleCheck"
                >
                  <template v-slot:NAME="{ row }">
                    <div class="cursor-pointer whitespace-nowrap">
                      {{ row.name }}
                    </div>
                  </template>
                </RmTable>
              </div>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper label="Extra" :ref="functionRefs('Extra')" @onIntersection="handleIntersection">
              <template #contents></template>
              <div class="w-[900px] text-[13px]">
                <RmTable :headers="customHeaders" :rows="people" @onClickHeader="handleClickHader">
                  <template v-slot:PERSON="{ row }">
                    <div class="flex items-center space-x-[12px]">
                      <div><img :src="row.image" class="h-[40px] w-[40px] shrink-0 rounded-full" /></div>
                      <div>
                        <div class="text-[14px]">{{ row.name }}</div>
                        <div class="text-[12px] text-slate-600">{{ row.title }}</div>
                      </div>
                    </div>
                  </template>
                  <template v-slot:Buttonn="{ row, index }">
                    <div>
                      <RmSmIconButton size="md" textAlign="left">
                        <template #icon>
                          <div><IconApi class="w-[16px]"></IconApi></div
                        ></template>
                        <span>{{ index }}번 버튼</span>
                      </RmSmIconButton>
                    </div>
                  </template>
                </RmTable>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </div>
    </div>
    <ToC :list="elements" :state="nowObserving"></ToC>
  </div>
</template>
