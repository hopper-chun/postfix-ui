<script setup>
import navigation from './navigation'
</script>

<template>
  <aside
    class="sticky top-[64px] h-[calc(100vh-64px)] overflow-y-auto border-r-[1px] border-[#e7e9ee] bg-[#fafbfc] px-[22px] py-[30px] max-[760px]:static max-[760px]:h-auto max-[760px]:overflow-y-visible max-[760px]:border-b-[1px] max-[760px]:border-r-[0px] max-[760px]:px-[18px] max-[760px]:py-[12px]"
  >
    <nav class="flex flex-col gap-[8px]" aria-label="문서 메뉴">
      <PxAccordion v-for="group in navigation" :key="group.title" currentState :duration="160">
        <template #header="{ isOpen }">
          <button
            type="button"
            class="flex w-full items-center justify-between rounded-[6px] px-[10px] py-[8px] text-left text-[11px] font-bold tracking-[0.08em] text-[#9298a4] hover:bg-white"
            :aria-expanded="isOpen"
          >
            <span>{{ group.title }}</span>
            <span class="text-[16px] font-normal leading-[1] text-[#7a8190]" aria-hidden="true">
              {{ isOpen ? '−' : '+' }}
            </span>
          </button>
        </template>

        <template #body>
          <div class="pb-[8px]">
            <RouterLink
              v-for="item in group.items"
              :key="item.label"
              :to="item.to"
              class="my-[2px] block rounded-[6px] pl-[20px] pr-[10px] py-[8px] text-[14px] text-[#4e5563] hover:bg-white hover:text-[var(--px-pri-600)]"
              active-class="bg-white !text-[var(--px-pri-600)]"
            >
              {{ item.label }}
            </RouterLink>
          </div>
        </template>
      </PxAccordion>
    </nav>
  </aside>
</template>
