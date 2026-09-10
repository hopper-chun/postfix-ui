<script setup>
import Navbar from "./layout/Navbar.vue";
import Sidebar from "./layout/Sidebar.vue";
</script>

<template>
  <div
    class="grid min-h-[100vh] grid-cols-[240px_minmax(0,1fr)] grid-rows-[64px_minmax(0,1fr)] max-[760px]:grid-cols-[minmax(0,1fr)] max-[760px]:grid-rows-[58px_auto_minmax(0,1fr)]"
  >
    <Navbar></Navbar>
    <Sidebar></Sidebar>
    <main
      class="min-w-[0px] px-[clamp(28px,6vw,92px)] pb-[100px] pt-[56px] max-[760px]:px-[20px] max-[760px]:pb-[72px] max-[760px]:pt-[38px]"
    >
      <RouterView />
    </main>
  </div>
</template>
