<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from '@/composables'

const theme = useTheme()
const route = useRoute()
const state = ref({
  Form: true,
  List: true,
  Element: true,
})
const menus = [
  {
    title: 'Theme',
    subMenus: [
      {
        subTitle: '테마 재정의',
        link: '/refineTheme',
      },
      // {
      //   subTitle: 'UseTheme',
      //   link: '/useTheme',
      // },
      // {
      //   subTitle: 'SetTheme',
      //   link: '/setTheme',
      // },
    ],
  },
  {
    title: 'Form',
    acc: true,
    subMenus: [
      {
        subTitle: 'Input',
        link: '/input',
      },
      {
        subTitle: 'TextArea',
        link: '/textArea',
      },
      {
        subTitle: 'Select',
        link: '/select',
      },
      {
        subTitle: 'Floating Form',
        link: '/floatingForm',
      },
      {
        subTitle: 'Divided Form',
        link: '/dividedForm',
      },
      {
        subTitle: 'Text Editor',
        link: '/textEditor',
      },
      {
        subTitle: 'Checkbox',
        link: '/checkbox',
      },
      {
        subTitle: 'Radio',
        link: '/radio',
      },
      {
        subTitle: 'Toggle',
        link: '/toggle',
      },
      {
        subTitle: 'Validate',
        link: '/validate',
      },
    ],
  },
  {
    title: 'Element',
    acc: true,
    subMenus: [
      {
        subTitle: 'Button',
        link: '/button',
      },
      {
        subTitle: 'Badge',
        link: '/badge',
      },
      {
        subTitle: 'Tag',
        link: '/tag',
      },
      {
        subTitle: 'Dropdown',
        link: '/dropdown',
      },
    ],
  },
  {
    title: 'Module',
    subMenus: [
      {
        subTitle: 'Notification',
        link: '/notification',
      },
      {
        subTitle: 'Dialog',
        link: '/dialog',
      },
      {
        subTitle: 'Accordion',
        link: '/accordion',
      },
    ],
  },
  {
    title: 'List',
    acc: true,
    subMenus: [
      {
        subTitle: 'Listbox',
        link: '/listbox',
      },
      {
        subTitle: 'Table',
        link: '/table',
      },
      {
        subTitle: 'AdminTable',
        link: '/adminTable',
      },
      {
        subTitle: 'AdminTable with spanning',
        link: '/adminTableGrid',
      },

      {
        subTitle: 'Pagination',
        link: '/pagination',
      },

      {
        subTitle: 'Tab',
        link: '/tab',
      },
    ],
  },
]

const handleClick = (menu) => {
  if (menu.acc) {
    state.value[menu.title] = !state.value[menu.title]
  }
}
</script>
<template>
  <div class="SCROLLHIDE max-h-[calc(100vh-100px)] w-[220px] overflow-y-scroll">
    <div class="w-[200px] space-y-[16px] pl-[12px]">
      <div v-for="menu in menus">
        <div class="flex items-center space-x-[4px] font-bold" :class="{ 'cursor-pointer': menu?.acc }" @click="handleClick(menu)">
          <div>{{ menu.title }}</div>
          <template v-if="menu?.acc">
            <div v-if="state[menu.title]">-</div>
            <div v-else>+</div>
          </template>
        </div>
        <div>
          <template v-if="menu.subMenus">
            <div v-if="state[menu.title]">
              <router-link v-for="subMenu in menu.subMenus" :to="subMenu.link">
                <div
                  class="mb-[4px] rounded-[8px] py-[8px] pl-[16px] text-[13px]"
                  :class="route.path === subMenu.link ? `font-bold ${theme.primary.text}` : 'transition duration-300 hover:bg-[#E6F6FF]'"
                >
                  {{ subMenu.subTitle }}
                </div>
              </router-link>
            </div>
            <div v-if="!menu.acc">
              <router-link v-for="subMenu in menu.subMenus" :to="subMenu.link">
                <div
                  class="mb-[4px] rounded-[8px] py-[8px] pl-[16px] text-[13px]"
                  :class="route.path === subMenu.link ? `font-bold ${theme.primary.text}` : 'transition duration-300 hover:bg-[#E6F6FF]'"
                >
                  {{ subMenu.subTitle }}
                </div>
              </router-link>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.SCROLLHIDE::-webkit-scrollbar-thumb {
  background-color: white;
}
.SCROLLHIDE:hover::-webkit-scrollbar-thumb {
  background-color: #00a3ff;
}
</style>
