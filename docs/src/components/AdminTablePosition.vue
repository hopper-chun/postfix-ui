<script setup>
const props = defineProps({
  area: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
})

const isActive = (area) => props.area === area
const areaClass = (area) =>
  isActive(area)
    ? 'border-[#7c3aed] bg-[#f3e8ff] text-[#6b21a8] ring-[2px] ring-[#c4b5fd]'
    : 'border-[#dfe3e8] bg-white text-[#8a919d]'
</script>

<template>
  <div class="rounded-[10px] border border-[#dfe3e8] bg-[#f7f8fa] p-[16px]">
    <div class="overflow-hidden rounded-[8px] border border-[#cfd4dc] bg-white">
      <div class="border-b border-[#dfe3e8] bg-[#343a46] px-[14px] py-[10px] text-[12px] font-bold text-white">PxAdminTable 헤더·제목</div>
      <div class="p-[12px]">
        <div class="rounded-[6px] border px-[12px] py-[10px] text-[11px] font-bold" :class="areaClass('search')">SHELL-SEARCH · 검색 폼</div>

        <div class="mt-[8px] flex items-center justify-between gap-[8px] rounded-[6px] border border-[#dfe3e8] bg-[#fafafa] p-[8px]">
          <span class="rounded-[4px] border border-[#dfe3e8] bg-white px-[8px] py-[6px] text-[10px] text-[#8a919d]">SHELL-TABLE-LEFT</span>
          <div class="flex flex-wrap justify-end gap-[6px]">
            <span class="rounded-[4px] border px-[8px] py-[6px] text-[10px] font-bold" :class="areaClass('order')">PxSearchOrder</span>
            <span class="rounded-[4px] border border-[#dfe3e8] bg-white px-[8px] py-[6px] text-[10px] text-[#8a919d]">PxPagination</span>
            <span class="rounded-[4px] border px-[8px] py-[6px] text-[10px] font-bold" :class="areaClass('config-trigger')">설정 버튼</span>
          </div>
        </div>

        <div class="mt-[8px] overflow-hidden rounded-[6px] border border-[#dfe3e8]">
          <div class="grid grid-cols-3 bg-[#eef0f3] text-[10px] font-bold text-[#626977]">
            <span class="border-r border-[#dfe3e8] px-[9px] py-[7px]">컬럼 A</span>
            <span class="border-r border-[#dfe3e8] px-[9px] py-[7px]">컬럼 B</span>
            <span class="px-[9px] py-[7px]">컬럼 C</span>
          </div>
          <div v-for="row in 2" :key="row" class="grid grid-cols-3 border-t border-[#e8eaee] text-[10px]">
            <span v-for="cell in 3" :key="cell" class="border-r px-[9px] py-[9px] last:border-r-0" :class="areaClass('cell')">테이블 셀</span>
          </div>
        </div>

        <div v-if="area === 'config-limit' || area === 'config-columns'" class="mt-[10px] rounded-[7px] border border-[#aeb4be] bg-[#f5f6f8] p-[10px]">
          <div class="mb-[8px] text-[11px] font-bold text-[#343a46]">설정 버튼으로 여는 테이블 설정 다이얼로그</div>
          <div class="grid gap-[8px] sm:grid-cols-2">
            <div class="rounded-[5px] border px-[10px] py-[12px] text-[10px] font-bold" :class="areaClass('config-limit')">PxSearchPageLimit<br />페이지 크기</div>
            <div class="rounded-[5px] border px-[10px] py-[12px] text-[10px] font-bold" :class="areaClass('config-columns')">BoardListConfig<br />표시 컬럼</div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-[12px] flex items-start gap-[8px]">
      <PxTag color="pri_border">{{ name }}</PxTag>
      <p class="m-[0px] text-[13px] leading-[1.6] text-[#626977]">{{ description }}</p>
    </div>
  </div>
</template>

