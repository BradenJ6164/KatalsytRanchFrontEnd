<template>
  <v-bottom-navigation height="56">
    <v-btn value="recent">
      <v-icon>mdi-history</v-icon>

      <span>Recent</span>
    </v-btn>

    <v-btn to="/" value="home">
      <v-icon>mdi-home</v-icon>

      <span>Home</span>
    </v-btn>

    <v-btn  to="/nearby" value="nearby">
      <v-icon>mdi-map-marker</v-icon>

      <span>Nearby</span>
    </v-btn>
  </v-bottom-navigation>
</template>
<script lang="ts" setup>

</script>
