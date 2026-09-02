<script setup>
defineProps({
  code: { type: String, required: true },
})
</script>

<template>
  <pre class="code-block"><code>{{ code }}</code></pre>
</template>
