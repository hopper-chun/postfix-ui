<script setup>
const props = defineProps(['user', 'viewMode'])
</script>

<template>
  <div class="px-userInfoTableCell">
    <template v-if="viewMode">
      <RmFormForView :viewMode="viewMode" label="이름">
        <div class="px-userInfoTableCell--container" v-if="user">
          <div>
            <div>
              <div>{{ user?.userName }}</div>
              <router-link :to="{ name: 'userView', params: { userSeq: user?.userSeq } }"
                ><span class="px-userInfoTableCell--link">[{{ user?.userId }}]</span></router-link
              >
            </div>
          </div>
        </div>
      </RmFormForView>
    </template>
    <template v-else>
      <div class="px-userInfoTableCell--container" v-if="user">
        <div>
          <div>
            <div>{{ user?.userName }}</div>
            <router-link :to="{ name: 'userView', params: { userSeq: user?.userSeq } }"
              ><span class="px-userInfoTableCell--link">[{{ user?.userId }}]</span></router-link
            >
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
