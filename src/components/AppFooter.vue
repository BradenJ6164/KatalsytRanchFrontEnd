<template>
  <v-footer
    app
    height="40"
  >
    <a
      v-for="item in items"
      :key="item.title"
      :href="item.href"
      :title="item.title"
      class="d-inline-block mx-2 social-link"
      rel="noopener noreferrer"
      target="_blank"
    >
      <v-icon
        :icon="item.icon"
        :size="item.icon === '$vuetify' ? 24 : 16"
      />
    </a>

    <div
      class="text-caption text-disabled"
      style="position: absolute; right: 16px;"
    >
      <!--      &copy; 2024-{{ (new Date()).getFullYear() }} <span class="d-none d-sm-inline-block">Baja's Lab</span>-->
      Powered by Baja's Lab<br>
      Built by Braden Jones
    </div>
  </v-footer>
</template>

<script lang="ts" setup>
const items = [

  // {
  //   title: 'Vuetify Reddit',
  //   icon: `mdi-reddit`,
  //   href: 'https://reddit.com/r/vuetifyjs',
  // },
]
</script>

<style lang="sass" scoped>
.social-link :deep(.v-icon)
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
  text-decoration: none
  transition: .2s ease-in-out

  &:hover
    color: rgba(25, 118, 210, 1)
</style>
