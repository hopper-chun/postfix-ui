<script setup>
const navigation = [
  {
    title: '가이드',
    items: [{ label: '시작하기', to: '/guide/getting-started' }],
  },
  {
    title: '컴포넌트',
    items: [{ label: 'Button', to: '/components/button' }],
  },
]
</script>

<template>
  <div class="docs-shell">
    <header class="docs-header">
      <RouterLink class="docs-brand" to="/">
        <span class="docs-brand__mark">PX</span>
        <span>Postfix UI</span>
      </RouterLink>
      <span class="docs-header__label">Guide & Examples</span>
    </header>

    <aside class="docs-sidebar">
      <nav aria-label="문서 메뉴">
        <section v-for="group in navigation" :key="group.title" class="docs-nav-group">
          <h2>{{ group.title }}</h2>
          <RouterLink v-for="item in group.items" :key="item.to" :to="item.to">
            {{ item.label }}
          </RouterLink>
        </section>
      </nav>
    </aside>

    <main class="docs-content">
      <RouterView />
    </main>
  </div>
</template>
