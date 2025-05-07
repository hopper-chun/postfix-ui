<script setup>
const props = defineProps({
  text: { type: String },
  active: { type: Boolean },
  extraClass: { type: [String, Object], default: 'extraClass' },
  activeClass: { type: String, default: 'activeClass' },
})
</script>

<!-- 기본적으로 각자 디폴트 클래스를 가진다. 이는 css로 라이브러리에 정의되어 있는 값이며, 이에 대한 값은 style 태그 사용자가 원하는 대로 재정의해서 사용할 수 있다. -->
<!-- 만약 테이블마다 다른 값을 주고 싶다면, activeClass에 고유한 클래스를 줘서 activeClass, extraClass의 대체로 사용할 수 있다. 
테일윈드 사용자는 여기에 원하는 tailwind css를 기입하면 그 클래스가 디폴트 값을 대체한다. -->
<template>
  <div class="whitespace-nowrap px-colorTableCell">
    {{ activeClass }}
    <div :class="[extraClass, { [activeClass]: active }]">{{ text }}</div>
  </div>
</template>
