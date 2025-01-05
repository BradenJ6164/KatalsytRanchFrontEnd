<template>
  <router-view />
</template>

<script lang="ts" setup>
//


import {useTheme} from "vuetify";
import {useAuthStore} from "@/stores/auth";

const theme = useTheme()

const authStore = useAuthStore();

onMounted(() => {
  authStore.startPolling();
});

onBeforeMount(() => {
  if (new Date().getHours() >= 18 || new Date().getHours() <= 6) {
    theme.global.name.value = "dark"
  } else {
    theme.global.name.value = "light"
  }
})
setInterval(() => {
  if (new Date().getHours() >= 18 || new Date().getHours() <= 6) {
    theme.global.name.value = "dark"
  } else {
    theme.global.name.value = "light"
  }
}, 1000)
</script>
