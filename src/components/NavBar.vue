<template>
  <v-bottom-navigation fixed height="56">
    <v-btn to="/guides/guides" value="guides">
      <v-icon>mdi-text-box-multiple-outline</v-icon>

      <span>Guides</span>
    </v-btn>
    <v-btn to="/guides/houseRules" value="rules">
      <v-icon>mdi-script-text-outline</v-icon>

      <span>House Rules</span>
    </v-btn>

    <v-btn to="/" value="home">
      <v-icon>mdi-home</v-icon>

      <span>Home</span>
    </v-btn>

<!--    <v-btn  to="/nearby" value="nearby">-->
<!--      <v-icon>mdi-map-marker</v-icon>-->

<!--      <span>Nearby</span>-->
<!--    </v-btn>-->
  </v-bottom-navigation>
</template>
<script lang="ts" setup>

</script>
