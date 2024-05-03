<script setup>
import { onMounted, ref, watch } from 'vue'
// import { useNavbar } from 'remain-ui-lib'
import { useRoute } from 'vue-router'

const props = defineProps({
  navigation: { type: Array, requited: true },
  userNavigation: { type: Array, requited: true },
})
const route = useRoute()
const { isActive } = useNavbar()

const currentItem = ref()
const isCollapsed = (item) => {
  return currentItem.value !== item
}

const handleToggle = (item) => {
  if (currentItem.value === item) {
    currentItem.value = null
  } else {
    currentItem.value = item
  }
}

const icons = (iconName) => {
  if (iconName === 'product') {
    return 'icon-list'
  } else if (iconName === 'order') {
    return 'icon-cart'
  } else if (iconName === 'user') {
    return 'icon-user'
  } else if (iconName === 'banner') {
    return 'icon-banner'
  } else if (iconName === 'board') {
    return 'icon-write'
  } else if (iconName === 'system') {
    return 'icon-setting-menu'
  }
}

const openStore = () => {
  window.open('/')
}

watch(
  () => props.navigation,
  () => {
    const index = props.navigation.findIndex((item) => isActive(item))
    if (index !== -1) {
      currentItem.value = props.navigation[index]
    }
  }
)
</script>

<template>
  <nav aria-label="Sidebar" class="h-full">
    <div class="flex h-full flex-col">
      <div @click="$router.push('/admin')" class="cursor-pointer">
        <div class="py-[8px]">
          <img :src="logo" class="h-[18px] px-[16px]" />
        </div>
      </div>
      <div class="text-[12px]">
        <slot name="upper">
          <div class="pr-[8px]">
            <a @click="openStore" class="flex h-[48px] w-full cursor-pointer items-center space-x-[8px] px-[16px]">
              <span><RmIcon name="icon-home" class="h-[18px] w-[18px] text-[#4F46E5]" /></span>
              <span class="flex-1 font-bold"> 내 상점 바로가기 </span>
              <span><RmIcon name="icon-out-link" class="h-[18px] w-[18px] text-[#6B7280]" /></span>
            </a>
            <router-link
              to="/admin/system-config/company/part1"
              class="flex h-[48px] w-full items-center space-x-[8px] px-[16px]"
              v-if="hasAuthority(AdminAuthType.AT_SYSTEM_CONFIG, AdminAuthCmd.AC_LIST)"
            >
              <span><RmIcon name="icon-setting-menu" class="h-[18px] w-[18px] text-[#4F46E5]" /></span>
              <span class="flex-1 font-bold"> 상점 설정 </span>
            </router-link>
          </div>
          <div class="h-[8px] w-full bg-[#F9FAFB]"></div>
        </slot>
        <div class="pr-[8px]">
          <router-link to="/admin" class="flex h-[48px] w-full items-center space-x-[8px] px-[16px]">
            <span><RmIcon name="icon-home" class="h-[18px] w-[18px]" :class="route.path === '/admin' ? ' text-[#4F46E5]' : 'text-[#D1D5DB]'" /></span>
            <span class="flex-1" :class="route.path === '/admin' ? 'font-bold ' : ''"> 홈 </span>
          </router-link>
          <div v-for="(item, index) in navigation" @click="handleToggle(item)" :class="{ hidden: index === 5 }">
            <div class="flex h-[48px] w-full cursor-pointer items-center space-x-[8px] px-[16px]">
              <span class="text-[#D1D5DB]"><RmIcon :name="icons(item.icon)" class="h-[18px] w-[18px]" :class="[{ 'text-[#4F46E5]': isActive(item) }]" /></span>
              <span class="flex-1 select-none">{{ item.title }}</span>
              <span class="flex h-[18px] w-[18px] items-center justify-center"
                ><RmIcon name="icon-chevron-right" class="w-[6px] text-[#6B7280]" :class="[currentItem === item ? '-rotate-90' : 'rotate-90']"
              /></span>
            </div>

            <div v-for="subItem in item.subItems" class="ml-[34px]" v-show="!isCollapsed(item)" @click.stop="">
              <div v-if="subItem.seperator" class="mr-[6px] border-b"></div>
              <router-link v-else :to="{ path: subItem.path, query: subItem.query }">
                <div class="flex h-[48px] flex-1 items-center pr-[6px]">
                  <div class="flex h-[36px] flex-1 items-center rounded-[8px] pl-[6px] pr-[10px]" :class="[{ 'bg-[#F3F4F6] font-bold': isActive(subItem) }]">
                    <span class="flex-1">{{ subItem.title }}</span>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <slot name="lower"></slot>
      <slot name="loginInfo">
        <div class="mt-auto space-y-[6px] bg-white px-[16px] pb-[20px] pt-[6px]">
          <template v-for="userNav in userNavigation">
            <div class="text-[12px]">{{ user.userId }} | {{ user.userName }}</div>
            <router-link :to="{ path: userNav.path }" v-if="userNav.path">{{ userNav.title }}</router-link>
            <AdBtnXs @click="logout" v-else>LOGOUT</AdBtnXs>
          </template>
        </div>
      </slot>
    </div>
  </nav>
</template>
<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
