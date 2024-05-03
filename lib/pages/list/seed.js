const listSample = [
  { id: 1, name: 'My Account', icon: 'UserIcon' },
  { id: 2, name: 'Company', icon: 'OfficeBuildingIcon' },
  { id: 3, name: 'Team Members', icon: 'UsersIcon' },
  { id: 4, name: 'Billing', icon: 'CreditCardIcon' },
]

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

const peoples = [
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

const pagination = {
  header: [
    { field: 'name', label: '이름' },
    { field: 'title', label: '직무' },
    { field: 'role', label: '직급' },
    { field: 'email', label: '메일' },
  ],
  people: [
    {
      name: 'Jane Cooper',
      title: 'Regional Paradigm Technician',
      role: 'Admin',
      email: 'jane.cooper@example.com',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
      name: 'Cody Fisher',
      title: 'Product Directives Officer',
      role: 'Owner',
      email: 'cody.fisher@example.com',
      image:
        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
      name: 'Esther Howard',
      title: 'Forward Response Developer',
      role: 'Member',
      email: 'esther.howard@example.com',
      image:
        'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
  ],
  vanilla: `
<script setup>
import { toRefs } from 'vue'
import { IconArrowLeftMd } from '@/components/icon'
import usePagination from '@/composables/usePagination'

const props = defineProps({
  limit: { type: Number, required: true },
  total: { type: Number, required: true },
  currentPage: { type: Number, required: true },
})
const emit = defineEmits(['onChangePage'])

const { limit, total, currentPage } = toRefs(props)

const { range, isNext, isPrev, click, clickPrev, clickNext } = usePagination({ limit, total, currentPage }, emit)
</script>

<template>
  <nav class="px-[16px] flex items-center justify-between sm:px-0">
    <div class="-mt-px w-0 flex-1 flex">
      <a
        @click="clickPrev"
        class="border-t-2 border-transparent pt-[16px] pr-[4px] inline-flex items-center text-[14px] font-bold text-black"
        :class="isPrev ? ' cursor-pointer' : 'text-gray-300'"
      >
        <span class="w-[24px] h-[24px] flex items-center justify-center"><IconArrowLeftMd class="w-[16px]"></IconArrowLeftMd></span>
        <span>Prev</span>
      </a>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <template v-for="i in range" :key="i">
        <span v-if="i === '...'" class="text-[#C8C8C8] pt-[16px] px-[16px] inline-flex items-center text-[14px] font-bold"> ... </span>
        <a
          v-else
          @click="click(i)"
          :class="i === currentPage ? ' text-black ' : ' text-[#C8C8C8] hover:text-gray-700 cursor-pointer'"
          class="pt-[16px] px-[16px] inline-flex items-center text-[14px] font-bold"
        >
          {{ String(i).padStart(2, '0') }}
        </a>
      </template>
    </div>
    <div class="-mt-px w-0 flex-1 flex justify-end">
      <a
        @click="clickNext"
        class="border-t-2 border-transparent pt-[16px] pl-[4px] inline-flex items-center text-[14px] font-bold text-black"
        :class="isNext ? '  cursor-pointer' : 'text-gray-300'"
      >
        <span>Next</span>
        <span class="w-[24px] h-[24px] flex items-center justify-center"><IconArrowLeftMd class="w-[16px] rotate-180"></IconArrowLeftMd></span>
      </a>
    </div>
  </nav>
</template>
  `,
  button: `
<script setup>
import { toRefs } from 'vue'
import { IconChevronRight } from '@/components/icon'
import usePagination from '@/composables/usePagination'

const props = defineProps({
  limit: { type: Number, required: true },
  total: { type: Number, required: true },
  currentPage: { type: Number, required: true },
})
const emit = defineEmits(['onChangePage'])

const { limit, total, currentPage } = toRefs(props)

const { range, isNext, isPrev, click, clickPrev, clickNext } = usePagination({ limit, total, currentPage }, emit)
</script>

<template>
  <nav class="px-[16px] flex items-center sm:px-0 h-[56px]">
    <div class="flex items-center">
      <a
        @click="clickPrev"
        class="inline-flex items-center text-[14px] font-medium text-gray-500"
        :class="isPrev ? 'hover:text-gray-700  cursor-pointer' : 'text-gray-300'"
      >
        <span class="border border-[#e5e7eb] rounded-[4px] w-[24px] h-[24px] flex items-center justify-center"
          ><IconChevronRight class="h-[12px] text-[#323232] rotate-180"></IconChevronRight
        ></span>
      </a>
    </div>
    <div class="md:-mt-px flex items-center space-x-[2px]">
      <template v-for="i in range" :key="i">
        <span v-if="i === '...'" class="border-transparent text-gray-500 w-[24px] h-[24px] justify-center inline-flex items-center text-[12px] font-medium">
          ...
        </span>
        <a
          v-else
          @click="click(i)"
          :class="i === currentPage ? 'text-[#6b7280] bg-[#f3f4f6] border-[#e5e7eb]' : 'border-transparent text-[#D1D5DB] hover:text-gray-700 cursor-pointer'"
          class="border rounded-[4px] w-[24px] h-[24px] justify-center inline-flex items-center text-[12px]"
        >
          {{ i }}
        </a>
      </template>
    </div>
    <div class="flex">
      <a
        @click="clickNext"
        class="inline-flex items-center text-[14px] font-medium text-gray-500"
        :class="isNext ? 'hover:text-gray-700 hover:border-gray-300  cursor-pointer' : 'text-gray-300'"
      >
        <span class="border border-[#e5e7eb] rounded-[4px] w-[24px] h-[24px] flex items-center justify-center"
          ><IconChevronRight class="h-[12px] text-[#323232]"></IconChevronRight
        ></span>
      </a>
    </div>
  </nav>
</template>
  `,
}

const adminTable = {
  samples: ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'].reduce((acc, postFix) => {
    return acc.concat(
      peoples.map((p) => {
        return { ...p, name: p.name + ' ' + postFix, title: p.title + ' ' + postFix }
      })
    )
  }, []),
}
export default { listSample, people, pagination, adminTable }
