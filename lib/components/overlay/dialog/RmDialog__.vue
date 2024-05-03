<script setup>
import { ref } from 'vue'

const emit = defineEmits(['onOpen', 'onClose'])

const active = ref(false)
const items = ref({})
const isMouseDown = ref(false) // dialog 안에서 클릭 드래그 하다 자꾸 dialog 밖에서 up을 할때, dialog가 닫히는것을 방지

const open = () => {
  active.value = true
  isMouseDown.value = false
  emit('onOpen')
}
const close = () => {
  active.value = false
  isMouseDown.value = false
  emit('onClose')
}

const onMouseDown = () => {
  isMouseDown.value = true
}

const onMouseUp = () => {
  if (isMouseDown.value) {
    close()
  }
}

defineExpose({ open, close })
</script>

<!-- 날 위해 넣는 설명
1. defineExpose로 함수 open, close가 넘어갔다. 다이알로그에 ref="name" 하고, 다른 함수에 name.value.open() 하면 해당 함수가 실행된다. 
  * 외부 컴포넌트의 템플릿에서 클릭이벤트로 ref변수를 직접 넘겼다면, 함수 내에선 value를 생략할 수 있다. 

2. slot에 items와 함수 close가 넘어갔다. 외부에서 closeDialog를 매개변수로써 클릭이벤트를 통해 넘기면, 해당 함수 내에서 인수() 의 형태로 close()를 사용할 수 있다. 
  혹시나 해서 남기는 말이지만, 단순히 창을 닫는 닫기는 @click="closeDialog" 으로 분리해서 사용해야 한다. 
  아무튼 클릭이벤트가 실행되고, 모든 가공 및 작업을 끝낸 이후에 closeDialog() 하는걸 잊지 말기. 
예제에서는 혼동을 피하기 위해 매개변수, 인수 모두 closeDialog로 사용했음.

3. functionRef를 안쓰긴 했는데 어떻게든 작동중임. 앵간하면 다이얼로그 하나 당 컴포넌트 하나로 관리하는게 맞는 거 같음. 
 한 페이지에 두개 이상의 다이알로그를 쓰겠다면, 한 이벤트에 if문쓰는수밖에...

4. 컴포넌트 하나에 v-model이 두개 이상 얽혀있다면,  
  emits('update:optionMetas', local.optionMetas) 
  emits('update:optionItems', local.optionItems) // const emits = defineEmits(['update:optionMetas', 'update:optionItems'])
  의 형태로 보내면 됨.
-->

<template>
  <transition
    enter-active-class="transition duration-300 ease-in"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <template v-if="active">
      <!-- <div class="fixed inset-0 z-30 flex items-center justify-center bg-black/40" @click.self="close"> -->
      <div class="fixed inset-0 z-30 flex items-center justify-center bg-black/40" @mousedown.self="onMouseDown" @mouseup.self="onMouseUp">
        <slot :items="items" :closeDialog="close"></slot>
      </div>
    </template>
  </transition>
</template>
