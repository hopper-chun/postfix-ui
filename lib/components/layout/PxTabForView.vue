<script setup>
// import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  options: { type: Array, required: true },
  currentTab: { type: String },
})
const emit = defineEmits(['onSelectTab'])

const handleClickTap = (tab) => {
  emit('onSelectTab', tab)
}
</script>

<template>
  <div class="px-tabForView">
    <template v-for="(tab, index) in options">
      <div class="px-tabForView--container" @click="handleClickTap(tab.key)">
        <div :class="[{ isCurrentTab: currentTab === tab.key }]">
          <div>
            {{ tab.name }}
          </div>
          <div v-if="tab.count > -1" class="px-tabForView--count">
            {{ tab.count }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
