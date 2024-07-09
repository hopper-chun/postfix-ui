<script setup>
import { reactive, ref } from 'vue'
// import { RmBadge } from '@/components/element/button'
import { PxButton } from '@/components/element/button'
import { RmDividedSelect } from '@/components/form/select'
import origin from './seed'
import ToC from '@/layout/ToC.vue'
import SectionWrapper from '@/components/layout/SectionWrapper.vue'
const { badge } = origin

const elements = ref({})
const functionRefs = (label) => (el) => {
  elements.value[label] = el
}
const nowObserving = ref(null)
const handleIntersection = (data) => {
  nowObserving.value = data
}

const LIST = [
  { id: 1, name: 'My Account', icon: 'UserIcon' },
  { id: 2, name: 'Company', icon: 'OfficeBuildingIcon' },
  { id: 3, name: 'Team Members', icon: 'UsersIcon' },
  { id: 4, name: 'Billing', icon: 'CreditCardIcon' },
]

const list = reactive(LIST)
const selectedItem = ref('')

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
</script>
<template>
  <div class="relative flex w-full">
    <div class="flex-1">
      <div class="font-bold text-slate-500">Element</div>
      <div class="mt-[8px] text-[32px] font-bold text-slate-700">Badge</div>
      <div class="mt-[16px] w-[800px] text-[16px] text-slate-700">about menu description.</div>
      <div class="mt-[60px]">
        <div class="space-y-[80px]">
          <div>
            <SectionWrapper label="label" :ref="functionRefs('label')" @onIntersection="handleIntersection"></SectionWrapper>
          </div>
        </div>
      </div>
    </div>

    <ToC :list="elements" :state="nowObserving"></ToC>
  </div>
</template>
