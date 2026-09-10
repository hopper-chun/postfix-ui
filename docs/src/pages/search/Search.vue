<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const query = computed(() => {
  const value = route.query.q
  return (Array.isArray(value) ? value[0] : value || '').trim()
})

const normalize = (value) =>
  String(value || '')
    .trim()
    .toLocaleLowerCase()

const tokens = computed(() => normalize(query.value).split(/\s+/).filter(Boolean))

const categoryLabel = (path) => {
  if (path.startsWith('/element')) return 'ELEMENT'
  if (path.startsWith('/form')) return 'FORM'
  if (path.startsWith('/list')) return 'LIST'
  if (path.startsWith('/start')) return 'GUIDE'
  return 'GUIDE'
}

const searchablePages = computed(() =>
  router
    .getRoutes()
    .filter((page) => page.meta.searchable !== false && page.meta.title)
    .map((page) => ({
      name: page.name,
      path: page.path,
      title: page.meta.title,
      description: page.meta.description || '설명이 아직 등록되지 않았습니다.',
      keywords: Array.isArray(page.meta.keywords) ? page.meta.keywords : [],
      category: page.meta.category || categoryLabel(page.path),
    })),
)

const results = computed(() => {
  if (!tokens.value.length) return []

  return searchablePages.value
    .map((page) => {
      const title = normalize(page.title)
      const description = normalize(page.description)
      const keywords = page.keywords.map(normalize)
      const corpus = [title, description, page.path, ...keywords].join(' ')
      const isMatched = tokens.value.every((token) => corpus.includes(token))

      if (!isMatched) return null

      const normalizedQuery = normalize(query.value)
      let score = 0

      if (title === normalizedQuery) score += 100
      else if (title.startsWith(normalizedQuery)) score += 70
      else if (title.includes(normalizedQuery)) score += 50

      score += keywords.filter((keyword) => tokens.value.some((token) => keyword.includes(token))).length * 10

      if (description.includes(normalizedQuery)) score += 5

      return {
        ...page,
        score,
        matchedKeywords: page.keywords.filter((keyword) => tokens.value.some((token) => normalize(keyword).includes(token))).slice(0, 4),
      }
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
})

const suggestions = ['PxInput', 'clear', 'slot', 'optionsValue']
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">SEARCH</p>
    <h1>검색 결과</h1>

    <p v-if="query" class="docs-lead">
      <strong class="font-bold text-[#242832]">‘{{ query }}’</strong> 검색 결과
      <span class="whitespace-nowrap">{{ results.length }}개</span>
    </p>
    <p v-else class="docs-lead">Navbar에서 컴포넌트 이름이나 Props, 슬롯 이름을 검색해주세요.</p>

    <section v-if="results.length" class="mt-[36px]">
      <div class="grid gap-[14px]">
        <RouterLink
          v-for="result in results"
          :key="result.name"
          :to="{ name: result.name }"
          class="group rounded-[10px] border-[1px] border-[#e3e6eb] bg-white px-[20px] py-[10px] transition-[border-color,box-shadow,transform] duration-150 hover:translate-y-[-1px] hover:border-[var(--px-pri-400)] hover:shadow-[0_8px_24px_rgba(36,40,50,0.07)]"
        >
          <div class="flex items-start justify-between gap-[20px]">
            <div class="min-w-[0px]">
              <p class="mb-[0px] mt-[0px] text-[11px] font-extrabold tracking-[0.1em] text-[var(--px-pri-600)]">
                {{ result.category }}
              </p>
              <h2 class="m-[0px] text-[20px] font-bold tracking-[-0.02em] text-[#242832] group-hover:text-[var(--px-pri-600)]">
                {{ result.title }}
              </h2>
              <p class="mb-[0px] mt-[0px] text-[14px] leading-[1.7] text-[#69707e]">
                {{ result.description }}
              </p>
            </div>
            <span
              class="mt-[18px] shrink-0 text-[20px] text-[#a8adb7] transition-transform duration-150 group-hover:translate-x-[3px] group-hover:text-[var(--px-pri-600)]"
              aria-hidden="true"
            >
              →
            </span>
          </div>

          <div v-if="result.matchedKeywords.length" class="mt-[10px] flex flex-wrap gap-[6px]">
            <PxTag v-for="keyword in result.matchedKeywords" :key="keyword" color="gray_border">
              {{ keyword }}
            </PxTag>
          </div>
        </RouterLink>
      </div>
    </section>

    <section v-else-if="query" class="mt-[36px] rounded-[10px] border-[1px] border-dashed border-[#d8dbe2] bg-[#fafbfc] px-[28px] py-[44px] text-center">
      <h2 class="m-[0px] text-[19px] font-bold text-[#242832]">일치하는 페이지가 없습니다</h2>
      <p class="mb-[0px] mt-[10px] text-[14px] leading-[1.7] text-[#69707e]">컴포넌트 이름이나 Props 이름으로 다시 검색해보세요.</p>
    </section>

    <section v-if="!query || !results.length" class="mt-[28px]">
      <h2 class="mb-[12px] mt-[0px] text-[15px] font-bold text-[#3d4350]">추천 검색어</h2>
      <div class="flex flex-wrap gap-[8px]">
        <RouterLink v-for="suggestion in suggestions" :key="suggestion" :to="{ name: 'search', query: { q: suggestion } }" custom v-slot="{ navigate }">
          <PxButton size="xs" color="gray_border" @click="navigate">
            {{ suggestion }}
          </PxButton>
        </RouterLink>
      </div>
    </section>
  </article>
</template>
