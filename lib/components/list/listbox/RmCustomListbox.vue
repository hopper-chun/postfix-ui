<script setup>
import { useListbox } from '@/composables'
import { IconDelete, IconModify } from '@/components/icon'

const props = defineProps({
  classes: { type: [String, Array, Object] },
  activeClasses: { type: [String, Array, Object] },
  inactiveClasses: { type: [String, Array, Object] },
  innerClasses: { type: [String, Array, Object] },
  list: { type: Array, required: true },
  itemLabel: { type: Function, default: (item) => item },
  itemValue: { type: Function, default: (item) => item },
  disabled: { type: Boolean, default: false },
  removeConfirm: { type: Function, default: () => confirm('정말로 삭제하시겠습니까?') },
  selectedItem: { type: [String, Boolean, Number, Object] },
  disabledButton: { type: Boolean },
  emptyMessage: { type: String, default: () => '선택해주세요' },
  inline: { type: Boolean },
  vertical: { type: Boolean },
})
// selectedItem = v-model
const emit = defineEmits(['onSelect', 'onEdit', 'onRemove', 'onDragDrop'])

const { draggable, handleMousedown, handleDragStart, handleDragOver, handleDragLeave, handleDrop, handleDragEnd, handleSelect, handleEdit, handleRemove } =
  useListbox({ isDraggable: props.isDraggable, removeConfirm: props.removeConfirm, emit })

// vertical일 때 줄바꿈하려면 외부 div에 원하는 만큼의 너비를 부여하고, ul태그에 flex-wrap을 넣고, li태그에 w-full을 제거해야 함
// li태그에 있는 w-full 제거해야 정상적인 줄바꿈이 됨. 안그러면 flex-1이랑 같이 시너지 생겨서 한칸씩밖에 차지하지 않음.
// 현재 슬롯 내부 div에 whitespace-pre 넣었는데, 띄어쓰기때문에 줄바꿈되서 그랬음. 만약 줄바꿈이 필요하다면 whitespace-pre를 제거할 것. 단, 그렇게 하면 inline 일 때 가능한 모든 줄바꿈을 경험하게 될 것
</script>

<template>
  <div class="">
    <ul class="items-center" :class="[inline ? 'inline-flex' : 'flex', vertical ? classes : `flex-col ${classes}`]">
      <li
        v-for="(item, index) in list"
        :key="item"
        @click="handleSelect(itemValue(item), index)"
        class="flex w-full cursor-pointer"
        :class="[selectedItem && selectedItem === itemValue(item) ? activeClasses : inactiveClasses, innerClasses]"
      >
        <div class="relative flex-1">
          <div>
            <div :class="[!disabledButton ? 'pr-[52px]' : '']">
              <slot :item="item" :cbRemove="() => handleRemove(itemValue(item), index)">
                <div class="whitespace-pre py-[8px]">
                  <span>{{ itemLabel(item) }}</span>
                </div>
              </slot>
            </div>
            <template v-if="!disabledButton">
              <div class="absolute inset-y-0 right-0 flex cursor-pointer items-center space-x-[8px] pr-[8px]">
                <div @click.stop="handleEdit(itemValue(item), index)"><IconModify class="w-[16px] text-gray-500"></IconModify></div>
                <div @click.stop="handleRemove(itemValue(item), index)"><IconDelete class="w-[16px] text-gray-500"></IconDelete></div>
              </div>
            </template>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
