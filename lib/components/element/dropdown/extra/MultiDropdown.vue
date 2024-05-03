<script setup>
import { RmDropdown } from '@/components/element/dropdown'

const props = defineProps({
  direction: { type: String, default: 'bottom' },
  menuAlign: { type: String, default: 'left' },
  hover: { type: Boolean },
  items: { type: (Array, Object) },
  modelValue: { type: (String, Array, Object) },
})
const emits = defineEmits(['update:modelValue'])

const handleClick = (item, index) => {
  emits('update:modelValue', { item, index })
}
</script>

<template>
  <div>
    {{ items.menu[1] }} <br />
    <RmDropdown :direction="direction" :menuAlign="menuAlign" :hover="hover">
      <template #trigger="{ open }">
        <template v-if="!items.trigger">
          <slot name="trigger" :open="open"></slot>
        </template>
        <template v-else>
          <div class="flex flex-1 items-center border border-slate-500 rounded-[8px] justify-center px-[8px] py-[4px] text-[14px] text-slate-800">
            {{ items.trigger }}
          </div>
        </template>
      </template>
      <template #content="{ open }">
        <div class="border shadow-md border-slate-500 mt-[4px] rounded-[8px] bg-white">
          <div
            v-for="(item, index) in items.menu"
            @click="handleClick(item, index)"
            class="w-[100px] text-[13px] pl-[4px] h-[40px] flex items-center hover:bg-slate-100"
            :class="index !== 0 ? ' border-t' : ''"
          >
            <div v-if="item?.trigger">
              <!-- {{ item.trigger }} -->
              <RmDropdown hover direction="left">
                <template #trigger="{ open }">
                  <template v-if="!items.trigger">
                    <slot name="trigger" :open="open"></slot>
                  </template>
                  <template v-else>
                    <div>
                      {{ item.trigger }}
                    </div>
                  </template>
                </template>
                <template #content="{ open }">
                  <div class="border shadow-md border-slate-500 mt-[4px] rounded-[8px] overflow-hidden">
                    <div
                      v-for="(subitem, index) in item.menu"
                      @click="handleClick(subitem, index)"
                      class="w-[100px] text-[13px] pl-[4px] h-[40px] flex items-center bg-white hover:bg-slate-100"
                      :class="index !== 0 ? ' border-t' : ''"
                    >
                      {{ subitem }}
                    </div>
                  </div>
                </template>
              </RmDropdown>
            </div>
            <div v-else>{{ item }}</div>
          </div>
        </div>
      </template>
    </RmDropdown>
  </div>
</template>
