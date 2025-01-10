<template>
  <DefaultLayout>
    <v-empty-state
      headline="404"
      text="This page doesn't exist."
      title="Page not Found"
    />
  </DefaultLayout>
</template>
<script lang="ts" setup>
import DefaultLayout from "@/layouts/defaultLayout.vue";
</script>
