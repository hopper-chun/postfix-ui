<script setup>
import { useRoute } from 'vue-router'
import { RmSimpleNotification } from './components'
import Navbar from '@/layout/Navbar.vue'
import Sidebar from '@/layout/Sidebar.vue'

const route = useRoute()
// const meta = route
</script>

<template>
  <div>
    <!-- {{ route.meta.screenType }} -->
    <Navbar class="hidden sm:block"></Navbar>
    <div class="mx-auto flex items-start sm:max-w-[1400px] sm:py-[120px]">
      <Sidebar class="z-20 hidden sm:fixed sm:top-[100px] sm:block"></Sidebar>
      <router-view class="sm:pl-[250px]"></router-view>
    </div>
    <!-- <RmSimpleNotification title="title" desc="설명을 입력"></RmSimpleNotification> -->
  </div>
</template>

<style>
/* @import './css/common.css'; */

*::-webkit-scrollbar {
  width: 5px;
  height: 8px;
}

*::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: #00a3ff;
}
</style>
