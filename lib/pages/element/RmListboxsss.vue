<script setup>
const props = defineProps({
  list: { type: Array, required: true },
  itemLabel: { type: Function, default: (item) => item },
  itemValue: { type: Function, default: (item) => item },
  disabled: { type: Boolean, default: false },
  removeConfirm: { type: Function, default: () => confirm('정말로 삭제하시겠습니까?') },
  selectedItem: { type: [String, Boolean, Number, Object] },
  disabledButton: { type: Boolean },
  isDraggable: { type: Boolean },
  emptyMessage: { type: String, default: () => '선택해주세요' },
})

defineEmits(['onSelect', 'onRemove'])

const handleSelect = (item, index) => {
  emit('onSelect', { item, index })
}

const handleRemove = (item, index) => {
  if (props.removeConfirm()) {
    return
  }
  emit('onRemove', { value: item, index })
}
</script>

<template>
  <div class="">
    <ul class="divide-y divide-gray-200 flex flex-col space-x-[1px]">
      <li
        v-for="(item, index) in list"
        :key="item"
        @click="handleSelect(itemValue(item), index)"
        class="flex cursor-pointer"
        :class="selectedItem && selectedItem === itemValue(item) ? 'bg-indigo-100' : ''"
      >
        <div class="relative" :class__="{ 'border-b': index !== list.length - 1 }">
          <template v-if="isDraggable">
            <!-- <div class="absolute left-1 top-1/2 -translate-y-1/2 transform cursor-move" @mousedown="handleMousedown"> -->
            <HeroIcon name="ArrowsExpandIcon" class="h-3 w-3 text-gray-400"></HeroIcon>
            <!-- </div> -->
          </template>
          <div class="py-2" :class="isDraggable ? 'px-2' : ''">
            <template v-if="!disabledButton">
              <!-- <div class="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-8" @click.stop="handleEdit(itemValue(item), index)">
                  <HeroIconOutline name="PencilIcon" class="h-4 w-4 text-gray-400 hover:text-gray-700" aria-hidden="true" />
                </div> -->
              <div class="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3" @click.stop="handleRemove(itemValue(item), index)">
                <HeroIconOutline name="TrashIcon" class="h-4 w-4 text-gray-400 hover:text-gray-700" aria-hidden="true" />
              </div>
            </template>

            <slot :item="item" :cbRemove="() => handleRemove(itemValue(item), index)">
              <span class="lr-[1px]">{{ itemLabel(item) }}</span>
            </slot>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
