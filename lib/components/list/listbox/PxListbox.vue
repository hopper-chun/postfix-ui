<script setup>
const props = defineProps({
  list: { type: Array, required: true },
  itemLabel: { type: Function, default: (item) => item },
  itemValue: { type: Function, default: (item) => item },
  disabled: { type: Boolean, default: false },
  removeConfirm: { type: Function, default: () => confirm('정말로 삭제하시겠습니까?') },
  selectedItem: { type: [String, Boolean, Number, Object] },
  emptyMessage: { type: String, default: () => '선택해주세요' },
  isModify: { type: Boolean },
  isRemove: { type: Boolean },
  isInline: { type: Boolean },
  isRow: { type: Boolean },
})
// selectedItem = v-model
const emit = defineEmits(['onSelect', 'onEdit', 'onRemove', 'onDragDrop'])

const { handleSelect, handleEdit, handleRemove } = useListbox({ isDraggable: props.isDraggable, removeConfirm: props.removeConfirm, emit })
</script>

<template>
  <div class="px-listbox">
    <ul :class="[{ isInline }, { isRow }]">
      <li
        v-for="(item, index) in list"
        :key="item"
        @click="handleSelect(itemValue(item), index)"
        :class="[{ selected: selectedItem && selectedItem === itemValue(item) }]"
      >
        <div>
          <div class="px-listbox--text" :class="[{ hideButton: isModify || isRemove }, { isRow }]">
            <slot :item="item" :cbRemove="() => handleRemove(itemValue(item), index)">
              <div class="label">
                <span>{{ itemLabel(item) }}</span>
              </div>
            </slot>
          </div>
          <div v-if="isModify || isRemove" class="px-listbox--func_wrapper">
            <div v-if="isModify" class="px-listbox--func modify" @click.stop="handleEdit(itemValue(item), index)"></div>
            <div v-if="isRemove" class="px-listbox--func remove" @click.stop="handleRemove(itemValue(item), index)"></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
