<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const searchForm = ref(null)
const searchQuery = ref('')

const getSearchInput = () => searchForm.value?.querySelector('.px-input--field')

watch(
  () => [route.name, route.query.q],
  ([name, query]) => {
    if (name === 'search') {
      searchQuery.value = Array.isArray(query) ? query[0] || '' : query || ''
    }
  },
  { immediate: true },
)

const handleSearch = () => {
  const query = searchQuery.value.trim()

  if (!query) {
    getSearchInput()?.focus()
    return
  }

  router.push({ name: 'search', query: { q: query } })
}

const handleSearchClear = (event) => {
  event?.preventDefault()
  searchQuery.value = ''
  getSearchInput()?.focus()
}

const handleShortcut = (event) => {
  const activeTag = document.activeElement?.tagName
  const isTyping = activeTag === 'INPUT' || activeTag === 'TEXTAREA'

  if (event.key === '/' && !isTyping) {
    event.preventDefault()
    getSearchInput()?.focus()
  }

  if (event.key === 'Escape' && document.activeElement === getSearchInput()) {
    getSearchInput()?.blur()
  }
}

onMounted(() => window.addEventListener('keydown', handleShortcut))
onUnmounted(() => window.removeEventListener('keydown', handleShortcut))
</script>

<template>
  <header
    class="sticky top-[0px] z-20 col-[1/-1] gap-[24px] border-b-[1px] border-[#e7e9ee] bg-white/[0.50] px-[28px] backdrop-blur-[12px] flex justify-between items-center max-[760px]:grid-cols-[auto_minmax(0,1fr)] max-[760px]:gap-[12px] max-[760px]:px-[18px]"
  >
    <RouterLink class="inline-flex items-center gap-[10px] text-[16px] font-bold" to="/">
      <span class="grid h-[32px] w-[32px] place-items-center rounded-[9px] bg-[var(--px-pri-600)] text-[11px] font-extrabold text-white"> PX </span>
      <span class="max-[520px]:hidden">Postfix UI</span>
    </RouterLink>

    <div class="flex">
      <form ref="searchForm" class="flex w-full items-start gap-[8px]" role="search" @submit.prevent="handleSearch">
        <PxInput
          v-model="searchQuery"
          class="docs-navbar-search sm:w-[300px]"
          label="문서 검색"
          type="text"
          placeholder="컴포넌트와 기능 검색"
          clear
          @keydown.enter.prevent="handleSearch"
          @onClear="handleSearchClear"
        />
        <PxButton type="submit" color="gray_border" class="docs-navbar-search-submit">검색</PxButton>
      </form>
    </div>
  </header>
</template>

<style>
.docs-navbar-search .px-input--label_wrapper {
  @apply sr-only;
}

.docs-navbar-search.px-input .px-input--field {
  @apply h-[38px] rounded-[8px] border-[1px] border-[#dfe2e8] bg-[#fafbfc] pb-[0px] pl-[14px] !pr-[40px] pt-[0px] text-[13px] outline-none transition-[border-color,box-shadow,background-color] duration-150;
}

.docs-navbar-search.px-input .px-input--field:focus {
  @apply border-[1px] border-[var(--px-pri-600)] bg-white shadow-[0_0_0_3px_rgba(229,0,129,0.08)];
}

.docs-navbar-search-submit.px-btn {
  @apply h-[38px] min-w-[64px] rounded-[8px] px-[14px] py-[0px] text-[13px];
}

.docs-navbar-search .px-helperText {
  @apply hidden;
}
</style>
